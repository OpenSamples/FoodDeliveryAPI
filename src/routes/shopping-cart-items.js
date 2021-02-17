const router = require("express").Router();
//Shopping_cart_items Controller
const Shopping_cart_items = require("../controllers/ShoppingCartItemsController");
//Users controller
const Users = require("../controllers/UsersController");
const {isAuth} = require("../services/authMiddleware");

// Using authentication
router.use(isAuth);


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
//UPDATE 20210215: userId is no longer being provided through req.body now we have authentication(Login) with passport
//which will populate req.user with logged user object we then provide userId (req.user.id) from route
router.post("/:productId", async (req, res) => {
    const qty = req.body.qty;
    const userId = req.user.id;
    try {
        await Shopping_cart_items.addToCart(qty, req.params.productId,userId);
        res.status(201).json({ msg: "Product added to cart that belongs to user: " + req.user.firstName });
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};
        
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
        
            return res.status(406).send({
                error: true,
                message: 'Validation error',
                status: 406,
                err_msg: errors

            });
        }
        res.status( error.status || 403).json(error);
    }
});

//Get ShoppingCart by user whose id is provided in url(req.params.userId), its passed as parameter to function
//getShoppingCartItemsByUserId 
//tested:working
//UPDATE 20210215: We no longer need query reading of userId (/:userId) we now have req.user which has all logged user data
router.get("/",  async (req, res) => {
    try {
        const usersShoppingCart = await Shopping_cart_items.getShoppingCartItemsByUserId(req.user.id);
        res.status(200).json(usersShoppingCart);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//Getting total amount of every product in cart (getting total price of Shopping cart) 
//we are passing req.params.userId as parameter to getTotalPriceAmount function
//tested:working
router.get("/sub-total", async(req,res)=>{
    try {
        const totalAmount = await Shopping_cart_items.getTotalPriceAmount(req.user.id);
        res.status(200).json(totalAmount);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//Getting total number of products in ShoppingCart
//tested:working
router.get("/total-items", async(req,res)=>{
    try {
        const totalItems = await Shopping_cart_items.getNumberOfProductsInCart(req.user.id);
        res.status(200).json(totalItems);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//IDEA: Logged user can remove product he added from shopping cart we are getting userId from url and 
//productId from req.body those two are being passed as parameters to the removeProductFromShoppingCart function
//tested:working
router.post("/remove-product", async(req,res)=>{
    const productToBeRemoved = req.body.productId;
    try {
        await Shopping_cart_items.removeProductFromShoppingCart(req.user.id,productToBeRemoved);
        res.status(200).json({msg:"Product removed from Shopping Cart"});
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};
        
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
        
            return res.status(406).send({
                error: true,
                message: 'Validation error',
                status: 406,
                err_msg: errors

            });
        }
        res.status( error.status || 403).json(error);
    }
});

//User can clear shopping cart by clearing it he is actually deleting it
//tested:working
router.post("/clear-cart", async(req,res)=>{
    try {
        await Shopping_cart_items.clearShoppingCart(req.user.id);
        res.status(200).json({msg:"Shopping cart cleared. It is empty now."});
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};
        
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
        
            return res.status(406).send({
                error: true,
                message: 'Validation error',
                status: 406,
                err_msg: errors

            });
        }
        res.status( error.status || 403).json(error);
    }
});

module.exports = router;