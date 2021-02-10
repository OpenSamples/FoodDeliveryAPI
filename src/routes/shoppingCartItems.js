const express = require('express')

let router = express.Router()

router
    .post('/shoppingCartItems', (req, res) => {
        res.status(200).json({message: 'Shopping cart items! Add to cart...'})
    })
    .get('/shoppingCartItems/subTotal/:id', (req, res) => {
        const id = req.params.id

        res.status(200).json({message: `Total price of cart with id ${id}!`})
    })
    .get('/shoppingCartItems/:userId', (req, res) => {
        const userId = req.params.userId

        res.status(200).json({message: `Shopping cart items of user with an id ${userId}!`})
    })
    .get('/shoppingCartItems/totalItems/:userId', (req, res) => {
        const userId = req.params.userId

        res.status(200).json({message: `Items of user with an id ${userId}!`})
    })
    .delete('/shoppingCartItems/:userId', (req, res) => {
        const userId = req.params.userId

        res.status(200).json({message: `Cleaning shopping cart for user with an id ${userId}!`})
    })

module.exports = router