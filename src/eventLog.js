import web3 from './web3-wrapper.js'
const Promise = require('bluebird')
import {parcelABI, deliveryContractABI} from './abi'
import {decodeEvent} from './ethCall'
import fromPairs from 'lodash/fromPairs'
import SolidityEvent from 'web3/lib/web3/event'

const provider = web3.currentProvider
function send(msg) {
    return new Promise((done, fail) => {
        provider.sendAsync(msg, (err, res) => {
            if (err) {
                fail(err)
            } else {
                done(res)
            }
        })
    })
}

function decodeLogs(abi, response) {
    if (response.error) {
        throw new Error(response.error.message)
    }

    // cryptographic (sha3) signature used to recognize event in transaction receipt -> event
    const eventsBySignature = fromPairs(abi
        .filter(m => m.type === 'event')
        .map(m => [new SolidityEvent(null, m, null).signature(), m])
        //.map(m => [web3.eth.abi.encodeEventSignature(m), m])      // web3.js 1.0
    )

    return response.result.map(rawEvent => {
        const sig = rawEvent.topics[0].replace('0x', '')
        const eventABI = eventsBySignature[sig]
        if (!eventABI) {
            console.error('Bad event or ABI')
            console.error(abi)
            console.error(rawEvent)
            return null
        }
        return {
            ...rawEvent,
            ...eventABI,
            event: eventABI.name,
            args: decodeEvent(rawEvent, eventABI)
        }
    }).filter(x => x)
}

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

let requestId = 0
export function _getParcelEvents(parcelAddress) {
    if (!parcelAddress) {
        return Promise.resolve([])
    }
    // TODO when web3.js 1.0 is out (and implemented by metamask...), use web3.eth.getPastLogs
    return send({
        id: requestId++,
        jsonrpc: '2.0',
        method: 'eth_getLogs',
        params: [{
            fromBlock: 0,
            address: parcelAddress
        }]
    }).then(response => decodeLogs(parcelABI, response))
}

export function watchParcelEvent(parcelAddress, eventName, callback) {
    const Parcel = web3.eth.contract(parcelABI).at(parcelAddress)
    const event = Parcel[eventName]()
    return event.watch(callback)
}

export function _getDeliveryEvents(deliveryAddressList) {
    // TODO when web3.js 1.0 is out (and implemented by metamask...), use web3.eth.getPastLogs
    return Promise.all(deliveryAddressList.map(address => send({
        id: requestId++,
        jsonrpc: '2.0',
        method: 'eth_getLogs',
        params: [{
            fromBlock: 0,
            address: address
        }]
    }).then(response => decodeLogs(deliveryContractABI, response))))
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