const aes = require('aes-cross')
const crypto = require('crypto')
const express = require('express')
const fs = require('fs')
const fetch = require('node-fetch')
const http = require('http')
const router = express.Router()

router.get('/', (req, res) => {
    const ipfsHash = req.query.ipfsHash
    const initialVector = new Buffer(req.query.initialVector, 'hex')
    const salt = new Buffer(req.query.salt, 'hex')
    const streamAuthKey = 'kl84S28SRXqqfajeUifCcg'

    const encryptedImageLoading = fetchEncryptedBytes(ipfsHash)
    const keyGenerating = deriveKey(streamAuthKey, salt, 32)

    aes.setKeySize(256)

    Promise.all([encryptedImageLoading, keyGenerating])
        .then((results) => {
            const [encryptedByteResult, secretKey] = results
            const imageBytes = decryptBytes(encryptedByteResult, secretKey, initialVector)
            res.contentType('image/jpeg')
            res.end(imageBytes, 'binary')
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
    checkKey(key);
    const decipher = crypto.createDecipheriv('AES-256-CTR', key, iv);
    decipher.setAutoPadding(true);
    const out = Buffer.concat([decipher.update(buff), decipher.final()]);
    return out
}

function checkKey(key) {
    if (!key) {
        throw 'AES.checkKey error: key is null ';
    }
    if (key.length !== (256 / 8)) {
        throw 'AES.checkKey error: key length is not ' + (keySize / 8) + ': ' + key.length;
    }
}

module.exports = router