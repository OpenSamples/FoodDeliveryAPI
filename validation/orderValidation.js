const Shopping_cart_items_model = require("../models/ShoppingCartItems");

module.exports = (orderData) => {
    return new Promise(async(resolve,reject)=>{
        try {
            const { userId,phone,address} = orderData;
            const sci = await Shopping_cart_items_model.findOne({userId:userId});
            const errors = [];
            const rePhone = /^\d{9}$/;
            if(phone.length<1 || address.length<1){
                errors.push({msg:"Must fill all fields."})
            }
            if(!rePhone.test(phone)){
                errors.push({msg:"Invalid phone format."});
            }
            if(!sci){
                errors.push({msg:"You must first fill Shopping Cart if you want to proceed with your order."});
            }
            resolve(errors);
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
};

