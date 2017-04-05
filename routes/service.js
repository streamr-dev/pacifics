const express = require('express')
const router = express.Router()
const Service = require('../database/models/service')

router.get('/', (req, res) => {
    Service.findAll()
        .then(results => {
            res.send(results.map(i=> i.get({
                plain: true
            })))
        })
        .catch(e => {
            res.send({
                error: e.message || e
            })
        })
})

module.exports = router