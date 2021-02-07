const Orders = require("../models/Orders");

function add(data){
    return new Promise((resolve,reject)=>{
        try {
            resolve(Orders.create(data));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function orderDetails(orderId) {
    return new Promise((resolve, reject) => {
        try {
            resolve(Orders.find({_id: orderId}));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function findByUser(userId) {
    return new Promise((resolve, reject) => {
        try {
            resolve(Orders.find({userId:userId}));
        }catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

module.exports = {
add,
orderDetails,
findByUser
};