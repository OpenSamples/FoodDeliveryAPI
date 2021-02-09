const router = require("express").Router();
const Shopping_cart_items = require("../controllers/ShoppingCartItemsController");
const Products = require("../controllers/ProductsController");
const Users = require("../controllers/UsersController");

/*
ShopingCartItems
- AddToCart - POST: api/ShoppingCartItems/4(Product ID)
- ShoppingCartTotalPrice - GET: api/ShoppingCartItems/SubTotal/3(SciId)
- GetShoppingCartItemsByUserId - GET: api/ShoppingCartItems/3(userId)
- ItemsInCart - GET: api/ShoppingCartItems/TotalItems/3
- RemoveProductFromUsersShoppingCart - POST api/ShoppingCartItems/remove-product/4 (User ID)
- ClearShoppingCart - DEL: api/ShoppingCartItems/3
*/

router.post("/:productId", async (req, res) => {
    const data = req.body;
    try {
        await Shopping_cart_items.addToCart(data, req.params.productId);
        const user = await Users.getUserById(data.userId);
        res.status(201).json({ msg: "Product added to cart that belongs to user: " + user.firstName })
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const usersShoppingCart = await Shopping_cart_items.getShoppingCartItemsByUserId(req.params.userId);
        res.json(usersShoppingCart);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/sub-total/:userId",async(req,res)=>{
    try {
        const totalAmount = await Shopping_cart_items.getTotalPriceAmount(req.params.userId);
        res.json(totalAmount);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/total-items/:userId",async(req,res)=>{
    try {
        const totalItems = await Shopping_cart_items.getNumberOfProductsInCart(req.params.userId);
        res.json(totalItems);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.delete("/remove-product/:userId",async(req,res)=>{
    const productToBeRemoved = req.body.productId;
    try {
        await Shopping_cart_items.removeProductFromShoppingCart(req.params.userId,productToBeRemoved);
        res.json({msg:"Product removed from Shopping Cart"});
    } catch (error) {
        res.status(403).json(error);
    }
});

router.post("/clear-cart/:userId",async(req,res)=>{
    try {
        await Shopping_cart_items.clearShoppingCart(req.params.userId);
        res.json({msg:"Shopping cart cleared. It is empty now."});
    } catch (error) {
        res.status(403).json(error);
    }
});

module.exports = router;