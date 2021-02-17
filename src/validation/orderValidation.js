//Shopping cart items model
const Shopping_cart_items_model = require("../models/ShoppingCartItems");

async function validateOrder(orderData, userId) {
    try {
        let requiredKeys = ['phone', 'address']
        const errors = [];

        for(let i = 0; i < requiredKeys.length; i++) {
            let key = requiredKeys[i]

            if(key in orderData && !orderData[key]) {
                errors.push(`Invalid ${key}`)
            }

            if(!orderData[key]) {
                errors.push(`${key} should be defined!`)
            } else if(typeof orderData[key] !== 'string') {
                errors.push(`${key} must be a string!`)
            }
        }

        if(!userId) {
            errors.push('User id should be defined!')
        } else if(typeof userId !== 'string') {
            errors.push('User id must be a string!')
        }

        if(errors.length) {
            return {
                error: !!errors.length,
                message: 'Validation error!',
                status: 406,
                err_msg: errors
            }
        }

        const { phone, address } = orderData;
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