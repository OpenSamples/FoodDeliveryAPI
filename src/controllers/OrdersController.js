const Orders = require('../models/Orders')
const OrderDetails = require('../models/OrderDetails')
const isOrderValid = require('../validation/isOrderValid')

function placeOrder(order) {
    return new Promise((resolve, reject) => {
        try {
            const isValid = isOrderValid(order)
            if(isValid !== 'OK') {
                throw {error: true, message: 'Order data is not valid!'}
            }
            // Place order
            resolve(Orders.create(order))
        } catch (e) {
            reject(e)
        }
    })
}

function orderDetails(orderId) {
    return new Promise((resolve, reject) => {
        try {
            resolve(OrderDetails.find({ orderId }).exec())
        } catch(e) {
            reject(e)
        }
    })
}

function ordersByUser(userId) {
    return new Promise((resolve, reject) => {
        try {
            resolve(Orders.find({userId}).exec())
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    placeOrder,
    orderDetails,
    ordersByUser
}