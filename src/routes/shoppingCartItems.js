const express = require('express')

let router = express.Router()

router
    .post('/shoppingCartItems', (req, res) => {
        res.status(200).json({message: 'Add new shopping cart item.'})
    })
    .get('/shoppingCartItems/subTotal/:id', (req, res) => {
        const id = req.params.id

        res.status(200).json({message: `Total price for cart id: ${id}`})
    })
    .get('/shoppingCartItems/:userId', (req, res) => {
        const userId = req.params.userId

         res.status(200).json({message: `Shopping cart items for user with the id: ${userId}`})
    })
    .get('/shoppingCartItems/totalItems/:userId', (req, res) => {
        const userId = req.params.userId

        res.status(200).json({message: `Items of user with an id: ${userId}`})
    })
    .delete('/shoppingCartItems/:userId', (req, res) => {
        const userId = req.params.userId

        res.status(200).json({message: `Clear the shopping cart for an user with the id: ${userId}`})
    })

module.exports = router