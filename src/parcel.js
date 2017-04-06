/*global web3*/
//import web3 from 'web3'
import {parcelCreatorABI, parcelCreatorAddress, parcelABI} from './abi'
import {getEventsFromLogs} from './ethCall'
import _ from 'lodash'

const ParcelCreator = web3.eth.contract(parcelCreatorABI).at(parcelCreatorAddress)
const Parcel = web3.eth.contract(parcelABI)

const assertEqual = (a, b) => {
    if (a !== b) {
        console.error(`Expected ${JSON.stringify(a)} === ${JSON.stringify(b)}`)
    }
}

const lastOf = arr => arr[arr.length - 1]

// number of (parallel) fetches done at a time
const DEFAULT_PARCEL_FETCH_STEP = 10

export const getAllParcelContracts = () => {
    return updateParcels([])
}

export const updateParcels = (oldParcels, step = DEFAULT_PARCEL_FETCH_STEP) => {
    const startId = 1 + oldParcels.length   // parcels are mapped with running id, starting from 1
    return getParcelRange(startId, startId + step).then(newParcels => {
        const parcels = oldParcels.concat(newParcels)
        if (lastOf(newParcels)) {
            return updateParcels(parcels, step)
        } else {
            return _.filter(parcels)
        }
    })
}

export const getParcelRange = (startId, endId) => {
    const res = _.range(startId, endId).map(getParcelMetadata)
    return Promise.all(res)
}

export const getParcelMetadata = id => {
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

export const getParcelContract = id => getParcelMetadata(id).then(parcel => getParcelAt(parcel.address))

export const getParcelAt = address => {
    const parcelContract = Parcel.at(address)
    const propNames = parcelABI
        .filter(m => m.constant && m.inputs && m.inputs.length === 0 && m.outputs && m.outputs.length === 1)
        .map(m => m.name)
    return Promise.all(propNames.map(propName => getParcelProperty(parcelContract, propName)))
        .then(propValues => {
            return _.zipObject(propNames, propValues)
        })
}

const getParcelProperty = (parcelContract, propName) => {
    return new Promise((done, fail) => {
        parcelContract[propName]((err, result) => {
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
 * Create PassParcel contract
 * @param temperatureLimit The maximum temperature in degrees celcius allowed for the parcel
 * @returns {Promise.<string>} created contract's address
 */
export const createParcelContract = (name = 'Parcel', description = 'Unnamed parcel', temperatureLimit = 100, ownerAddress = web3.eth.coinbase) => {
    const ParcelCreator = web3.eth.contract(parcelCreatorABI).at(parcelCreatorAddress)
    //console.log('Creating parcel ' + name)
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
                    //console.log('Created parcel', response)
                    done(response)
                })
            })
        })
    })
}
