const express = require('express')

let router = express.Router()

router
    .post('/orders', (req, res) => {
        res.status(200).json({message: 'Successfully created a new order!'})
    })
    .get('/orders/orderDetails/:orderId', (req, res) => {
        const orderId = req.params.orderId

        res.status(200).json({message: `Order details for order with an id ${orderId}`})
    })
    .get('/orders/orderByUser/:userId', (req, res) => {
        const userId = req.params.userId

        res.status(200).json({message: `Order details for order with user id ${userId}!`})
    })

module.exports = router