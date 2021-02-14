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
UPDATE 20210215: userId is no longer being provided through req.body now we have authentication(Login) with passport
which will populate req.user with logged user object we then provide userId (req.user.id) from route
*/
function addToCart(qty, productId, userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const shoppingCartItems = await Shopping_cart_items.findOne({ userId: userId });
            const product = await Products.findOne({ _id: productId });
            const productObject = {
                productId: product.id,
                price: product.price,
                qty: qty
            };
            if (shoppingCartItems) {
                resolve(Shopping_cart_items.findOneAndUpdate({ userId: userId }, {
                    $push: { products: productObject }
                }));
            } else {
                resolve(Shopping_cart_items.create({
                    products: productObject,
                    userId: userId
                }));
            }
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

//Getting ShoppingCart by user we are searching for that shoppingCart by findOne where userId(field in ShoppingCartItems)
//is same as userId which we provided through parameters
function getShoppingCartItemsByUserId(userId) {
    return new Promise((resolve, reject) => {
        try {
            resolve(Shopping_cart_items.findOne({ userId: userId }));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

//Getting total amount of Shopping Cart (total price of every product with his price and quantity)
//Firt we find ShoppingCartItems with userId provided through parameter and then we resolve
//sci.totalAmount which is virtual function that calculates total amount (price)
function getTotalPriceAmount(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const sci = await Shopping_cart_items.findOne({ userId: userId });
            resolve(sci.totalAmount);
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

//Getting total number of products in ShoppingCart
function getNumberOfProductsInCart(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const sci = await Shopping_cart_items.findOne({ userId: userId });
            resolve(sci.products.length);
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

//User can remove product from shopping cart
//1.We find product that user choose to remove with productId from fucntion's parameters 
//2.We find ShoppingCart that belongs to that user and we are pulling ($pull) product from
//products array of objects by comparing its productId with productToBeRemoved.Id
function removeProductFromShoppingCart(userId, productId) {
    return new Promise(async (resolve, reject) => {
        try {
            const productToBeRemoved = await Products.findOne({ _id: productId });
            resolve(
                Shopping_cart_items.findOneAndUpdate({ userId: userId }, {
                    $pull: { products: { productId: productToBeRemoved.id } }
                })
            );
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

//User can clear shopping cart if he chooses to clear it shoppingCart will be deleted
//if he decides to add new product new ShoppingCart will be created
function clearShoppingCart(userId) {
    return new Promise((resovle, reject) => {
        try {
            resovle(
                Shopping_cart_items.findOneAndDelete({ userId: userId })
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