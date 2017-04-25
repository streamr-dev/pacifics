import web3 from './web3-wrapper.js'
const Promise = require('bluebird')
import {parcelABI, deliveryContractABI} from './abi'

export function getParcelEvents(parcelAddress) {
    if (!parcelAddress) {
        return Promise.resolve([])
    }
    const Parcel = web3.eth.contract(parcelABI).at(parcelAddress)
    const filter = Parcel.allEvents({
        fromBlock: 0,
        toBlock: 'latest'
    })
    //return Promise.promisify(filter.get)()
    return new Promise((done, fail) => {
        filter.get((err, result) => {
            if (err) {
                fail(err)
            } else {
                done(result)
            }
        })
    })
}

export function getDeliveryEvents(deliveryAddress) {
    if (!deliveryAddress) {
        return Promise.resolve([])
    }
    const Delivery = web3.eth.contract(deliveryContractABI).at(deliveryAddress)
    const filter = Delivery.allEvents({
        fromBlock: 0,
        toBlock: 'latest'
    })
    //return Promise.promisify(filter.get)()
    return new Promise((done, fail) => {
        filter.get((err, result) => {
            if (err) {
                fail(err)
            } else {
                done(result)
            }
        })
    })
}

// from https://gist.github.com/mattwiebe/1005915
export function unCamelCase(str) {
    return str
        // insert a space between lower & upper
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        // space before last upper in a sequence followed by lower
        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
        // uppercase the first character
        .replace(/^./, str => str.toUpperCase())
}