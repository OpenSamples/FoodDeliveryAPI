const router = require("express").Router();

/*
Orders
- PlaceOrder - POST: api/Orders
- OrderDetails - GET: api/Orders/OrderDetails/4
- OrdersByUser - GET: api/Orders/OrdersByUser/3
*/

router.post("", async (req, res) => {
    try {

    } catch (error) {
        res.send("Error in placing order: "+error);
    }
});

router.get("/order-details/:orderId", async (req, res) => {
    try {

    } catch (error) {
        res.send("Error in getting order details: "+error);
    }
});

router.get("orders-by-users/:orderId", async (req, res) => {
    try {

    } catch (error) {
        res.send("Error in getting orders by user: "+error);
    }
});

module.exports = router;