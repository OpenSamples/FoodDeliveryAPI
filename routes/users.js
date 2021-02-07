const router = require("express").Router();
const Users = require("../controllers/UsersController");

router.post("/",async(req,res)=>{
    const usersData = req.body;
    try {
        const user = await Users.add(usersData);
        res.json(user);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/",async(req,res)=>{
    try {
        const allUsers = await Users.findAll();
        res.json(allUsers);
    } catch (error) {
        res.send("Error in getting all users: "+error);
    }
});


module.exports = router;