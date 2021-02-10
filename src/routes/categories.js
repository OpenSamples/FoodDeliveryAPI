const express = require('express')

let router = express.Router()

router
    .get('/categories', (req, res) => {
        res.status(200).json({message: 'There is all categories, just for you!'})
    })

module.exports = router