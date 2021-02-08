const router = require("express").Router();
const Categories = require("../controllers/CategoriesController");

/*
Categories
- GetCategories - GET: api/Categories
-CreateCategories - POST: api/Categories
*/

router.post("/",async(req,res)=>{
    const categoriesData = req.body;
    try {
        const newCategory = await Categories.createCategories(categoriesData);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/",async(req,res)=>{
    try {
        const allCategories = await Categories.getAllCategories();
        res.status(201).json(allCategories);
    } catch (error) {
        res.status(403).json(error);
    }
});

module.exports = router;