/*global web3*/
//import web3 from 'web3'
import {postboxCreatorABI, postboxCreatorAddress} from './abi'
import {getEventsFromLogs} from './ethCall'

/**
 * Create Postbox contract
 * @param minuteFee Fee per minute to rent the postbox (for public postboxes)
 * @param minRent Minimum fee to rent the postbox (for public postboxes)
 * @param maxDeposit Maximum deposit insurance provided by the postbox (for public postboxes)
 * @returns {Promise.<string>} created contract's address
 */
export const createPostbox = (name = 'Postbox', description = 'Unnamed postbox', location = 'Unknown'/*, minuteFee=0, minRent=0, maxDeposit=0*/, ownerAddress = web3.eth.coinbase) => {
    const PostboxCreator = web3.eth.contract(postboxCreatorABI).at(postboxCreatorAddress)
    console.log('Creating postbox ' + name)
    return new Promise(done => {
        PostboxCreator.createPostbox(ownerAddress, name, description, location, 0, 0, 0 /*minuteFee, minRent, maxDeposit*/, (err, tx) => {
            if (err) {
                throw err
            }
            const filter = web3.eth.filter('latest')
            filter.watch(function(error, blockHash) {       //eslint-disable-line no-unused-vars
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
                    console.log('Created postbox', response)
                    done(response)
                })
            })
        })
    })
}
