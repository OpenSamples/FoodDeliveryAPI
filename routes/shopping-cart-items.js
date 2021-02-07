const router = require("express").Router();
const Shopping_cart_items = require("../controllers/ShoppingCartItemsController");
const Products = require("../controllers/ProductsController");

/*
ShopingCartItems
- AddToCart - POST: api/ShoppingCartItems/4(Product ID)
- ShoppingCartTotalPrice - GET: api/ShoppingCartItems/SubTotal/3(SciId)
- GetShoppingCartItems - GET: api/ShoppingCartItems/3(SciId)
- ItemsInCart - GET: api/ShoppingCartItems/TotalItems/3
- ClearShoppingCart - DEL: api/ShoppingCartItems/3
*/

router.post("/:productId", async (req, res) => {
    const shoppingCartItemData = req.body;
    const productData = await Products.findOneById(req.params.productId);
    try {
        const sci = await Shopping_cart_items.addToCart(productData,shoppingCartItemData);
        res.json(sci);
    } catch (error) {
        res.send("Error in getting shopping cart items: "+error);
    }
});

router.get("/sub-total/:sciId", async (req, res) => {
    try {

    } catch (error) {
        res.send("Error in getting shopping cart items: "+error);
    }
});

router.get("/:sciId", async (req, res) => {
    try {

    } catch (error) {
        res.send("Error in getting shopping cart items: "+error);
    }
});

router.get("/total-items/:sciId", async (req, res) => {
    try {

    } catch (error) {
        res.send("Error in getting shopping cart items: "+error);
    }
});

router.delete("/:sciId", async (req, res) => {
    try {

    } catch (error) {
        res.send("Error in getting shopping cart items: "+error);
    }
});

module.exports = router;