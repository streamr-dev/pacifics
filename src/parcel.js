
import web3 from './web3-wrapper.js'
import filter from 'lodash/filter'
import range from 'lodash/range'

import {parcelCreatorABI, parcelCreatorAddress, parcelABI} from './abi'
import {getEventsFromLogs} from './ethCall'
import {getAll as solidityGetProperties} from './solidity-getters'

let ParcelCreator

const assertEqual = (a, b) => {
    if (a !== b) {
        console.error(`Expected ${JSON.stringify(a)} === ${JSON.stringify(b)}`)
    }
}

const lastOf = arr => arr[arr.length - 1]

// number of (parallel) fetches done at a time
const DEFAULT_PARCEL_FETCH_STEP = 10

// drop already known parcels and fetch all a-fresh
export const getAllParcelContracts = updateParcels.bind(null, [])

// this can be used to fetch only parcels newer than those we already have
export function updateParcels(oldParcels, step = DEFAULT_PARCEL_FETCH_STEP) {
    const startId = 1 + oldParcels.length   // parcels are mapped with running id, starting from 1
    return getParcelRange(startId, startId + step).then(newParcels => {
        const parcels = oldParcels.concat(newParcels)
        if (lastOf(newParcels)) {
            return updateParcels(parcels, step)
        } else {
            return filter(parcels)
        }
    })
}

export function getParcelRange(startId, endId) {
    console.log(`Getting parcels ${startId}...${endId}`)
    const res = range(startId, endId).map(getParcelContract)
    return Promise.all(res)
}

export function getParcelMetadata(id) {
    ParcelCreator = ParcelCreator || web3.eth.contract(parcelCreatorABI).at(parcelCreatorAddress)
    return new Promise(done => {
        ParcelCreator.parcelCreations(id, (err, result) => {
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

/**
 * @param id a running number given by ParcelCreator (starting from 1)
 * @returns {Promise} all Parcel's public properties
 */
export function getParcelContract(id) {
    return getParcelMetadata(id).then(p => {
        if (p) {
            const address = p.address
            return getParcelContractAt(address).then(p => Object.assign(p, {address}))    //eslint-disable-line object-curly-newline
        }
    })
}

/**
 * @param address Parcel contract's address in blockchain
 * @returns {Promise} all Parcel's public properties
 */
export function getParcelContractAt(address) {
    return solidityGetProperties(parcelABI, address)
}

/**
 * Create PassParcel contract
 * @param temperatureLimit The maximum temperature in degrees celcius allowed for the parcel
 * @returns {Promise.<string>} created contract's address
 */
export function createParcelContract(name = 'Parcel', description = 'Unnamed parcel', temperatureLimit = 100, ownerAddress = web3.eth.coinbase) {
    // TODO: write using ethCall:sendTransaction
    ParcelCreator = ParcelCreator || web3.eth.contract(parcelCreatorABI).at(parcelCreatorAddress)
    return new Promise(done => {
        ParcelCreator.createParcel(ownerAddress, ownerAddress, name, description, temperatureLimit, (err, tx) => {
            if (err) {
                throw err
            }
            const filter = web3.eth.filter('latest')
            filter.watch(function(error, blockHash) {   //eslint-disable-line no-unused-vars
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
                    const events = getEventsFromLogs(tr.logs, parcelCreatorABI)
                    const responseArray = events.NewParcel
                    if (!responseArray) {
                        throw new Error('NewParcel event not sent from Solidity')
                    }
                    const response = {
                        creator: responseArray[0],
                        address: responseArray[1],
                        owner: responseArray[2],
                        name: responseArray[3]
                    }
                    assertEqual(response.name, name)
                    assertEqual(response.creator, ownerAddress)
                    assertEqual(response.owner, ownerAddress)
                    done(response)
                })
            })
        })
    })
}
