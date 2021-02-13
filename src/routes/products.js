const router = require("express").Router();
//Products controller
const Products = require("../controllers/ProductsController");

/*
Products routes

- CreateProduct - POST: api/Products
- GetAllProducts - GET: api/Products
- GetProductById - GET: api/Products/1
- GetProductByCategory - GET: api/Products/ProductsByCategory/1(Category ID)
- GetPopularProduct - GET: api/Products/Show/PopularProducts
- AddReview - POST : api/Products/Review
- GetAllReviewsByProduct - GET : api/Products/Reviews/5(Product ID)
- GetAverageRatingByProduct - GET : api/Products/AverageRating/5 (Product ID)
- GetAllProductsComments - GET : api/Products/Comments/5 (Product ID);
- RemoveReview - POST : api/Products/remove-review/:5 (Product ID);
*/

//Adding new product getting data from form in req.body and passing it as parameter to createProduct function
//tested:working
router.post("/", async (req, res) => {
    const productData = req.body;
    try {
        const newProduct = await Products.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status( error?.status || 403).json(error);
    }
});

//Getting all products
//tested:working 
router.get("/", async (req, res) => {
    try {
        const allProducts = await Products.getAllProducts();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status( error?.status || 403).json(error);
    }
});

//Getting certain product by id 
//id is being passed through url and we are fetching it with req.params.productId 
//then we are passing it to getProductById function as parameter
//tested:working
router.get("/:productId", async (req, res) => {
    try {
        const productById = await Products.getProductById(req.params.productId);
        res.statis(200).json(productById);
    } catch (error) {
        res.status( error?.status || 403).json(error);
    }
});

//Getting all products that belong to cerain category which we passed to url as an id :categoryId
//that id is being passed to getProductsByCategory fucntion as parameter
//tested:working
router.get("/products-by-category/:categoryId", async (req, res) => {
    try {
        const productsByCategory = await Products.getProductsByCategory(req.params.categoryId);
        res.status(200).json(productsByCategory);
    } catch (error) {
        res.status( error?.status || 403).json(error);
    }
});

//Getting all those products that are popular 
//tested:working
router.get("/show/popular-products", async (req, res) => {
    try {
        const popularProducts = await Products.getPopularProducts();
        res.status(200).json(popularProducts);
    } catch (error) {
        res.status( error?.status || 403).json(error);
    }
});

//Idea:Logged user can add review to some product in this case we are getting product with id passed in url
//and review data with form (req.body) which will contain userId,rating(number),comment(String)
//We are passing two parameters to addReview function first one is review(req.body from form) second one is
//productId from url(req.params.productId) this can be changed later
//tested:working
router.post("/add-review/:productId",async(req,res)=>{
    const review = req.body;
    try {
        await Products.addReview(review,req.params.productId);
        res.status(201).json({msg:"Review added successfully!"});
    } catch (error) {
        res.status( error?.status || 403).json(error);
    }
});

//Getting all reviews from certain product. We are getting that product by passing its id in url
//and fetching it with req.params which we'll pass as parameter to the getAllReviewsOfProduct function
//tested:working
router.get("/reviews/:productId",async(req,res)=>{
    try {
        const productReviews = await Products.getAllReviewsOfProduct(req.params.productId);
        res.status(200).json(productReviews);
    } catch (error) {
        res.status( error?.status || 403).json(error);
    }
});

//Getting average rating for some product that we are getting through url as we pass its id (:productId)
//then we are calling getAverageRatingOfProduct function with productId as parameter
//tested:working
router.get("/average-rating/:productId",async(req,res)=>{
    try {
        const productReviews = await Products.getAverageRatingOfProduct(req.params.productId);
        res.status(200).json(productReviews);
    } catch (error) {
        res.status( error?.status || 403).json(error);
    }
});

//Getting all comments from certain product 
//tested:working
router.get("/comments/:productId",async(req,res)=>{
    try {
        const productComments = await Products.getAllCommentsOfProduct(req.params.productId);
        res.status(200).json(productComments);
    } catch (error) {
        res.status( error?.status || 403).json(error);
    }
});

//Idea:Logged user can remove his review from some cerain product where he previously left his review
//we are getting product by fetching its id form ulr(req.params.productId) and getting user from req.body.userId
//this can be changed later because probably we will have global variable req.user which will contain all data from logged user
//we are passing those two variables as parametes in removeReview function
//tested:working
router.post("/remove-review/:productId",async(req,res)=>{
    const userId = req.body.userId;
    try {
        await Products.removeReview(userId,req.params.productId);
        res.status(200).json({msg:"Review removed."});
    } catch (error) {
        res.status( error?.status || 403).json(error);
    }
});

module.exports = router;