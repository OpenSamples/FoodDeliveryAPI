const express = require('express')

let router = express.Router()

router
    .post('/orders', (req, res) => {
        res.status(200).json({message: "Your order is created."})
    })
    .get('/orders/orderDetails/:orderId', (req, res) => {
        const orderId = req.params.orderId

        res.status(200).json({message: `Order details for an order with the id: ${orderId}`})
    })
    .get('/orders/orderByUser/:userId', (req, res) => {
        const userId = req.params.userId

        res.status(200).json({message: `Order details for an user with the id: ${userId}`})
    })

module.exports = router    