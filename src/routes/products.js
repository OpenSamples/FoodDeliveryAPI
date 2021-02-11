const express = require('express')

let router = express.Router()

router
    .get('/products/:id', (req, res) => {
        let id = req.params.id
        
        res.status(200).json({message: `Product with the id ${id}`})
    })
    .get('/products/productsByCategory/:id', (req, res) => {
        let categoryId = req.params.id

        res.status(200).json({message: `Products with category id: ${categoryId}`})
    })
    .get('/products/popularProducts', (req, res) => {
        res.status(200).json({message: 'Popular products.'})
    })

module.exports = router