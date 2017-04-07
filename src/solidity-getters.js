/*global web3*/
//import web3 from 'web3'
import zipObject from 'lodash/zipObject'

/**
 * Get all fields marked "public" in given Solidity contract
 * @param abi Application Binary Interface for the contract
 * @param address Blockchain address of the contract
 * @returns {Promise} Object with public field names as keys and values as values
 */
export function getAll(abi, address) {
    const contract = web3.eth.contract(abi).at(address)
    const propNames = abi
        .filter(m => m.constant && m.inputs && m.inputs.length === 0 && m.outputs && m.outputs.length === 1)
        .map(m => m.name)
    return Promise.all(propNames.map(propName => get(contract, propName)))
        .then(propValues => {
            return zipObject(propNames, propValues)
        })
}

/**
 * Getter for Solidity contract field marked "public"
 * Must be a primitive (not array or mapping)
 * @param contract Contract to read
 * @param propName Name of the property to read
 * @returns {Promise} Value of the property
 */
export function get(contract, propName) {
    return new Promise((done, fail) => {
        contract[propName]((err, result) => {
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
 * Getter for Solidity contract field marked "public"
 * Must be an array or mapping
 * @param contract Contract to read
 * @param propName Name of the property to read
 * @returns {Promise} Value of the property
 */
export function at(index, contract, propName) {
    return new Promise((done, fail) => {
        contract[propName](index, (err, result) => {
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
