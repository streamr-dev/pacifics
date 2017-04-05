const express = require('express')
const router = express.Router()
const Service = require('../database/models/service')

router.get('/', (req, res) => {
    Service.findAll()
        .then(result => {
            res.send(result.toJSON({
                plain: true
            }))
        })
        .catch(e => res.send({
            error: e
        }))
})

module.exports = router