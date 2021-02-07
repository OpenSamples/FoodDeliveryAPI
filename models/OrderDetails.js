const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderDetailsSchema = new Schema({
    price:{
        type:Number,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    orderId:{
        type:Schema.Types.ObjectId,
        ref:"Orders", 
        required:true
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Products",
        required:true
    }
},{timestamps:true});

orderDetailsSchema.virtual("")
                  .get(function () { 
                            return 0;
                        });


const Order_Details = mongoose.model("Order_Details",orderDetailsSchema);

module.exports = Order_Details;
