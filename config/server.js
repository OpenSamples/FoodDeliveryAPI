const express = require("express");
const bodyParser = require("body-parser");

const app = express();


// We include all routes
const {
    accounts,
    categories,
    orders,
    products,
    shopping_cart_items,
    users
} = require('../src/routes')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//All routes
app.use("/api/users", users);
app.use("/api/accounts", accounts);
app.use("/api/categories", categories);
app.use("/api/products", products);
app.use("/api/shopping-cart-items", shopping_cart_items);
app.use("/api/orders", orders);


module.exports = app