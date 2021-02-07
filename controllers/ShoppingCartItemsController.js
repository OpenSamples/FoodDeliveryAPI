const Shopping_cart_items = require("../models/ShoppingCartItems");
const Products = require("../models/Products");

/*
ShopingCartItems
- AddToCart - POST: api/ShoppingCartItems/4(Product ID)
- ShoppingCartTotalPrice - GET: api/ShoppingCartItems/SubTotal/3(SciId)
- GetShoppingCartItems - GET: api/ShoppingCartItems/3(SciId)
- ItemsInCart - GET: api/ShoppingCartItems/TotalItems/3
- ClearShoppingCart - DEL: api/ShoppingCartItems/3
*/


function addToCart(productData,shoppingCartItemsData){
    return new Promise(async(resolve,reject)=>{
        try {
            const newSci = await Shopping_cart_items.create({
                price:productData.price,
                qty:shoppingCartItemsData.qty,
                totalAmount:productData.price*shoppingCartItemsData.qty,
                productId:productData.id,
                userId:shoppingCartItemsData.userId
            });
            resolve(newSci);
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