const router = require("express").Router();
const Users = require("../controllers/UsersController");
const passport = require("passport");
const { isAuth } = require("./authMiddleware");
const { isGoogle } = require("./authMiddleware");

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
router.post("/", async (req, res) => {
    const userData = req.body;
    try {
        await Users.addUser(userData);
        req.flash("success_messages", "Successfully registered! you can now login!");
        res.redirect("/api/users/login/?register=true");
        //res.status(201).json(newUser);
    } catch (error) {
        res.status(403).json(error);
    }
});

//User/Admin can login we use passports middleware function called authenticate in which we choose local(local strategy passport+email)
//if everythig went well in passport(config/passport.js) we will activate successRedirect if not we will redirect to failureRedirect
router.post("/login",
    passport.authenticate('local', {
        successRedirect: '/api/dashboardTest',
        failureRedirect: '/api/users/login/?fail=true',
        failureFlash: true,
        successFlash: true
    })
);

//When user decides to login with google account instead of registering he can do that through this route
//this route will authenticate user's data provided with googleStrategy(passport) in scope we declare what we want to fetch
//profile->(first name,last name,photo) email->email we use prompt: 'select_account' to disable autologin (if we some users have multiple accounts
//on one pc)
router.get("/google",isGoogle,passport.authenticate('google',{scope:['profile','email'],prompt: 'select_account'}));

//In GoogleStrategy provided by passport we declared that a certain callback function with url will be called when user logs in
//this is that route we authenticate that user if everything went well we redirect him to one route if not to other
router.get("/google/redirect",passport.authenticate('google',{
    failureRedirect:'/api/users/login/?fail=true',
    successRedirect:'/api/dashboardTest',
}));

//User/Admin can logout after passport populates req with his middlweare we can use req.logout() which is used
//to destroy session and to logout user after that user is being redirected to login page with query message ?logout=true
//This could be done also with flash messages (flash-connect) on front-end side
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/api/users/login/?logout=true');
});

//This will be some route for login page* idea is to check if req.user exists if yes that means that user is logged there is
//a session if not no one is logged in and we render/show different page/data
router.get("/login", async (req, res) => {
    try {
        if (req.user) {
            res.redirect("/api/dashboardTest");
        } else {
            if (req.query.logout === "true") {
                res.json({ page: "You are on Login Page", msg: "You just logged out!" });
            } else if (req.query.fail === "true") {
                res.json({ page: "You are on Login Page", msg: "Fail to login wrong email or password!" });
            } else if (req.query.register === "true") {
                res.json({ page: "You are on Login Page", msg: "Successful register!" });
            } else {
                res.json({ page: "You are on Login Page" });
            }
        }
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
router.get("/", async (req, res) => {
    try {
        const allUsers = await Users.getAllUsers();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});

//Getting user by id
//tested:working
router.get("/:userId", async (req, res) => {
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
router.get("/favorite-food/:userId", async (req, res) => {
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
router.post("/add-favorite-food/:productId",isAuth,async (req, res) => {
    const userId = req.user.id;
    try {
        await Users.addFavoriteFood(userId, req.params.productId);
        res.status(201).json({ msg: "Added new favorite food" });
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
router.post("/remove-favorite-food/:productId",isAuth,async (req, res) => {
    const userId = req.user.id;
    try {
        await Users.removeFavoriteFood(userId, req.params.productId);
        res.status(201).json({ msg: "Removed favorite food" });
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