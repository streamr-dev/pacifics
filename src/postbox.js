/*global web3*/
//import web3 from 'web3'
import {postboxCreatorABI, postboxCreatorAddress, postboxABI} from './abi'
import {getEventsFromLogs} from './ethCall'
import _ from 'lodash'

const PostboxCreator = web3.eth.contract(postboxCreatorABI).at(postboxCreatorAddress)
const Postbox = web3.eth.contract(postboxABI)

const assertEqual = (a, b) => {
    if (a !== b) {
        console.error(`Expected ${JSON.stringify(a)} === ${JSON.stringify(b)}`)
    }
}

const lastOf = arr => arr[arr.length - 1]

// number of (parallel) fetches done at a time
const DEFAULT_POSTBOX_FETCH_STEP = 10

// drop already known postboxes and fetch all a-fresh
export const getAllPostboxContracts = updatePostboxes.bind(null, [])

// this can be used to fetch only postboxes newer than those we already have
export function updatePostboxes(oldPostboxes, step = DEFAULT_POSTBOX_FETCH_STEP) {
    const startId = 1 + oldPostboxes.length   // postboxes are mapped with running id, starting from 1
    return getPostboxRange(startId, startId + step).then(newPostboxes => {
        const postboxes = oldPostboxes.concat(newPostboxes)
        if (lastOf(newPostboxes)) {
            return updatePostboxes(postboxes, step)
        } else {
            return _.filter(postboxes)
        }
    })
}

export function getPostboxRange(startId, endId) {
    const res = _.range(startId, endId).map(getPostboxMetadata)
    return Promise.all(res)
}

export function getPostboxMetadata(id) {
    return new Promise(done => {
        PostboxCreator.postboxCreations(id, (err, result) => {
            if (!result) {
                done()
            } else {
                done({
                    id,
                    address: result[0],
                    creator: result[1],
                    name: result[2]
                })
            }
        })
    })
}

export const getPostboxContract = id => getPostboxMetadata(id).then(postbox => getPostboxAt(postbox.address))

export function getPostboxAt(address) {
    const postboxContract = Postbox.at(address)
    const propNames = postboxABI
        .filter(m => m.constant && m.inputs && m.inputs.length === 0 && m.outputs && m.outputs.length === 1)
        .map(m => m.name)
    return Promise.all(propNames.map(propName => getPostboxProperty(postboxContract, propName)))
        .then(propValues => {
            return _.zipObject(propNames, propValues)
        })
}

function getPostboxProperty(postboxContract, propName) {
    return new Promise((done, fail) => {
        postboxContract[propName]((err, result) => {
            if (err) {
                fail(err)
            } else {
                // BigIntegers
                if (result.toFixed) {
                    result = result.toFixed()
                }
                done(result)
            }
        })
    })
}


/**
 * Create Postbox contract
 * @param minuteFee Fee per minute to rent the postbox (for public postboxes)
 * @param minRent Minimum fee to rent the postbox (for public postboxes)
 * @param maxDeposit Maximum deposit insurance provided by the postbox (for public postboxes)
 * @returns {Promise.<string>} created contract's address
 */
export const createPostboxContract = (name = 'Postbox', description = 'Unnamed postbox', location = 'Unknown'/*, minuteFee=0, minRent=0, maxDeposit=0*/, ownerAddress = web3.eth.coinbase) => {
    //console.log('Creating postbox ' + name)
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
                    assertEqual(response.name, name)
                    assertEqual(response.creator, ownerAddress)
                    assertEqual(response.owner, ownerAddress)
                    //console.log('Created postbox', response)
                    done(response)
                })
            })
        })
    })
}
