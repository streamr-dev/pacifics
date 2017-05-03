
const authenticateUser = (req, res, next) => {
    if (!req.user) {
        res.status(403).send('Not logged in!')
    } else {
        next()
    }
}

module.exports = authenticateUser