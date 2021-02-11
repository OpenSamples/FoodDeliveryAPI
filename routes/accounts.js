const router = require("express").Router();

/*
Accounts
- Register - POST: api/Accounts/Register
- Login - POST: api/Accounts/Login
*/

router.post("/login", async (req, res) => {
    try {
        
    } catch (error) {
        res.send("Error in login: " + error);
    }
});

router.post("/register", async (req, res) => {
    try {

    } catch (error) {
        res.send("Error in register: " + error);
    }
});


module.exports = router;