const router = require("express").Router();

/*
Categories
- GetCategories - GET: api/Categories
*/

router.get("/",async(req,res)=>{
    try {
        
    } catch (error) {
        res.send("Error in getting categories: "+error);
    }
});

module.exports = router;