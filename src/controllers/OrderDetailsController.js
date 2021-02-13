const OrderDetails = require("../models/OrderDetails");


//Creating order details
function createOrderDetails(totalAmount,orderId,products){
    return new Promise((resolve,reject)=>{
        try {
            resolve(
                OrderDetails.create({
                    totalAmount:totalAmount,
                    orderId:orderId,
                    products:products
                })
            );
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while creating an order!',
                status: 500,
                err_msg
            })
        }
    });
}

//Getting orderDetails by orderId
function getOrderDetailsByOrderId(orderId){
    return new Promise((resolve,reject)=>{
        try {
            resolve(
                OrderDetails.findOne({orderId:orderId})
            );
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while fetching order details!',
                status: 500,
                err_msg
            })
        }
    });
}

module.exports = {
    createOrderDetails,
    getOrderDetailsByOrderId
};