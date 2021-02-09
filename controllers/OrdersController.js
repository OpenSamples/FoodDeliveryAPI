const Orders = require("../models/Orders");
const Users = require("../models/Users");
const Shopping_cart_items_model = require("../models/ShoppingCartItems");
const OrderDetails_controller = require("./OrderDetailsController");
const Shopping_cart_items_controller = require("./ShoppingCartItemsController");

/*
Orders
- PlaceOrder - POST: api/Orders
- OrderDetails - GET: api/Orders/OrderDetails/4(Order Id)
- OrdersByUser - GET: api/Orders/OrdersByUser/3(User Id)
sci = shopping cart items
*/

function placeOrder(orderData) {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await Users.findOne({_id:orderData.userId}); 
            const sci = await Shopping_cart_items_model.findOne({userId:user.id});
            const order = await Orders.create({
                fullName:user.fullName,
                address:orderData.address,
                phone:orderData.phone,
                orderTotal:sci.totalAmount,
                orderPlaced:getTodaysDate(),
                userId:user._id
            });
            await OrderDetails_controller.createOrderDetails(sci.totalAmount,order._id,sci.products);
            await Shopping_cart_items_controller.clearShoppingCart(user._id);
            resolve(order);
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function getOrderDetails(orderId){
    return new Promise((resolve,reject)=>{
        try {
            resolve(
                OrderDetails_controller.getOrderDetailsByOrderId(orderId)
            );
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}


function getOrdersByUserId(userId){
    return new Promise((resolve,reject)=>{
        try {
            resolve(
                Orders.find({userId:userId}).lean().sort({createdAt:-1})
            );
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}



function getTodaysDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

module.exports = {
    placeOrder,
    getOrderDetails,
    getOrdersByUserId
};