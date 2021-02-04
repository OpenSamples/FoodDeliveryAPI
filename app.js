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


    /*
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
   name:{
       type:String,
       minlength:3,
       maxlength:15,
       required:true,
       unique:true
   },
   description:{
       type:String,
       minlength:10,
       maxlength:150
   },
   img:{
       type: String,
       default:"../images/defaultbook.png"
   },
   price:{
       type:Number,
       required:true,
       min:1,
       max:10000
   },
   quantity:{
       type:Number,
       default:1,
       min:1,
       max:10
   },
   pages:{
       type:Number,
        min:10,
        max:5000,
        default:10
   },
   user: {
       type:Schema.Types.ObjectId,
       required:true,
       ref: 'User'
   }
},{timestamps:true});

const Book = mongoose.model("Book",bookSchema);

module.exports = Book;
    */