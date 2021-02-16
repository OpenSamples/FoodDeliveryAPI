const router = require("express").Router();
const Orders = require("../controllers/OrdersController");
const {isAuth} = require("./authMiddleware");
const {isAdmin} = require("./authMiddleware");

/*
Orders
- PlaceOrder - POST: api/Orders
- OrderDetails - GET: api/Orders/OrderDetails/4(Order Id)
- OrdersByUser - GET: api/Orders/OrdersByUser/3(User Id)
*/

//IDEA: After logged user decides he/she is ready to continue with his shoppingCart and proceed to order
//new Order will be created in placeOrder function we pass orderData (from req.body)
//tested:working
router.post("/",isAuth, async (req, res) => {
    const orderData = req.body;
    const userId = req.user.id;
    try {
        const newOrderByUser = await Orders.placeOrder(orderData,userId);
        res.status(201).json(newOrderByUser);
    } catch (error) {
      res.status(403).json(error);
    }
});

//Getting order details 
//tested:working
router.get("/order-details/:orderId",isAuth, async (req, res) => {
    try {
     const orderDetailsByOrderId = await Orders.getOrderDetails(req.params.orderId);
     res.status(200).json(orderDetailsByOrderId);
    } catch (error) {
        res.status(403).json(error);
    }
});

//Getting orders by user
//tested:working
//UPDATE 20210215: No longer using req.params.userId now we have req.user 
router.get("/orders-by-user",isAuth, async (req, res) => {
    const userId = req.user.id;
    try {
       const ordersByUser = await Orders.getOrdersByUserId(userId);
       res.status(200).json(ordersByUser);
    } catch (error) {
        res.status(403).json(error);
    }
});

module.exports = router;