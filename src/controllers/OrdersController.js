//Orders Model
const Orders = require("../models/Orders");
//Users Model
const Users = require("../models/Users");
//Shopping Cart Items Model
const Shopping_cart_items_model = require("../models/ShoppingCartItems");
//OrdersDetails controller
const OrderDetails_controller = require("./OrderDetailsController");
//Shopping cart items controller
const Shopping_cart_items_controller = require("./ShoppingCartItemsController");
//orderValidation from validation folder
const orderValidation = require("../validation/orderValidation");

/*
Orders
- PlaceOrder - POST: api/Orders
- OrderDetails - GET: api/Orders/OrderDetails/4(Order Id)
- OrdersByUser - GET: api/Orders/OrdersByUser/3(User Id)
sci = shopping cart items
*/


//User can placeOrder in orderData we have an object (from req.body) which has:
//JSON example
/*
{
    "userId":"60255c0c528960047090f565",
    "phone":"123456789",
    "address":"Admirala Zmajevica 48"
}
*/
//1.We pass orderData to orderValidation (asynchronous function) which will like in userValidation return an array of errors
//2.If validator(array of errors) has length greater than 0 that means we have errors and we resolve them
//3.if validator is empty we proceed 
//4.We find user from orderData.userId (user)
//5.We find Shopping_cart_items by searching for userId from user.id (sci)
//6.We create new order with data provided by user,sci,orderData
//7.We create OrderDetails with parameters sci.totalAmount, order._id, sci.products
//8. We clear shoppingCart that belongs to user who placed order

//UPDATE 20210215: We no longer fetch userId from orderData (req.body) we now have req.user (provided by passport authentication)
//which we pass to placeOrder as parameter called userId 
function placeOrder(orderData,userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const validator = await orderValidation(orderData,userId);
            if (validator.length > 0) {
                resolve(validator);
            } else {
                const user = await Users.findOne({ _id:userId });
                const sci = await Shopping_cart_items_model.findOne({ userId: userId });
                const order = await Orders.create({
                    fullName: user.fullName,
                    address: orderData.address,
                    phone: orderData.phone,
                    orderTotal: sci.totalAmount,
                    orderPlaced: getTodaysDate(),
                    userId: user._id
                });
                await OrderDetails_controller.createOrderDetails(sci.totalAmount, order._id, sci.products);
                await Shopping_cart_items_controller.clearShoppingCart(user._id);
                resolve(order);   
            }
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while placing an order!',
                status: 500,
                err_msg
            })
        }
    });
}

//Getting order details
function getOrderDetails(orderId) {
    return new Promise(async (resolve, reject) => {
        try {
            const orderDetailsData = await OrderDetails_controller.getOrderDetailsByOrderId(orderId)

            resolve(orderDetailsData);
        } catch (err_msg) {
            reject(err_msg)
        }
    });
}

//Getting orders by user (by his id)
function getOrdersByUserId(userId) {
    return new Promise((resolve, reject) => {
        try {
            resolve(
                Orders.find({ userId: userId }).lean().sort({ createdAt: -1 })
            );
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while fetching an order!',
                status: 500,
                err_msg
            })
        }
    });
}


//This is returning wrong date(one day early) we need to provide new one
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