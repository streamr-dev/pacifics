const crypto = require('crypto')
const express = require('express')
const fetch = require('node-fetch')
const EncryptedImage = require('../database/models/encrypted_image')
const authenticateUser = require('../middleware/authenticate')

const router = express.Router()

router.get('/:parcelAddress/photos/latest', (req, res) => {
    const parcelAddress = req.params.parcelAddress
    const fetchOptions = {
        where: {
            parcel: parcelAddress,
        },
        order: [
            ['updatedAt', 'DESC']
        ]
    }
    fetchDecryptAndRespond(fetchOptions, res)
})

router.get('/:parcelAddress/photos', authenticateUser, (req, res) => {
    const parcelAddress = req.params.parcelAddress

    EncryptedImage.findAll({
        where: {
            parcel:  parcelAddress
        }
    }).then((encryptedImages) => {
        res.json(encryptedImages.map(image => ({
            ipfsHash: image.hash,
            createdAt: image.createdAt
        })))
    })
})

router.get('/:parcelAddress/photos/:ipfsHash', authenticateUser, (req, res) => {
    const parcelAddress = req.params.parcelAddress
    const ipfsHash = req.params.ipfsHash
    const fetchOptions = {
        where: {
            parcel: parcelAddress,
            hash: ipfsHash
        }
    }
    fetchDecryptAndRespond(fetchOptions, res)
})

function fetchDecryptAndRespond(fetchOptions, res) {
    EncryptedImage.findOne(fetchOptions).then((encryptedImage) => {
        if (encryptedImage) {
            const initialVector = new Buffer(encryptedImage.initialVector, 'hex')
            const salt = new Buffer(encryptedImage.salt, 'hex')
            const streamAuthKey = 'kl84S28SRXqqfajeUifCcg'

            const encryptedImageLoading = fetchEncryptedBytes(encryptedImage.hash)
            const keyGenerating = deriveKey(streamAuthKey, salt, 32)

            Promise.all([encryptedImageLoading, keyGenerating])
                .then((results) => {
                    const [encryptedByteResult, secretKey] = results
                    const imageBytes = decryptBytes(encryptedByteResult, secretKey, initialVector)
                    res.contentType('image/jpeg')
                    res.end(imageBytes, 'binary')
                })
                .catch(console.error)
        } else {
            res.status(404).send('Not found.')
        }
    })
        .catch(console.error)
}

function deriveKey(authKey, salt, keyLen) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(authKey, salt, 20, keyLen, 'sha1', (err, key) => {
            if (err) {
                reject(err)
            } else {
                resolve(new Buffer(key))
            }
        })
    })
}

function fetchEncryptedBytes(ipfsHash) {
    return fetch('https://ipfs.infura.io/ipfs/' + ipfsHash)
        .then((result) => result.buffer())
}

function decryptBytes(encryptedBytes, secretKey, initialVector) {
    return decBytes(new Buffer(encryptedBytes), secretKey, initialVector)
}

function decBytes(buff, key, iv) {
    if (!key) {
        throw 'AES.checkKey error: key is null '
    }
    if (key.length !== 32) {
        throw 'AES.checkKey error: key length is not 32' + ': ' + key.length
    }

    const decipher = crypto.createDecipheriv('AES-256-CTR', key, iv)
    decipher.setAutoPadding(true)
    return Buffer.concat([decipher.update(buff), decipher.final()])
}

module.exports = router