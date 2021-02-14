const router = require("express").Router();
const {isAuth} = require("./authMiddleware");
const {isAdmin} = require("./authMiddleware");

router.get("/",isAuth,async(req,res)=>{
    try {
        res.json({msg:"Welcome to secure page!",success:req.flash("success")});
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/admin",isAuth,isAdmin,async(req,res)=>{
    try {
        res.json({msg:"Welcome to Admin Page!"});
    } catch (error) {
        res.status(403).json(error);
    }
});

module.exports = router;