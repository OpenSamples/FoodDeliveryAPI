const router = require("express").Router();
//Categories controller
const Categories = require("../controllers/CategoriesController");

/*
Routes for categories

Categories
- GetCategories - GET: api/Categories
- CreateCategories - POST: api/Categories
*/

//Create new category fetching req.body and passing it as parameter to createCategories function
//tested:working
router.post("/",async(req,res)=>{
    const categoriesData = req.body;
    try {
        const newCategory = await Categories.createCategories(categoriesData);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(error.status || 403).json(error);
    }
});


//Get all categories
//tested:working
router.get("/",async(req,res)=>{
    try {
        const allCategories = await Categories.getAllCategories();
        res.status(201).json(allCategories);
    } catch (error) {
        res.status(error.status || 403).json(error);
    }
});

module.exports = router;