const router = require("express").Router();
const Products = require("../controllers/ProductsController");

/*
Products
- CreateProduct - POST: api/Products
- GetAllProducts - GET: api/Products
- GetProductById - GET: api/Products/1
- GetProductByCategory - GET: api/Products/ProductsByCategory/1(Category ID)
- GetPopularProduct - GET: api/Products/PopularProducts

- AddReview - POST : api/Products/Review
- GetAllReviewsByProduct - GET : api/Products/Reviews/5(Product ID)
- GetAverageRatingByProduct - GET : api/Products/AverageRating/5 (Product ID)
*/

router.post("/", async (req, res) => {
    const productData = req.body;
    try {
        const newProduct = await Products.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const allProducts = await Products.getAllProducts();
        res.json(allProducts);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/:productId", async (req, res) => {
    try {
        const productById = await Products.getProductById(req.params.productId);
        res.json(productById);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/products-by-category/:categoryId", async (req, res) => {
    try {
        const productsByCategory = await Products.getProductsByCategory(req.params.categoryId);
        res.json(productsByCategory);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/show/popular-products", async (req, res) => {
    try {
        const popularProducts = await Products.getPopularProducts();
        res.json(popularProducts);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.post("/add-review/:productId",async(req,res)=>{
    const review = req.body;
    try {
        await Products.addReview(review,req.params.productId);
        res.status(201).json({msg:"Review added successfully!"});
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/reviews/:productId",async(req,res)=>{
    try {
        const productReviews = await Products.getAllReviewsOfProduct(req.params.productId);
        res.json(productReviews);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/average-rating/:productId",async(req,res)=>{
    try {
        const productReviews = await Products.getAverageRatingOfProduct(req.params.productId);
        res.json(productReviews);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/comments/:productId",async(req,res)=>{
    try {
        const productComments = await Products.getAllCommentsOfProduct(req.params.productId);
        res.json(productComments);
    } catch (error) {
        res.status(403).json(error);
    }
});


module.exports = router;