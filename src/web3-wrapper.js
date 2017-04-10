/* global web3 */

const web3Replacer = {
    eth: {}
}

let e = web3Replacer.eth

web3Replacer.toWei = e.filter = e.contract = e.getTransactionReceipt = () => {
    throw new Error('MetaMask not installed!')
}
    
module.exports = typeof web3 !== 'undefined' ? web3 : web3Replacer