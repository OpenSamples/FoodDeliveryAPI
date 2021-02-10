const ShoppingCartItems = require('../models/ShoppingCartItems')
const Products = require('../models/Products')

function addToCart(userId, productId, qty = 1) {
    return new Promise(async (resolve, reject) => {
        try {
            if(!productId || !userId) throw {error: true, message: 'You need to provide user id and product id!'}

            const productsData = await Products.find({_id: productId}).exec()
            const productPrice = productsData[0].price
            const totalAmount = productPrice * qty

            resolve(ShoppingCartItems.findOneAndUpdate({ userId }, { 
                $addToSet: {
                    products: [{
                        productId,
                        $set: {
                            price: productPrice
                        },
                        $inc: {
                            qty
                        }
                    }]
                },
                $inc: {
                    totalAmount
                }
             }))
        } catch(e) {
            reject(e)
        }
    })
}


function shoppingCartTotalPrice(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const items = await ShoppingCartItems.find({ userId }).exec()
            const totalPrice = items[0].totalAmount

            resolve(totalPrice)
        } catch(e) {
            reject(e)
        }
    })
}

function getShoppingCartItems(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const shoppingCart = await ShoppingCartItems.find({ userId }).exec()

            // We got all Items IDs, price, qty
            const products = shoppingCart[0].products

            resolve(products)
        } catch(e) {
            reject(e)
        }
    })
}

function itemsInCart(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const shoppingCart = await ShoppingCartItems.find({ userId }).exec()

            // We got all product IDs in array, and use length of array to count them
            const products = shoppingCart[0].products.length

            resolve(products)
        } catch(e) {
            reject(e)
        }
    })
}

function clearShoppingCart(userId) {
    return new Promise((resolve, reject) => {
        try {
            resolve(ShoppingCartItems.findOneAndUpdate({ userId }, { $set: { products: [], totalAmount: 0 } }))
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    addToCart,
    shoppingCartTotalPrice,
    getShoppingCartItems,
    itemsInCart,
    clearShoppingCart
}