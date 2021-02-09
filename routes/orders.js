const router = require("express").Router();
const Orders = require("../controllers/OrdersController");

/*
Orders
- PlaceOrder - POST: api/Orders
- OrderDetails - GET: api/Orders/OrderDetails/4(Order Id)
- OrdersByUser - GET: api/Orders/OrdersByUser/3(User Id)
*/

router.post("/", async (req, res) => {
    const orderData = req.body;
    try {
        const newOrderByUser = await Orders.placeOrder(orderData);
        res.status(201).json(newOrderByUser);
    } catch (error) {
      res.status(403).json(error);
    }
});

router.get("/order-details/:orderId", async (req, res) => {
    try {
     const orderDetailsByOrderId = await Orders.getOrderDetails(req.params.orderId);
     res.json(orderDetailsByOrderId);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/orders-by-user/:userId", async (req, res) => {
    try {
       const ordersByUser = await Orders.getOrdersByUserId(req.params.userId);
       res.json(ordersByUser);
    } catch (error) {
        res.status(403).json(error);
    }
});

module.exports = router;