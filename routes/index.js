const express = require('express')
const router = express.Router()

router.get('*', (req, res, next) => {
    // Do not render index page if trying to reach for a file
    if (req.url.match(/.*\..+$/)) {
        return next()
    }
    res.render('index', {
        user: req.user
    })
})

module.exports = router