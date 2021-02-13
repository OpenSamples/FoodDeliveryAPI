const router = require("express").Router();
const Orders = require("../controllers/OrdersController");

/*
Orders
- PlaceOrder - POST: api/Orders
- OrderDetails - GET: api/Orders/OrderDetails/4(Order Id)
- OrdersByUser - GET: api/Orders/OrdersByUser/3(User Id)
*/

//IDEA: After logged user decides he/she is ready to continue with his shoppingCart and proceed to order
//new Order will be created in placeOrder function we pass orderData (from req.body)
//tested:working
router.post("/", async (req, res) => {
    const orderData = req.body;
    try {
        const newOrderByUser = await Orders.placeOrder(orderData);
        res.status(201).json(newOrderByUser);
    } catch (error) {
        res.status( error?.status || 403).json(error);
    }
});

//Getting order details 
//tested:working
router.get("/order-details/:orderId", async (req, res) => {
    try {
     const orderDetailsByOrderId = await Orders.getOrderDetails(req.params.orderId);
     res.status(200).json(orderDetailsByOrderId);
    } catch (error) {
        res.status( error?.status || 403).json(error);
    }
});

//Getting orders by user
//tested:working
router.get("/orders-by-user/:userId", async (req, res) => {
    try {
       const ordersByUser = await Orders.getOrdersByUserId(req.params.userId);
       res.status(200).json(ordersByUser);
    } catch (error) {
        res.status( error?.status || 403).json(error);
    }
});

module.exports = router;