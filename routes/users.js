const router = require("express").Router();
const Users = require("../controllers/UsersController");

/*
Users
AddNewUser - POST : api/Users
GetAllUsers - GET : api/Users
GetUserById - GET : api/Users/4 (User Id)
GetFavoriteFoodByUser - GET : api/Users/FavoriteFood/4 (User ID);
AddFavoriteFood - POST : api/Users/AddFavoriteFood/5 (Product ID);
RemoveFavoriteFood - POST : api/Users/RemoveFavoriteFood/5 (product ID)
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

router.get("/:userId",async(req,res)=>{
    try {
        const userById = await Users.getUserById(req.params.userId);
        res.json(userById);
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