const router = require("express").Router();

/*
Products
- GetProductById - GET: api/Products/1
- GetProductByCategory - GET: api/Products/ProductsByCategory/1
- GetPopularProduct - GET: api/Products/PopularProducts
*/

router.get("/:productId",async(req,res)=>{
    try {
        
    } catch (error) {
        res.send("Error in getting product: "+error);
    }
});

router.get("/products-by-category/:productId",async(req,res)=>{
    try {
        
    } catch (error) {
        res.send("Error in getting products by category: "+error);
    }
});

router.get("/popular-products",async(req,res)=>{
    try {
        
    } catch (error) {
        res.send("Error in getting popular products: "+error);
    }
});

module.exports = router;