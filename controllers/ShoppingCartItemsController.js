const Shopping_cart_items = require("../models/ShoppingCartItems");
const Products = require("../models/Products");

/*
ShopingCartItems
- AddToCart - POST: api/ShoppingCartItems
- ShoppingCartTotalPrice - GET: api/ShoppingCartItems/SubTotal/3
- GetShoppingCartItems - GET: api/ShoppingCartItems/3
- ItemsInCart - GET: api/ShoppingCartItems/TotalItems/3
- ClearShoppingCart - DEL: api/ShoppingCartItems/3
*/

function addToCart(sciId,productId){
    return new Promise((resolve,reject)=>{
        try {
            resolve(Shopping_cart_items.findOneAndUpdate({_id:sciId}),{
                $push:{productId:productId}
            });
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function getTotalPrice(data){
    return new Promise((resolve,reject)=>{
        try {
            
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function getItems(data){
    return new Promise((resolve,reject)=>{
        try {
            
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function getTotalItems(data){
    return new Promise((resolve,reject)=>{
        try {
            
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function clearShoppingCart(data){
    return new Promise((resolve,reject)=>{
        try {
            
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

module.exports = {
    addToCart,
    getTotalPrice,
    getItems,
    getTotalItems,
    clearShoppingCart
};