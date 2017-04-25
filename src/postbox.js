
import web3 from './web3-wrapper.js'
import filter from 'lodash/filter'
import range from 'lodash/range'

import {postboxCreatorABI, postboxABI} from './abi'
import {getEventsFromLogs} from './ethCall'
import {getAll as solidityGetProperties, get as solidityGet} from './solidity-getters'

const lastOf = arr => arr[arr.length - 1]

// number of (parallel) fetches done at a time
const DEFAULT_POSTBOX_FETCH_STEP = 10

// drop already known postboxes and fetch all a-fresh
export function getAllPostboxContracts(postboxCreatorAddress) {
    return updatePostboxes([], DEFAULT_POSTBOX_FETCH_STEP, postboxCreatorAddress)
}

// this can be used to fetch only postboxes newer than those we already have
export function updatePostboxes(oldPostboxes, step, postboxCreatorAddress) {
    const startId = 1 + oldPostboxes.length   // postboxes are mapped with running id, starting from 1
    return getPostboxRange(startId, startId + step, postboxCreatorAddress).then(newPostboxes => {
        const postboxes = oldPostboxes.concat(newPostboxes)
        if (lastOf(newPostboxes)) {
            return updatePostboxes(postboxes, step, postboxCreatorAddress)
        } else {
            return filter(postboxes)
        }
    })
}

export function getPostboxRange(startId, endId, postboxCreatorAddress) {
    const res = range(startId, endId).map(i => getPostboxMetadata(i, postboxCreatorAddress))
    return Promise.all(res)
}

export function getPostboxMetadata(id, postboxCreatorAddress) {
    const PostboxCreator = web3.eth.contract(postboxCreatorABI).at(postboxCreatorAddress)
    return new Promise(done => {
        PostboxCreator.postboxCreations(id, (err, result) => {
            if (!result) {
                done()
            } else {
                done({
                    id,
                    creator: result[0],
                    address: result[1],
                    name: result[2]
                })
            }
        })
    })
}

export const getPostboxContract = id => getPostboxMetadata(id).then(postbox => solidityGetProperties(postboxABI, postbox.address))

export const getPostboxCount = postboxCreatorAddress => {
    const PostboxCreator = web3.eth.contract(postboxCreatorABI).at(postboxCreatorAddress)
    solidityGet(PostboxCreator, 'numberOfPostboxes')
}


/**
 * Create Postbox contract
 * @param minuteFee Fee per minute to rent the postbox (for public postboxes)
 * @param minRent Minimum fee to rent the postbox (for public postboxes)
 * @param maxDeposit Maximum deposit insurance provided by the postbox (for public postboxes)
 * @returns {Promise.<string>} created contract's address
 */
export const createPostboxContract = (name, description, location, postboxCreatorAddress, ownerAddress = web3.eth.coinbase) => {
    console.log('Creating postbox ', name, 'owned by ', ownerAddress)
    // TODO: write using ethCall:sendTransaction
    const PostboxCreator = web3.eth.contract(postboxCreatorABI).at(postboxCreatorAddress)
    return new Promise(done => {
        PostboxCreator.createPostbox(ownerAddress, name, description, location, 0, 0, 0 /*minuteFee, minRent, maxDeposit*/, (err, tx) => {
            if (err) {
                throw err
            }
            const filter = web3.eth.filter('latest')
            filter.watch(function(error, blockHash) {       //eslint-disable-line no-unused-vars
                if (error) {
                    throw error
                }
                web3.eth.getTransactionReceipt(tx, (err, tr) => {
                    if (err) {
                        throw err
                    }
                    if (tr == null) {
                        return      // not yet...
                    }
                    filter.stopWatching()
                    const events = getEventsFromLogs(tr.logs, postboxCreatorABI)
                    const responseArray = events.NewPostbox
                    if (!responseArray) {
                        throw new Error('NewPostbox event not sent from Solidity')
                    }
                    const response = {
                        creator: responseArray[0],
                        owner: responseArray[1],
                        name: responseArray[2],
                        address: responseArray[3]
                    }
                    done(response)
                })
            })
        })
    })
}
