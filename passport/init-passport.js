
const passport = require('passport')

const User = require('../database/models/user')

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.email) // assumes email is unique
})

// used to deserialize the user
passport.deserializeUser((email, done) => {
    User.findOne({
        where: {
            email: email
        }
    })
        .then(user => done(null, user.toJSON()))
        .catch(() => done(new Error(`User with the email ${email} does not exist`)))
})

passport.use('local-signup', require('./local-signup-strategy'))

passport.use('local-login', require('./local-login-strategy'))

module.exports = passport