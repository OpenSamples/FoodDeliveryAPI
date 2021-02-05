require("dotenv").config(); 
const express = require("express");
const app = express();
const mongoose = require("mongoose"); 
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const connection = process.env.MONGODB_URI || "mongodb://localhost:27017/DostavaHraneApi";
const port = process.env.PORT || 3000;

app.use("/api/users", require("./routes/users"));
app.use("/api/accounts", require("./routes/accounts"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/products", require("./routes/products"));
app.use("/api/shopping-cart-items", require("./routes/shopping-cart-items"));
app.use("/api/orders", require("./routes/orders"));

const connect = () => {
    return mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
}

connect()
    .then(async connection => {
        console.log("Successfully connected to database");
        app.listen(port, () => { console.log("Server is running properly on port " + port + "."); })
    }).catch(err => {
        console.log("Error Ocurred in connecting to database: " + err);
    });

