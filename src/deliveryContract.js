
import web3 from './web3-wrapper.js'
import _ from 'lodash'

import {deliveryContractCreatorABI, deliveryContractABI} from './abi'
import {getAll as solidityGetProperties, at as solidityGetBy} from './solidity-getters'
//import {getAll as solidityGetProperties, getIndexedPropAt as solidityGetBy} from './solidity-getters'
import {sendTransaction} from './ethCall'


const lastOf = arr => arr[arr.length - 1]

// number of (parallel) fetches done at a time
const DEFAULT_DELIVERY_FETCH_STEP = 10

// drop already known deliveryContracts and fetch all a-fresh
export function getAllDeliveryContracts(deliveryContractCreatorAddress) {
    return updateDeliveryContracts([], DEFAULT_DELIVERY_FETCH_STEP, deliveryContractCreatorAddress)
}

// parcel address, will be zero if non-existent
const isValid = d => d && d[1] !== '0x'

// this can be used to fetch only deliveryContracts newer than those we already have
export function updateDeliveryContracts(oldDeliveryContracts, step, deliveryContractCreatorAddress) {
    const startId = 1 + oldDeliveryContracts.length   // deliveryContracts are mapped with running id, starting from 1
    return getDeliveryRange(startId, startId + step, deliveryContractCreatorAddress).then(newDeliveryContracts => {
        const deliveryContracts = oldDeliveryContracts.concat(newDeliveryContracts)
        if (isValid(lastOf(newDeliveryContracts))) {
            return updateDeliveryContracts(deliveryContracts, step, deliveryContractCreatorAddress)
        } else {
            return _.filter(deliveryContracts, isValid)
        }
    })
}

export function getDeliveryRange(startId, endId, deliveryContractCreatorAddress) {
    const res = _.range(startId, endId, deliveryContractCreatorAddress).map(i => getDeliveryMetadata(i, deliveryContractCreatorAddress))
    return Promise.all(res)
}

export function getDeliveryMetadata(id, deliveryContractCreatorAddress) {
    const deliveryContractCreator = web3.eth.contract(deliveryContractCreatorABI).at(deliveryContractCreatorAddress)
    return solidityGetBy(id, deliveryContractCreator, 'contracts')
}

export const getDeliveryContract = id => getDeliveryMetadata(id).then(d => solidityGetProperties(deliveryContractABI, d.address))

/**
 * Create DeliveryContract contract
 * @param senderPostbox {@see createPostbox}
 * @param receiverPostbox {@see createPostbox}
 * @param receiver Address of the receiver of the delivery
 * @param endDate The end date of the contract. After this date, deposits are unlocked; SET THIS TO ZERO IF YOU'RE NOT SURE WHAT YOU'RE DOING
 * @param depositETH Deposit (in ETH, 'ether') paid by the courier or transporter when taking parcel
 * @param startDate Date when the parcel can be transferred by the sender
 * @param minutes how many minutes from now must the delivery arrive
 * @returns {Promise.<string>} created contract's address
 */
export function createDeliveryContract(parcelAddress, senderPostbox, receiverPostbox, receiver, endDate, depositETH, startDate, minutes, deliveryContractCreatorAddress) {
    const deposit = web3.toWei(depositETH, 'ether')
    //console.log(`Creating delivery contract ${senderPostbox} -> ${receiverPostbox} in ${minutes} minutes`)
    return sendTransaction(deliveryContractCreatorABI, deliveryContractCreatorAddress, 'createDeliveryContract', [parcelAddress, senderPostbox, receiverPostbox, receiver, endDate, deposit, startDate, minutes]).then(events => {
        const responseArray = events.NewContract
        if (!responseArray) {
            throw new Error('NewContract event not sent from Solidity')
        }
        //console.log('Created delivery contract', responseArray)
        return {
            creator: responseArray[0],
            address: responseArray[1]
        }
    })
}
