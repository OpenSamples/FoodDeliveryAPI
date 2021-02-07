const router = require("express").Router();
const Categories = require("../controllers/CategoriesController");


router.post("/",async(req,res)=>{
    const categoriesBody = req.body;
    try {
       await Categories.add(categoriesBody);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/",async(req,res)=>{
    try {
        const allCategories = await Categories.findAll();
        res.json(allCategories);
    } catch (error) {
        res.send("Error in getting categories: "+error);
    }
});

module.exports = router;