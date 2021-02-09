const OrderDetails = require("../models/OrderDetails");

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
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function getOrderDetailsByOrderId(orderId){
    return new Promise((resolve,reject)=>{
        try {
            resolve(
                OrderDetails.findOne({orderId:orderId})
            );
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

module.exports = {
    createOrderDetails,
    getOrderDetailsByOrderId
};