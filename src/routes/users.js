const router = require("express").Router();
const Users = require("../controllers/UsersController");
const passport = require("passport");
const { isAuth } = require("../services/authMiddleware");
const { isGoogle } = require("../services/authMiddleware");
const { isAdmin } = require("../services/authMiddleware");
const multer = require('multer');
const jwt = require('jsonwebtoken');
const { verifyEmail, send2FA } = require('../services/emailService');

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/users')
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname)
    }
})

// multer options
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 3145728
    },
    fileFilter(req, file, cb) {
        if (file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Please upload user image.'))
        }
        cb (undefined, true)
    }
})

const generateAuthToken = async (id) => {
    try {
        let user = await Users.getUserById(id)
        if(!user) {
            throw {error: true, message: 'User does not exists!', status: 404}
        }
    
        let token = jwt.sign({
            ...user._doc,
            token: ''
        }, process.env.USER_TOKEN_SECRET, { expiresIn: '12h' })

        let tokenInDb = await Users.updateToken(id, token)

        if(!tokenInDb._id) {
            throw {error: true, user: tokenInDb, message: 'Something went wrong while generating token!', status: 500}
        }

        return token
    } catch (e) {
        return e
    }
}


/*
Users
UploadUserImage - POST : api/Users/upload
AddNewUser - POST : api/Users
GetAllUsers - GET : api/Users
GetUserById - GET : api/Users/4 (User Id)
GetFavoriteFoodByUser - GET : api/Users/FavoriteFood/4 (User ID);
AddFavoriteFood - POST : api/Users/AddFavoriteFood/5 (Product ID);
RemoveFavoriteFood - POST : api/Users/RemoveFavoriteFood/5 (product ID)
*/


// User image upload route
router.post('/upload', upload.single('upload'), async (req, res) => {
    try {
        const upload = req.file;
        res.send({
            status: true,
            message: 'User image uploaded.',
            data: {
                name: upload.originalname,
                mimetype: upload.mimetype,
                size: upload.size
            }
        })
    } catch (err) {
        res.status(500).send(err)
    }
})


//JUST FOR TESTING...this can be later implemented as Users.registerNewUser
//we are passing data through form and fetching it here with req.body as userData
//then we pass userData as parameter to the addUser function 
//tested:working
router.post("/", async (req, res) => {
    const userData = req.body;

    try {
        const newUser = await Users.addUser(userData);

        let token = jwt.sign({
            id: newUser._id,
            name: newUser.firstName
        }, process.env.VERIFICATION_SECRET, { expiresIn: "2h" })
        let verificationLink = `${process.env.WEBSITE_LINK || 'http://localhost:3000'}/api/users/verifyEmail/${token}`

        verifyEmail(newUser.email, verificationLink, newUser.firstName)

        // Generate token

        const authToken = await generateAuthToken(newUser._id)
        if(authToken.error) {
            throw authToken
        }


        // req.flash("success_messages", "Successfully registered! you can now login!");
        // res.redirect("/api/users/login/?register=true");
        res.status(201).json({
            message: 'Successfully!',
            user: {
                ...newUser._doc,
                token: authToken
            }
        });
    } catch (error) {
        res.status(403).json(error);
    }
});


router.get('/verifyEmail/:token', async (req, res) => {
    let token = req.params.token

    try {
        let user = jwt.verify(token, process.env.VERIFICATION_SECRET)

        await Users.verifyEmail(user.id)

        res.status(200).json({message: `Congratulations ${user.name}, successfully verified email`})
    } catch(e) {
        if(e.message === 'Something went wrong while verifying email...' || e.message === 'User does not exist!') {
            return res.status(e.status || 404).json(e)
        }
        return res.status(401).json({
            error: true,
            status: 401,
            message: 'Invalid token!'
        })
    }
})

//User/Admin can login we use passports middleware function called authenticate in which we choose local(local strategy passport+email)
//if everythig went well in passport(config/passport.js) we will activate successRedirect if not we will redirect to failureRedirect
router.post("/login", async (req, res, next) => {
    // passport.authenticate('local', {
    //     successRedirect: '/api/dashboardTest',
    //     failureRedirect: '/api/users/login/?fail=true',
    //     failureFlash: true,
    //     successFlash: true
    // })

    passport.authenticate('local', async (err, user, info) => {
        if (err) { 
            return next(err); 
        }
        if (!user) { 
            return res.redirect(`/api/users/login/?fail=true&message=${info.message}`); 
        }

        if(info.message === "Successful login.") {
            // Generate token
            const authToken = await generateAuthToken(user._id)
            if(authToken.error) {
                throw authToken
            }

            req.logIn(user, function(err) {
                if (err) { 
                    return next(err); 
                }
                res.status(200).json({message: 'Successfully logged in!', user: {
                    ...user._doc,
                    token: authToken
                }})
                // return res.redirect('/api/dashboardTest');
            });
        } else if(info.message === '2FA') {
            try {
                // Perform 2FA
    
                // Generate 6 digit code
                let code = Math.floor(100000 + Math.random() * 900000)

                // Send code to email
                send2FA(user.email, code, user.firstName)
    
                // Insert code in database
                await Users.updateCode(user._id, code)

                let user_for_verifying = {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    favoriteFood: user.favoriteFood,
                    addresses: user.addresses,
                    role: user.role,
                    googleId: user.googleId,
                    password: user.password,
                    email_is_verified: user.email_is_verified,
                    two_fa: user.two_fa,
                    logoUrl: user.logoUrl,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }

                let token = jwt.sign(user_for_verifying, process.env.TWO_FACTOR_SECRET, { expiresIn: '600000ms' })

                return res.json({
                    message: "User uses 2 factor authentication. In order to login please visit '/api/users/verify_2fa/${token}?code=${code}', please provide us a code user received via email!",
                    token,
                    example_link: '/api/users/verify_2fa/${token_here}?code=${code_here}',
                    two_fa: true
                })
            } catch(e) {
                console.log(e)
            }
        }
    })(req, res, next)
});

router.post('/verify_2fa/:token', async (req, res) => {
    let token = req.params.token
    let code = req.query.code

    if(!code && code !== 000000) {
        return res.status(200).json({
            error: true,
            message: 'Invalid code',
            status: 401
        })
    }

    try {
        let user = jwt.verify(token, process.env.TWO_FACTOR_SECRET)

        let actual_code = await Users.getCode(user.id)

        if(actual_code !== +code) {
            return res.status(200).json({
                error: true,
                message: 'Authentication error',
                status: 401
            })
        }

        // Generate token
        const authToken = await generateAuthToken(user.id)

        if(authToken.error) {
            throw authToken
        }


        req.logIn(user, function(err) {
            if (err) { 
                return next(err); 
            }
            return res.status(200).json({
                message: 'Successfully!',
                user: {
                    ...user,
                    _id: user.id,
                    token: authToken
                }
            });
        });
    } catch(e) {
        console.log(e)
    }
})

//When user decides to login with google account instead of registering he can do that through this route
//this route will authenticate user's data provided with googleStrategy(passport) in scope we declare what we want to fetch
//profile->(first name,last name,photo) email->email we use prompt: 'select_account' to disable autologin (if we some users have multiple accounts
//on one pc)
router.get("/google", isGoogle, passport.authenticate('google',{scope:['profile','email'],prompt: 'select_account'}));

//In GoogleStrategy provided by passport we declared that a certain callback function with url will be called when user logs in
//this is that route we authenticate that user if everything went well we redirect him to one route if not to other
router.get("/google/redirect", async (req, res, next) => {


    // passport.authenticate('google',{
    //     failureRedirect:'/api/users/login/?fail=true',
    //     successRedirect:'/api/dashboardTest',
    // })


    passport.authenticate('google', async (err, user, info) => {
        if (err) { 
            return next(err); 
        }
        if (!user) { 
            return res.json({
                error: true,
                message: 'Something went wrong...',
                status: 401
            }); 
        }


        try {
            // Generate token
            const authToken = await generateAuthToken(user._id)
            if(authToken.error) {
                throw authToken
            }

            req.logIn(user, function(err) {
                if (err) { 
                    return next(err); 
                }
                
                return res.json({
                    message: 'Successfully',
                    user: {
                        ...user._doc,
                        token: authToken
                    }
                });
            });
        } catch(e) {
            return res.json(e)
        }
    })(req, res, next)

});

//User/Admin can logout after passport populates req with his middlweare we can use req.logout() which is used
//to destroy session and to logout user after that user is being redirected to login page with query message ?logout=true
//This could be done also with flash messages (flash-connect) on front-end side
router.get('/logout', async (req, res) => {
    await Users.clearToken(req.user.id)
    req.logout();

    // res.redirect('/api/users/login/?logout=true');
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
        res.status( error.status || 403).json(error);
    }
});

//Logged User Can Update His Profile Info
router.post("/update",isAuth,async(req,res)=>{
    const newUserData = req.body;
    try {
        const userToBeUpdated = await Users.updateUser(req.user.id,newUserData);
        res.status(200).json(userToBeUpdated);
    } catch (error) {
        res.status( error.status || 403).json(error);
    }
});


//Getting all users
//tested:working
router.get("/",isAuth,isAdmin,async (req, res) => {
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
router.post("/add-favorite-food/:productId", isAuth, async (req, res) => {
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
router.post("/remove-favorite-food/:productId", isAuth, async (req, res) => {
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

router.delete('/:id', async (req, res) => {
    try {
        let deletedUser = await Users.deleteById(req.params.id)

        res.status(200).json(deletedUser)
    } catch(e) {
        res.status(401).json(e)
    }
})

module.exports = router;
