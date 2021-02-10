const express = require('express')

let router = express.Router()

router
    .get('/example', (req, res) => {
        res.status(200).json({message: 'Example page'})
    })

module.exports = router