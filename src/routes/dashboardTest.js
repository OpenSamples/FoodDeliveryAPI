const router = require("express").Router();
//isAuth middleware for checking if user is authentiated to visit certain page
const {isAuth} = require("../services/authMiddleware");
//isAdmin middleware for checking if user is admin 
const {isAdmin} = require("../services/authMiddleware");

router.use(isAuth);

//dashboardTest is just for testing authentication between user/admin relations
//We put isAuth middlwere between route and (req,res) if it passes it will print out a message 
//welcome to secure page if not it will print other fail message(see authMiddleware)
router.get("/", async (req,res)=>{
    try {
        res.json({page:`Welcome to secure page for users! ${req.user.firstName}`});
    } catch (error) {
        res.status(403).json(error);
    }
});

//Testing some kind of admin panel we put two middlewares inbetween route and (req,res) fist one will
//make sure that user is authenticated(logged in) second one will make sure that certain user has role equal to 1
//that means user is admin and he can visit page if user is basic user he will be redirected to some other page 
router.get("/admin", isAdmin, async (req,res)=>{
    try {
        res.json({msg:"Welcome to Admin Page!"});
    } catch (error) {
        res.status(403).json(error);
    }
});

module.exports = router;