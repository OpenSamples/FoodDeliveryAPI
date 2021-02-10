// We have to include routes here and export it in array
const account = require('./account')
const categories = require('./categories')
const orders = require('./orders')
const products = require('./products')
const shoppingCartItems = require('./shoppingCartItems')

// Example page
const example = require('./example')

module.exports = [example, account, categories, orders, products, shoppingCartItems]