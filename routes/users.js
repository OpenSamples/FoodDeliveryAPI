const router = require("express").Router();
const Users = require("../controllers/UsersController");

/*
Users
AddNewUser - POST : api/Users
GetAllUsers - GET : api/Users
GetFavoriteFoodByUser - GET : api/Users/FavoriteFood/4 (User ID);
*/

router.post("/",async(req,res)=>{
    const userData = req.body;
    try {
        const newUser = await Users.addUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/",async(req,res)=>{
    try {
      const allUsers = await Users.getAllUsers();
      res.json(allUsers);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.get("/favorite-food/:userId",async(req,res)=>{
    try {
      const favoriteFoodByUser = await Users.getFavoriteFoodByUser(req.params.userId);
      res.json(favoriteFoodByUser);
    } catch (error) {
        res.status(403).json(error);
    }
});

router.post("/add-favorite-food/:productId",async(req,res)=>{
    const userId = req.body.userId;
    try {
        await Users.addFavoriteFood(userId,req.params.productId);
        res.status(201).json({msg:"Added new favorite food"});
    } catch (error) {
        res.status(403).json(error);
    }
});

router.post("/remove-favorite-food/:productId",async(req,res)=>{
    const userId = req.body.userId;
    try {
        await Users.removeFavoriteFood(userId,req.params.productId);
        res.status(201).json({msg:"Removed favorite food"});
    } catch (error) {
        res.status(403).json(error);
    }
});


module.exports = router;