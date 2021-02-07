const router = require("express").Router();
const Orders = require("../controllers/OrdersController");

/*
Orders
- PlaceOrder - POST: api/Orders (Sadrzi niz OrderDetails...svaki OrderDetails sadrzi jedan Product koji je User izabrao)
- OrderDetails - GET: api/Orders/OrderDetails/4(OrderDetails Id)
- OrdersByUser - GET: api/Orders/OrdersByUser/3(User Id)
*/

router.post("/", async (req, res) => {
    const ordersData = req.body;
    try {
        //await Orders.add(ordersData);
        res.json("hello");
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/order-details/:orderId", async (req, res) => {
    try {

    } catch (error) {
        res.send("Error in getting order details: "+error);
    }
});

router.get("/orders-by-users/:userId", async (req, res) => {
    try {
        const ordersByUser = await Orders.findByUser(req.params.userId);
        res.json(ordersByUser);
    } catch (error) {
        res.send("Error in getting orders by user: "+error);
    }
});

module.exports = router;