const router = require("express").Router();

/*
ShopingCartItems
- AddToCart - POST: api/ShoppingCartItems
- ShoppingCartTotalPrice - GET: api/ShoppingCartItems/SubTotal/3
- GetShoppingCartItems - GET: api/ShoppingCartItems/3
- ItemsInCart - GET: api/ShoppingCartItems/TotalItems/3
- ClearShoppingCart - DEL: api/ShoppingCartItems/3
*/

router.post("/", async (req, res) => {
    try {

    } catch (error) {
        res.send("Error in getting shopping cart items: "+error);
    }
});

router.get("/", async (req, res) => {
    try {

    } catch (error) {
        res.send("Error in getting shopping cart items: "+error);
    }
});

router.get("/", async (req, res) => {
    try {

    } catch (error) {
        res.send("Error in getting shopping cart items: "+error);
    }
});

router.get("/", async (req, res) => {
    try {

    } catch (error) {
        res.send("Error in getting shopping cart items: "+error);
    }
});

router.delete("/", async (req, res) => {
    try {

    } catch (error) {
        res.send("Error in getting shopping cart items: "+error);
    }
});

module.exports = router;