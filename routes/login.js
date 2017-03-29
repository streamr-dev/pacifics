const express = require('express')
const router = express.Router()
const passport = require('passport')

const bodyParser = require('body-parser')

router.use(bodyParser.json({
    type: 'application/json'
}))

const sendError = (status, message, res) => {
    return res.status(status)
        .send({
            error: message
        })
}

router.post('/', (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    let error
    if (!email) {
        error = 'Email missing'
    } else if (!password) {
        error = 'Password missing'
    }
    if (error) {
        return sendError(403, error, res)
    }
    passport.authenticate('local-login', (err, user) => {
        if (err) {
            return sendError(err.statusCode || 500, err.message, res)
        }
        req.logIn(user, (err) => {
            if (err) {
                return sendError(500, err.message, res)
            }
            res.send(user)
        })
    })(req, res, next)
})

module.exports = router