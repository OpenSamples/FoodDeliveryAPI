const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require('path')
const app = express();
const passport = require("passport");
const flash = require("connect-flash");
require("../config/passport")(passport);
const cors = require('cors');

// We include all routes
const {
    accounts,
    categories,
    orders,
    products,
    shopping_cart_items,
    users,
    dashboardTest
} = require('../src/routes')


app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//All routes
app.use("/api/users", users);
app.use("/api/accounts", accounts);
app.use("/api/categories", categories);
app.use("/api/products", products);
app.use("/api/shopping-cart-items", shopping_cart_items);
app.use("/api/orders", orders);
app.use("/api/dashboardTest",dashboardTest);


module.exports = app
