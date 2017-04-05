/*global web3*/
//import web3 from 'web3'
import {parcelCreatorABI, parcelCreatorAddress/*, parcelABI*/} from './abi'
import {getEventsFromLogs} from './ethCall'

const assertEqual = (a, b) => {
    if (a !== b) {
        console.error(`Expected ${JSON.stringify(a)} === ${JSON.stringify(b)}`)
    }
}

/**
 * Create PassParcel contract
 * @param temperatureLimit The maximum temperature in degrees celcius allowed for the parcel
 * @returns {Promise.<string>} created contract's address
 */
export const createParcel = (name = 'Parcel', description = 'Unnamed parcel', temperatureLimit = 100, ownerAddress = web3.eth.coinbase) => {
    const ParcelCreator = web3.eth.contract(parcelCreatorABI).at(parcelCreatorAddress)
    console.log('Creating parcel ' + name)  
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
                    console.log('Created parcel', response)
                    done(response)
                })
            })
        })
    })
}
