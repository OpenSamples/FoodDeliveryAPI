const router = require("express").Router();
const Products = require("../models/Products");
const Categories = require("../models/Categories");

/*
Products
- PostOneProduct - POST : api/Products
- GetAllProducts - GET : api/Products
- GetProductById - GET: api/Products/Show/1
- GetProductByCategory - GET: api/Products/ProductsByCategory/1
- GetPopularProduct - GET: api/Products/PopularProducts
*/

router.post("/", async (req, res) => {
    try {
        await Products.create({
            name: req.body.name,
            detail: req.body.detail,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            isPopularProduct: req.body.isPopularProduct,
            categoryId: req.body.categoryId,
        });
    } catch (error) {
        res.send("Error in creating product: " + error);
    }
});

router.get("/", async (req, res) => {
    try {
        const allProducts = await Products.find().sort({ createdAt: -1 });
        res.json(allProducts);
    } catch (error) {
        res.send("Error in getting all products: " + error);
    }
});

router.get("/show/:productId", async (req, res) => {
    try {
        const oneProduct = await Products.findOne({_id:req.params.productId});
        res.json(oneProduct);
    } catch (error) {
        res.send("Error in getting product: " + error);
    }
});

router.get("/products-by-category/:categoryId", async (req, res) => {
    try {
        const productsByCategory = await Products.find({categoryId:req.params.categoryId});
        res.json(productsByCategory);
    } catch (error) {
        res.send("Error in getting products by category: " + error);
    }
});

router.get("/popular-products", async (req, res) => {
    try {
        const popularProducts = await Products.find({isPopularProduct:true});
        res.json(popularProducts);
    } catch (error) {
        res.send("Error in getting popular products: " + error);
    }
});

module.exports = router;