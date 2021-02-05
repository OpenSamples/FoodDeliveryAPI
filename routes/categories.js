const router = require("express").Router();
const Categories = require("../models/Categories");
/*
Categories
- GetCategories - GET: api/Categories
*/

router.post("/",async(req,res)=>{
    try {
        await Categories.create({
            name:req.body.name,
            imageUrl:req.body.imageUrl
        });
    } catch (error) {
        res.send("Error in creating categories: "+error);
    }
});

router.get("/",async(req,res)=>{
    try {
        const allCategories = await Categories.find().sort({ createdAt: -1 });
        res.json(allCategories);
    } catch (error) {
        res.send("Error in getting categories: "+error);
    }
});

module.exports = router;