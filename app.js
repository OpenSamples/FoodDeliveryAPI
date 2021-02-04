require("dotenv").config(); 
const express = require("express");
const app = express();
const mongoose = require("mongoose"); 

const connection = process.env.MONGODB_URI || "mongodb://localhost:27017/DostavaHraneApi";
const port = process.env.PORT || 3000;



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

