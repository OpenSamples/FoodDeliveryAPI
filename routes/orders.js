const router = require("express").Router();
const Orders = require("../controllers/OrdersController");

router.post("/", async (req, res) => {
    const ordersData = req.body;
    try {
        await Orders.add(ordersData);
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