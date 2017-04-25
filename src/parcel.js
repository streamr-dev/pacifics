
import web3 from './web3-wrapper.js'
import filter from 'lodash/filter'
import range from 'lodash/range'

import {parcelCreatorABI, parcelABI} from './abi'
import {getEventsFromLogs, sendTransaction, waitForEvent} from './ethCall'
import {getAll as solidityGetProperties} from './solidity-getters'

const lastOf = arr => arr[arr.length - 1]

// number of (parallel) fetches done at a time
const DEFAULT_PARCEL_FETCH_STEP = 10

// drop already known parcels and fetch all a-fresh
export function getAllParcelContracts(parcelCreatorAddress) {
    return updateParcels([], DEFAULT_PARCEL_FETCH_STEP, parcelCreatorAddress)
}

// this can be used to fetch only parcels newer than those we already have
export function updateParcels(oldParcels, step, parcelCreatorAddress) {
    const startId = 1 + oldParcels.length   // parcels are mapped with running id, starting from 1
    return getParcelRange(startId, startId + step, parcelCreatorAddress).then(newParcels => {
        const parcels = oldParcels.concat(newParcels)
        if (lastOf(newParcels)) {
            return updateParcels(parcels, step, parcelCreatorAddress)
        } else {
            return filter(parcels)
        }
    })
}

export function getParcelRange(startId, endId, parcelCreatorAddress) {
    //console.log(`Getting parcels ${startId}...${endId}`)
    const res = range(startId, endId).map(i => getParcelContract(i, parcelCreatorAddress))
    return Promise.all(res)
}

export function getParcelMetadata(id, parcelCreatorAddress) {
    const ParcelCreator = web3.eth.contract(parcelCreatorABI).at(parcelCreatorAddress)
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
export function getParcelContract(id, parcelCreatorAddress) {
    return getParcelMetadata(id, parcelCreatorAddress).then(p => {
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
export function createParcelContract(name, description, temperatureLimit, parcelCreatorAddress, ownerAddress = web3.eth.coinbase) {
    // TODO: write using ethCall:sendTransaction
    const ParcelCreator = web3.eth.contract(parcelCreatorABI).at(parcelCreatorAddress)
    return new Promise((resolve, reject) => {
        ParcelCreator.createParcel(ownerAddress, ownerAddress, name, description, temperatureLimit, (err, tx) => {
            if (err) {
                reject(err)
            }
            waitForEvent('NewParcel', parcelCreatorAddress, parcelCreatorABI, tx).then(event => {
                resolve(event.args)
            })
        })
    })
}

// TODO: untested atm
export function setStreamsOnParcel(parcelAddress, trackingStreamId, trackingStreamKey, photoStreamId, photoStreamKey) {
    return sendTransaction(parcelABI, parcelAddress, 'setStreams', [trackingStreamId, trackingStreamKey, photoStreamId, photoStreamKey]).then(events => {
        const responseArray = events.StreamsSet
        if (!responseArray) {
            throw new Error('StreamsSet event not sent from Solidity')
        }
        console.log('Streams set', responseArray)
        return {
            trackingStreamId: responseArray[0],
            trackingStreamKey: responseArray[1],
            photoStreamId: responseArray[2],
            photoStreamKey: responseArray[3]
        }
    })
}
