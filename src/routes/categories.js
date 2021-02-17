const router = require("express").Router();
//Categories controller
const Categories = require("../controllers/CategoriesController");
const {isAuth, isAdmin} = require("../services/authMiddleware");

/*
Routes for categories

Categories
- GetCategories - GET: api/Categories
- CreateCategories - POST: api/Categories
*/

//Create new category fetching req.body and passing it as parameter to createCategories function
//tested:working
router.post("/", isAuth, async (req,res)=>{
    const categoriesData = req.body;
    try {
        const newCategory = await Categories.createCategories(categoriesData);
        res.status(201).json(newCategory);
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
        res.status(error.status || 403).json(error);
    }
});


//Get all categories
//tested:working
router.get("/", async (req,res)=>{
    try {
        const allCategories = await Categories.getAllCategories();
        res.status(201).json(allCategories);
    } catch (error) {
        res.status(error.status || 403).json(error);
    }
});

module.exports = router;