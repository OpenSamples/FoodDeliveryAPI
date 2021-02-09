const Shopping_cart_items = require("../models/ShoppingCartItems");
const Products = require("../models/Products");

/*
ShopingCartItems
- AddToCart - POST: api/ShoppingCartItems/4(Product ID)
- ShoppingCartTotalPrice - GET: api/ShoppingCartItems/SubTotal/3(SciId)
- GetShoppingCartItems - GET: api/ShoppingCartItems/3(SciId)
- ItemsInCart - GET: api/ShoppingCartItems/TotalItems/3
- RemoveProductFromUsersShoppingCart - POST api/ShoppingCartItems/remove-product/4 (User ID)
- ClearShoppingCart - DEL: api/ShoppingCartItems/3
*/

function addToCart(data,productId){
    return new Promise(async(resolve,reject)=>{
        try {
            const shoppingCartItems = await Shopping_cart_items.findOne({userId:data.userId});
            const product = await Products.findOne({_id:productId});
            const productObject = {
                productId:product.id,
                price:product.price,
                qty:data.qty
            };
            if(shoppingCartItems){
                resolve(Shopping_cart_items.findOneAndUpdate({userId:data.userId},{
                    $push:{products:productObject}
                }));
            }else{
                resolve(Shopping_cart_items.create({
                    products:productObject,
                    userId:data.userId
                }));
            }
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function getShoppingCartItemsByUserId(userId){
    return new Promise((resolve,reject)=>{
        try {
            resolve(Shopping_cart_items.findOne({userId:userId}));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function getTotalPriceAmount(userId){
    return new Promise(async(resolve,reject)=>{
        try {
            const sci = await Shopping_cart_items.findOne({userId:userId});
            resolve(sci.totalAmount);
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function getNumberOfProductsInCart(userId){
    return new Promise(async(resolve,reject)=>{
        try {
            const sci = await Shopping_cart_items.findOne({userId:userId});
            resolve(sci.products.length);
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function removeProductFromShoppingCart(userId,productId){
    return new Promise(async(resolve,reject)=>{
        try {
            const productToBeRemoved = await Products.findOne({_id:productId});
            resolve(
                Shopping_cart_items.findOneAndUpdate({userId:userId},{
                    $pull: { products: {productId:productToBeRemoved.id}}
                })
            );
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

//Clearing array of Products from Shopping Cart without deleting ShoppingCartItems
/*
function clearShoppingCart(userId){
    return new Promise((resovle,reject)=>{
        try {
            resovle(
                Shopping_cart_items.findOneAndUpdate({userId:userId},{
                    products:[]
                })
            );
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}
*/

function clearShoppingCart(userId){
    return new Promise((resovle,reject)=>{
        try {
            resovle(
                Shopping_cart_items.findOneAndDelete({userId:userId})
            );
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

module.exports = {
    addToCart,
    getShoppingCartItemsByUserId,
    getTotalPriceAmount,
    getNumberOfProductsInCart,
    removeProductFromShoppingCart,
    clearShoppingCart
};