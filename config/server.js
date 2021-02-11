const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//All routes
app.use("/api/users", require("../routes/users"));
app.use("/api/accounts", require("../routes/accounts"));
app.use("/api/categories", require("../routes/categories"));
app.use("/api/products", require("../routes/products"));
app.use("/api/shopping-cart-items", require("../routes/shopping-cart-items"));
app.use("/api/orders", require("../routes/orders"));


module.exports = app