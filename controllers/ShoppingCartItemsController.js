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

function getTotalPrice(userId){
    return new Promise(async (resolve,reject)=>{
        try {
            const allShoppingCartItemsByUser = await Shopping_cart_items.find({userId:userId});
            let totalPrice = 0 ;
            allShoppingCartItemsByUser.map(item=>{
                totalPrice+=item.totalAmount
            });
            resolve(totalPrice);
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function getItems(userId){
    return new Promise(async(resolve,reject)=>{
        try {
            const allShoppingCartItems = await Shopping_cart_items.find({userId:userId});
            const productsIds = allShoppingCartItems.map(item=>{
                return item.productId
            });
            const products = await Products.find({_id:{$in:productsIds}});
            resolve(products);
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function getTotalItems(userId){
    return new Promise((resolve,reject)=>{
        try {
            resolve(Shopping_cart_items.countDocuments({userId:userId}));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function clearShoppingCart(sciId){
    return new Promise((resolve,reject)=>{
        try {
            resolve(Shopping_cart_items.findOneAndDelete({_id:sciId}));
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