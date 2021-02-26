const Users = require('../controllers/UsersController')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    isAuth: async (req, res, next) => {
        const bearerHeader = req.headers["authorization"]

        if(typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(' ')
            const bearerToken = bearer[1]
            if(!bearerToken) {
                return res.status(401).json({error: true, status: 401, message: 'Authorization error'})
            }
            
            try {
                const userData = jwt.verify(bearerToken, process.env.USER_TOKEN_SECRET)

                // Validate token
                const user_db = await Users.getUserById(userData._id)

                if(user_db.token === bearerToken) {
                    req.user = user_db
                    next()
                } else {
                    return res.status(401).json({
                        error: true,
                        status: 401,
                        message: 'Authorization error'
                    })
                }

            } catch (e) {
                return res.status(403).json({
                    error: true,
                    message: 'Token is not valid!',
                    error_msg: e
                })
            }
                    
        } else {
            return res.status(403).json({
                error: true,
                message: "Please log-in!"
            })
        }


        // if (req.isAuthenticated()) {
        //     return next();
        // }
        // req.flash("error_messages", "Please login to view this resource");
        // res.status(401).json({
        //     error: true,
        //     status: 401,
        //     message: 'Not authenticated!',
        //     flash: req.flash("error_messages")
        // });
    },
    isAdmin: async (req, res, next) => {
        
        const bearerHeader = req.headers["authorization"]

        if(typeof bearerHeader !== "undefined") {
            const bearer = bearerHeader.split(' ')
            const bearerToken = bearer[1]
            if(!bearerToken) {
                return res.status(401).json({error: true, status: 401, message: 'Authorization error'})
            }
            
            try {
                const userData = jwt.verify(bearerToken, process.env.USER_TOKEN_SECRET)

                // Validate token
                const user_db = await Users.getUserById(userData._id)

                if(user_db.token === bearerToken && user_db.role === 1) {
                    next()
                } else {
                    return res.status(401).json({
                        error: true,
                        status: 401,
                        message: 'Authorization error'
                    })
                }

            } catch (e) {

                return res.status(403).json({
                    error: true,
                    message: 'Token is not valid!',
                    error_msg: e
                })
            }
                    
        } else {
            return res.status(403).json({
                error: true,
                message: "Please log-in!"
            })
        }
        
        
        
        
        // if (req.isAuthenticated() && req.user.role === 1) {
        //     return next();
        // }
        // req.flash("error_messages", "Not authorized to view this resource only for admins!");
        // res.status(401).json({
        //     error: true,
        //     status: 401,
        //     message: 'Not authenticated!',
        //     flash: req.flash("error_messages")
        // });
    },
    isGoogle: (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect("/api/dashboardTest");
        }
        return next();
    }
}