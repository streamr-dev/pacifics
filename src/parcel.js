/*global web3*/
//import web3 from 'web3'
import {parcelCreatorABI, parcelCreatorAddress, parcelABI} from './abi'
import {getEventsFromLogs} from '../lib/streamr-web3/src/ethCall'

/*eslint-disable no-console*/
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
const createParcel = (name = 'Parcel', description = 'Unnamed parcel', temperatureLimit = 100) => {
    const ParcelCreator = web3.eth.contract(parcelCreatorABI).at(parcelCreatorAddress)
    const ownerAddress = web3.eth.coinbase
    console.log('Creating parcel ' + name)
    return new Promise((done, fail) => {
        ParcelCreator.createParcel(ownerAddress, ownerAddress, name, description, temperatureLimit, (err, tx) => {
            if (err) { throw err }
            const filter = web3.eth.filter("latest")
            filter.watch(function (error, blockHash) {
                if (error) { throw error }
                web3.eth.getTransactionReceipt(tx, (err, tr) => {
                    if (err) { throw err }
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
                    console.log("Created parcel", response)
                    done(response)
                    //done(response.ParcelAddress)
                })
            })
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
const createPostbox = (name = 'Postbox', description = 'Unnamed postbox', location = 'Unknown'/*, minuteFee=0, minRent=0, maxDeposit=0*/) => {
    const PostboxCreator = web3.eth.contract(postboxCreatorABI).at(postboxCreatorAddress)
    const ownerAddress = web3.eth.coinbase
    console.log('Creating postbox ' + name)
    return new Promise((done, fail) => {
        PostboxCreator.createPostbox(ownerAddress, name, description, location, 0, 0, 0 /*minuteFee, minRent, maxDeposit*/, (err, tx) => {
            if (err) { throw err }
            const filter = web3.eth.filter("latest")
            filter.watch(function (error, blockHash) {
                if (error) { throw error }
                web3.eth.getTransactionReceipt(tx, (err, tr) => {
                    if (err) { throw err }
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
                    console.log("Created postbox", response)
                    done(response)
                })
            })
        })
    })
}

/**
 * Create DeliveryContract contract
 * @param senderPostbox {@see createPostbox}
 * @param receiverPostbox {@see createPostbox}
 * @param receiver Address of the receiver of the parcel
 * @param minutes how many minutes from now must the parcel arrive
 * @returns {Promise.<string>} created contract's address
 */
const createDeliveryContract = (senderPostbox, receiverPostbox, receiver, minutes) => {
    const DeliveryContractCreator = web3.eth.contract(deliveryContractCreatorABI).at(deliveryContractCreatorAddress)
    const ownerAddress = web3.eth.coinbase
    console.log(`Creating delivery contract ${senderPostbox} -> ${receiverPostbox} in ${minutes} minutes`)
    return new Promise((done, fail) => {
        DeliveryContractCreator.createDeliveryContract(senderPostbox, receiverPostbox, receiver, 0, 0, 0, minutes, (err, tx) => {
            if (err) { throw err }
            const filter = web3.eth.filter("latest")
            filter.watch(function (error, blockHash) {
                if (error) { throw error }
                web3.eth.getTransactionReceipt(tx, (err, tr) => {
                    if (err) { throw err }
                    if (tr == null) {
                        return      // not yet...
                    }
                    filter.stopWatching()
                    const events = getEventsFromLogs(tr.logs, deliveryContractCreatorABI)
                    const responseArray = events.NewContract
                    if (!responseArray) {
                        throw new Error('NewContract event not sent from Solidity')
                    }
                    const response = {
                        creator: responseArray[0],
                        address: responseArray[1]
                    }
                    assertEqual(response.creator, ownerAddress)
                    console.log("Created delivery contract", response)
                    done(response)
                })
            })
        })
    })
}
