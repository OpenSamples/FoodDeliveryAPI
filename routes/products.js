const router = require("express").Router();
const Products = require("../controllers/ProductsController");

router.post("/", async (req, res) => {
    const productsBody = req.body;
    try {
        await Products.add(productsBody);
    } catch (error) {
        res.send("Error in creating product: " + error);
    }
});

router.get("/", async (req, res) => {
    try {
        const allProducts = await Products.findAll();
        res.json(allProducts);
    } catch (error) {
        res.send("Error in getting all products: " + error);
    }
});

router.get("/show/:productId", async (req, res) => {
    try {
        const oneProduct = await Products.findOneById(req.params.productId);
        res.json(oneProduct);
    } catch (error) {
        res.send("Error in getting product: " + error);
    }
});

router.get("/products-by-category/:categoryId", async (req, res) => {
    try {
        const productsByCategory = await Products.findAllByCategory(req.params.categoryId);
        res.json(productsByCategory);
    } catch (error) {
        res.send("Error in getting products by category: " + error);
    }
});

router.get("/popular-products", async (req, res) => {
    try {
        const popularProducts = await Products.findPopular();
        res.json(popularProducts);
    } catch (error) {
        res.send("Error in getting popular products: " + error);
    }
});

module.exports = router;