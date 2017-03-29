const bcrypt = require('bcrypt-nodejs')
const LocalStrategy = require('passport-local').Strategy
const User = require('../database/models/user')

const SignupStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.create({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(password)
    })
        .then(user => done(null, user.toJSON()))
        .catch(e => done(e))
})

module.exports = SignupStrategy