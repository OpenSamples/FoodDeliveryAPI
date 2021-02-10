const express = require('express')

let router = express.Router()

router
    .post('/accounts/login', (req, res) => {
        res.status(200).json({message: 'You\'ve successfully logged in!'})
    })
    .post('/accounts/register', (req, res) => {
        res.status(200).json({message: 'You\'ve successfully created an account!'})
    })

module.exports = router