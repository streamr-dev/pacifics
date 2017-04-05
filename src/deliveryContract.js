/*global web3*/
//import web3 from 'web3'
import {deliveryContractCreatorABI, deliveryContractCreatorAddress} from './abi'
import {getEventsFromLogs} from './ethCall'

/**
 * Create DeliveryContract contract
 * @param senderPostbox {@see createPostbox}
 * @param receiverPostbox {@see createPostbox}
 * @param receiver Address of the receiver of the parcel
 * @param minutes how many minutes from now must the parcel arrive
 * @returns {Promise.<string>} created contract's address
 */
export const createDeliveryContract = (senderPostbox, receiverPostbox, receiver, minutes) => {
    const DeliveryContractCreator = web3.eth.contract(deliveryContractCreatorABI).at(deliveryContractCreatorAddress)
    console.log(`Creating delivery contract ${senderPostbox} -> ${receiverPostbox} in ${minutes} minutes`)
    return new Promise(done => {
        DeliveryContractCreator.createDeliveryContract(senderPostbox, receiverPostbox, receiver, 0, 0, 0, minutes, (err, tx) => {
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
                    const events = getEventsFromLogs(tr.logs, deliveryContractCreatorABI)
                    const responseArray = events.NewContract
                    if (!responseArray) {
                        throw new Error('NewContract event not sent from Solidity')
                    }
                    const response = {
                        creator: responseArray[0],
                        address: responseArray[1]
                    }
                    console.log('Created delivery contract', response)
                    done(response)
                })
            })
        })
    })
}
