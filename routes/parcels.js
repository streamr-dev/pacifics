const aes = require('aes-cross')
const crypto = require('crypto')
const express = require('express')
const fs = require('fs')
const fetch = require('node-fetch')
const http = require('http')
const EncryptedImage = require('../database/models/encrypted_image')

const router = express.Router()

router.get('/:parcelAddress/photos', (req, res) => {
    const parcelAddress = req.query.parcelAddress

    EncryptedImage.findAll({
        where: { parcel:  parcelAddress}
    }).then((encryptedImages) => {
        res.json(encryptedImages)
    })
})

router.get('/:parcelAddress/photos/:ipfsHash', (req, res) => {
    const parcelAddress = req.query.parcelAddress
    const ipfsHash = req.query.ipfsHash

    EncryptedImage.findOne({
        where: {
            parcel: parcelAddress,
            hash: ipfsHash
        }
    }).then((encryptedImage) => {
        const initialVector = new Buffer(encryptedImage.initialVector, 'hex')
        const salt = new Buffer(encryptedImage.salt, 'hex')
        const streamAuthKey = 'kl84S28SRXqqfajeUifCcg'

        const encryptedImageLoading = fetchEncryptedBytes(ipfsHash)
        const keyGenerating = deriveKey(streamAuthKey, salt, 32)

        Promise.all([encryptedImageLoading, keyGenerating])
            .then((results) => {
                const [encryptedByteResult, secretKey] = results
                const imageBytes = decryptBytes(encryptedByteResult, secretKey, initialVector)
                res.contentType('image/jpeg')
                res.end(imageBytes, 'binary')
            }).catch(console.error)
    }).catch(console.error)
})

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
        throw 'AES.checkKey error: key is null ';
    }
    if (key.length !== 32) {
        throw 'AES.checkKey error: key length is not 32' + ': ' + key.length;
    }

    const decipher = crypto.createDecipheriv('AES-256-CTR', key, iv)
    decipher.setAutoPadding(true)
    return Buffer.concat([decipher.update(buff), decipher.final()])
}

module.exports = router