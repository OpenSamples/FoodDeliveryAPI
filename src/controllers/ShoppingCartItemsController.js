const Shopping_cart_items = require("../models/ShoppingCartItems");
const Products = require("../models/Products");

/*
ShopingCartItems
- AddToCart - POST: api/ShoppingCartItems/4(Product ID)
- ShoppingCartTotalPrice - GET: api/ShoppingCartItems/SubTotal/3(SciId)
- GetShoppingCartItemsByUserId - GET: api/ShoppingCartItems/3(userId)
- ItemsInCart - GET: api/ShoppingCartItems/TotalItems/3
- RemoveProductFromUsersShoppingCart - POST api/ShoppingCartItems/remove-product/4 (User ID)
- ClearShoppingCart - DEL: api/ShoppingCartItems/3
*/

//User can add product he wants to buy to cart 
//1.We search for shoppingCartItems with data.userId from parameters 
//2.We search for product by productId
//3.We create productObject that contains productId,price(price od product),qty(quantity)
//4.We are checking if shoppingCartItems exist(with userId:data.userId)
//if yes then we update it by pushing productObject in products array of objects
//if not we are creating new shoppingCartItems in which we pass productObject to products and 
//data.userId to userId
//JSON example of data
/*
{
    "userId":"60255c0c528960047090f565",
    "qty":2
}
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
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while adding to cart!',
                status: 500,
                err_msg
            })
        }
    });
}

//Getting ShoppingCart by user we are searching for that shoppingCart by findOne where userId(field in ShoppingCartItems)
//is same as userId which we provided through parameters
function getShoppingCartItemsByUserId(userId){
    return new Promise((resolve,reject)=>{
        try {
            resolve(Shopping_cart_items.findOne({userId:userId}));
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while fetching shopping cart items!',
                status: 500,
                err_msg
            })
        }
    });
}

//Getting total amount of Shopping Cart (total price of every product with his price and quantity)
//Firt we find ShoppingCartItems with userId provided through parameter and then we resolve
//sci.totalAmount which is virtual function that calculates total amount (price)
function getTotalPriceAmount(userId){
    return new Promise(async(resolve,reject)=>{
        try {
            const sci = await Shopping_cart_items.findOne({userId:userId});
            resolve(sci.totalAmount);
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while fetching total price of shopping cart!',
                status: 500,
                err_msg
            })
        }
    });
}

//Getting total number of products in ShoppingCart
function getNumberOfProductsInCart(userId){
    return new Promise(async(resolve,reject)=>{
        try {
            const sci = await Shopping_cart_items.findOne({userId:userId});
            resolve(sci.products.length);
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while fetching shopping cart products!',
                status: 500,
                err_msg
            })
        }
    });
}

//User can remove product from shopping cart
//1.We find product that user choose to remove with productId from fucntion's parameters 
//2.We find ShoppingCart that belongs to that user and we are pulling ($pull) product from
//products array of objects by comparing its productId with productToBeRemoved.Id
function removeProductFromShoppingCart(userId,productId){
    return new Promise(async(resolve,reject)=>{
        try {
            const productToBeRemoved = await Products.findOne({_id:productId});
            resolve(
                Shopping_cart_items.findOneAndUpdate({userId:userId},{
                    $pull: { products: {productId:productToBeRemoved.id}}
                })
            );
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while removing products from shopping cart!',
                status: 500,
                err_msg
            })
        }
    });
}

//User can clear shopping cart if he chooses to clear it shoppingCart will be deleted
//if he decides to add new product new ShoppingCart will be created
function clearShoppingCart(userId){
    return new Promise((resovle,reject)=>{
        try {
            resovle(
                Shopping_cart_items.findOneAndDelete({userId:userId})
            );
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while clearing shopping cart!',
                status: 500,
                err_msg
            })
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