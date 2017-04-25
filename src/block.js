import web3 from './web3-wrapper.js'

export function getBlockDate(blockNumber) {
    return new Promise((resolve, reject) => {
        web3.eth.getBlock(blockNumber, (err, block) => {
            if (err) {
                return reject(err)
            }
            resolve(block.timestamp)
        })
    })
}
