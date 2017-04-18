'use strict'

const express = require('express')
const router = express.Router()
const passport = require('passport')

const bodyParser = require('body-parser')

router.use(bodyParser.json({
    type: 'application/json'
}))

router.post('/', (req, res, next) => {
    let error
    if (!req.body.email) {
        error = 'Email required!'
    } else if (!req.body.password) {
        error = 'Password required!'
    } else if (!req.body.serviceId) {
        error = 'Service required!'
    } else {
        for (const input in req.body) {
            const value = req.body[input]
            /* eslint no-control-regex: 0 */
            if (value.match(/[^\x00-\x7F]/)) {
                error = 'Fields cannot contain any non-ASCII characters! Field: ' + input
                break
            }
        }
    }
    if (error) {
        return res.status(403)
            .send({
                error: error
            })
    }
    passport.authenticate('local-signup', (err, user) => {
        if (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409)
                    .send({
                        error: 'Email is already taken'
                    })
            } else if (err.name === 'SequelizeValidationError' && err.errors && err.errors[0].path === 'email') {
                return res.status(403)
                    .send({
                        error: 'Invalid email address'
                    })
            } else {
                return next(err)
            }
        }
	    req.logIn(user, err => {
		    if (err) {
			    return next(err)
		    }
		    res.send(user)
	    })
    })(req, res, next)
})

module.exports = router
