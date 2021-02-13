const router = require("express").Router();
//Shopping_cart_items Controller
const Shopping_cart_items = require("../controllers/ShoppingCartItemsController");
//Users controller
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

//IDEA: Logged user can add product to shopping cart we are fetching product id from url and userId from req.body
//this can be changed later we are passing those variables as parameters to the addToCart function
//tested:working
router.post("/:productId", async (req, res) => {
    const data = req.body;
    try {
        await Shopping_cart_items.addToCart(data, req.params.productId);
        const user = await Users.getUserById(data.userId);
        res.status(201).json({ msg: "Product added to cart that belongs to user: " + user.firstName })
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//Get ShoppingCart by user whose id is provided in url(req.params.userId), its passed as parameter to function
//getShoppingCartItemsByUserId 
//tested:working
router.get("/:userId", async (req, res) => {
    try {
        const usersShoppingCart = await Shopping_cart_items.getShoppingCartItemsByUserId(req.params.userId);
        res.status(200).json(usersShoppingCart);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//Getting total amount of every product in cart (getting total price of Shopping cart) 
//we are passing req.params.userId as parameter to getTotalPriceAmount function
//tested:working
router.get("/sub-total/:userId",async(req,res)=>{
    try {
        const totalAmount = await Shopping_cart_items.getTotalPriceAmount(req.params.userId);
        res.status(200).json(totalAmount);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//Getting total number of products in ShoppingCart
//tested:working
router.get("/total-items/:userId",async(req,res)=>{
    try {
        const totalItems = await Shopping_cart_items.getNumberOfProductsInCart(req.params.userId);
        res.status(200).json(totalItems);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//IDEA: Logged user can remove product he added from shopping cart we are getting userId from url and 
//productId from req.body those two are being passed as parameters to the removeProductFromShoppingCart function
//tested:working
router.post("/remove-product/:userId",async(req,res)=>{
    const productToBeRemoved = req.body.productId;
    try {
        await Shopping_cart_items.removeProductFromShoppingCart(req.params.userId,productToBeRemoved);
        res.status(200).json({msg:"Product removed from Shopping Cart"});
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//User can clear shopping cart by clearing it he is actually deleting it
//tested:working
router.post("/clear-cart/:userId",async(req,res)=>{
    try {
        await Shopping_cart_items.clearShoppingCart(req.params.userId);
        res.status(200).json({msg:"Shopping cart cleared. It is empty now."});
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

module.exports = router;