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

router.get("/sub-total/:userId", async (req, res) => {
    try {
        const shoppingCartTotalPrice = await Shopping_cart_items.getTotalPrice(req.params.userId);
        res.json(shoppingCartTotalPrice);
    } catch (error) {
        res.send("Error in getting shopping cart items: "+error);
    }
});

router.get("/all-items/:userId", async (req, res) => {
    try {
        const allShoppingCartItems = await Shopping_cart_items.getItems(req.params.userId);
        res.json(allShoppingCartItems);
    } catch (error) {
        res.send("Error in getting shopping cart items: "+error);
    }
});

router.get("/total-items/:userId", async (req, res) => {
    try {
        const totalItems = await Shopping_cart_items.getTotalItems(req.params.userId);
        res.json(totalItems);
    } catch (error) {
        res.send("Error in getting shopping cart items: "+error);
    }
});

router.post("/remove-item/:sciId", async (req, res) => {
    try {
        const deletedItem = await Shopping_cart_items.clearShoppingCart(req.params.sciId);
        res.json(deletedItem);
    } catch (error) {
        res.send("Error in getting shopping cart items: "+error);
    }
});

module.exports = router;