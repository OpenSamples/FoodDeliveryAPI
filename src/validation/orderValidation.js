//Shopping cart items model
const Shopping_cart_items_model = require("../models/ShoppingCartItems");

//Same as userValidation,but here we are returning promise because we need to check if Shopping_cart_items with provided
//userId exists if not we are pushing new error to errors and resolving it further
module.exports = (orderData,userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {phone, address } = orderData;
            const sci = await Shopping_cart_items_model.findOne({ userId: userId });
            const errors = [];
            const rePhone = /^\d{9}$/;
            if (phone.length < 1 || address.length < 1) {
                errors.push({ msg: "Must fill all fields." })
            }

            if(!orderData[key]) {
                errors.push(`${key} should be defined!`)
            } else if(typeof orderData[key] !== 'string') {
                errors.push(`${key} must be a string!`)
            }
        }

        if(errors.length) {
            return {
                error: !!errors.length,
                message: 'Validation error!',
                status: 406,
                err_msg: errors
            }
        }

        const { userId, phone, address } = orderData;
        const sci = await Shopping_cart_items_model.findOne({ userId: userId });
        const rePhone = /^\d{9}$/;

        if (phone.length < 1 || address.length < 1) {
            errors.push("Must fill all fields.")
        }
        if (!rePhone.test(phone)) {
            errors.push("Invalid phone format.");
        }
        if (!sci) {
            errors.push("You must first fill Shopping Cart if you want to proceed with your order.");
        }


        return {
            error: !!errors.length,
            message: 'Validation error!',
            status: 406,
            err_msg: errors
        }
    } catch(e) {
        return e
    }
}

module.exports = validateOrder