const express = require('express')

let router = express.Router()

router
    .get('/categories', (req, res) => {
        res.status(200).json({message: 'List of categories.'})
    })

module.exports = router