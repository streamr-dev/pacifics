
import web3 from './web3-wrapper.js'
import _ from 'lodash'
import SolidityEvent from 'web3/lib/web3/event'
import solidityCoder from 'web3/lib/solidity/coder'
import fromPairs from 'lodash/fromPairs'

export function waitForEvent(eventName, contractAddress, contractABI/*, transactionHash*/) {
    const contract = web3.eth.contract(contractABI).at(contractAddress)
    return new Promise((resolve, reject) => {
        const event = contract[eventName]()
        const watcher = event.watch(function(err, event) {
            if (err) {
                return reject(err)
            }
            watcher.stopWatching()
            resolve(event)
        })
        /*
        setTimeout(function () {
            watcherId.stopWatching()
        }, TIMEOUT)
        */
    })
}

export function sendTransaction(abi, address, funcName, args) {
    const contract = web3.eth.contract(abi).at(address)
    return new Promise((resolve, reject) => {
        contract[funcName](...args, (err, tx) => {
            if (err) {
                reject(err)
            } else {
                console.log(`Sending transaction https://testnet.etherscan.io/tx/${tx}`)    //eslint-disable-line no-console
                const filter = web3.eth.filter('latest')
                filter.watch(function(error/*, blockHash*/) {
                    if (error) {
                        throw error
                    }
                    web3.eth.getTransactionReceipt(tx, (err, tr) => {
                        if (err) {
                            reject(err)
                        }
                        if (tr == null) {
                            return      // not yet...
                        }
                        filter.stopWatching()
                        resolve(getEventsFromLogs(tr.logs, abi))
                    })
                })
            }
        })
    })
}

// optionally filter by address
export function getEventsFromLogs(logs, abi, address) {
    if (!logs.length) {
        console.log('Received empty/undefined "logs" for getEventsFromLogs')      //eslint-disable-line no-console
        return []
    }

    // cryptographic (sha3) signature used to recognize event in transaction receipt -> event
    const eventsBySignature = _(abi)
        .filter(m => m.type === 'event')
        .map(m => [new SolidityEvent(null, m, null).signature(), m])
        //.map(m => [web3.eth.abi.encodeEventSignature(m), m])      // web3.js 1.0
        .fromPairs()

    return _(logs).map(log => {
        if (address && address !== log.address) {
            return 
        }
        const sig = log.topics[0].replace('0x', '')
        const event = eventsBySignature.get(sig)
        if (!event) {
            return 
        }  // continue; this could be some other contract's event, or anonymous event
        // TODO: currently will not handle "anonymous events" (events with no signature in topics[0]), simply ignores them

        /* web3.js 1.0 (remove direct SolidityCoder/SolidityEvent refs)
        // for anonymous events, const paramValues = web3.eth.abi.decodeLog(event.inputs, log.data, log.topics)
        const paramValues = web3.eth.abi.decodeLog(event.inputs, log.data, log.topics.slice(1))
        const paramValueArray = _.range(event.inputs.length).map(i => paramValues[i])

        return [event.name, paramValueArray]
        */
        
        return parseLogIntoArray(log, event)
    })
        .filter()
        .fromPairs()
        .value()
}

function parseLogIntoArray(log, event) {
    // TODO: probably should handle somehow "If arrays (including string and bytes) are used as indexed arguments, the Keccak-256 hash of it is stored as topic instead." (http://solidity.readthedocs.io/en/develop/contracts.html#events)
    // also TODO: when web3.js 1.0 is out, check how it does it
    const paramTypes = event.inputs.filter(i => !i.indexed).map(i => i.type)
    const paramBytes = log.data.replace('0x', '')   // unindexed params go into data
    const iParamBytes = log.topics.slice(1)         // indexed params go into topics
    const paramValues = solidityCoder.decodeParams(paramTypes, paramBytes)

    const allParamValues = event.inputs.map(i => {
        if (i.indexed) {
            return solidityCoder.decodeParam(i.type, iParamBytes.shift())
        } else {
            return paramValues.shift()
        }
    })
    return [event.name, allParamValues]
}

export function decodeEvent(log, eventAbi) {
    /* web3.js 1.0 (remove direct SolidityCoder/SolidityEvent refs)
    // for anonymous events, const paramValues = web3.eth.abi.decodeLog(event.inputs, log.data, log.topics)
    return web3.eth.abi.decodeLog(event.inputs, log.data, log.topics.slice(1))
    */

    // TODO: probably should handle somehow "If arrays (including string and bytes) are used as indexed arguments, the Keccak-256 hash of it is stored as topic instead." (http://solidity.readthedocs.io/en/develop/contracts.html#events)
    // also TODO: when web3.js 1.0 is out, check how it does it
    const paramTypes = eventAbi.inputs.filter(i => !i.indexed).map(i => i.type)
    const paramBytes = log.data.replace('0x', '')   // unindexed params go into data
    const iParamBytes = log.topics.slice(1)         // indexed params go into topics
    const paramValues = solidityCoder.decodeParams(paramTypes, paramBytes)
    const paramNames = eventAbi.inputs.map(i => i.name)

    return fromPairs(eventAbi.inputs.map(i => [paramNames.shift(), i.indexed ? solidityCoder.decodeParam(i.type, iParamBytes.shift()) : paramValues.shift()]))
}