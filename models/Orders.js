const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    fullName:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        minlength:9
    },
    orderTotal:{
        type:Number,
        default:0
    },
    orderPlaced:{
        type:Date,
        required:true
    },
    isOrderCompleted:{
        type:Boolean,
        required:true,
        default:false
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    orderDetails:[{
        type:Schema.Types.ObjectId,
        ref:"OrderDetails"
    }]
},{timestamps:true});

const Orders = mongoose.model("Orders",ordersSchema);

module.exports = Orders;
