const bcrypt = require('bcrypt-nodejs')
const LocalStrategy = require('passport-local').Strategy
const User = require('../database/models/user')
const Service = require('../database/models/service')

const LoginStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({
        where: {
            email: email
        },
        include: [Service]
    })
        .then((user) => {
            let error
            if (user && bcrypt.compareSync(password, user.get('password'))) {
                return done(null, user)
            } else {
                error = new Error('Username or password not found!')
                error.statusCode = 403
                done(error)
            }
        })
})

module.exports = LoginStrategy