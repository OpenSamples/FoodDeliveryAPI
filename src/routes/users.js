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

//JUST FOR TESTING...this can be later implemented as Users.registerNewUser
//we are passing data through form and fetching it here with req.body as userData
//then we pass userData as parameter to the addUser function 
//tested:working
router.post("/",async(req,res)=>{
    const userData = req.body;
    try {
        const newUser = await Users.addUser(userData);
        res.status(201).json(newUser);
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
        res.status( error.status || 403).json(error);
    }
});

//Getting all users
//tested:working
router.get("/",async(req,res)=>{
    try {
        const allUsers = await Users.getAllUsers();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//Getting user by id
//tested:working
router.get("/:userId",async(req,res)=>{
    try {
        const userById = await Users.getUserById(req.params.userId);
        res.status(200).json(userById);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
}); 

//Getting favorite food by certain user which we'll find by passing his id inisde url(req.params.userId) and passing that
//id as parameter to the getFavoriteFoodByUser
//tested:working
router.get("/favorite-food/:userId",async(req,res)=>{
    try {
        const favoriteFoodByUser = await Users.getFavoriteFoodByUser(req.params.userId);
        res.status(200).json(favoriteFoodByUser);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//IDEA: Logged user can add favorite food. We are getting product(favorite food) which user decided to add 
//by getting productId from url and we are getting users id with req.body.userId (this can later be changed as we are going to have
//something like req.user or logged user data). We pass those two as parameters to addFavoriteFood function 
//tested:working
router.post("/add-favorite-food/:productId",async(req,res)=>{
    const userId = req.body.userId;
    try {
        await Users.addFavoriteFood(userId,req.params.productId);
        res.status(201).json({msg:"Added new favorite food"});
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
        res.status( error.status || 403).json(error);
    }
});

//IDEA: Logged user can remove some product from his favorite food we are doing the same as above just now 
//we remove that product from favoriteFood array
//tested:working
router.post("/remove-favorite-food/:productId",async(req,res)=>{
    const userId = req.body.userId;
    try {
        await Users.removeFavoriteFood(userId,req.params.productId);
        res.status(201).json({msg:"Removed favorite food"});
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
        res.status( error.status || 403).json(error);
    }
});


module.exports = router;