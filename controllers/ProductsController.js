//Products Model
const Products = require("../models/Products");

/*
Products routes

- CreateProduct - POST: api/Products
- GetAllProducts - GET: api/Products
- GetProductById - GET: api/Products/1
- GetProductByCategory - GET: api/Products/ProductsByCategory/1(Category ID)
- GetPopularProduct - GET: api/Products/PopularProducts
- AddReview - POST : api/Products/Review
- GetAllReviewsByProduct - GET : api/Products/Review/5(Product ID)
- GetAverageRatingByProduct - GET : api/Products/AverageRating/5 (Product ID)
- GetAllCommentsOfProduct - GET : api/Products/Comments/5 (Product ID)
*/

//Adding new product with data as parameter
//JSON example of product data
/*
{
    "name":"ProductName",
    "detail":"Product details",
    "imageUrl":"Some image url",
    "price":*Some price example* 5,
    "isPopularProduct":true,
    "categoryId":"SomeCategoryId",
    "reviews":[] ->This will be added later by certain user
}
*/
function createProduct(data){
    return new Promise((resolve,reject)=>{
        try {
            resolve(Products.create(data));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

//Getting all products and sorting them by createdAt row
function getAllProducts(){
    return new Promise((resolve,reject)=>{
        try {
            resolve(Products.find({}).lean().sort({createdAt:-1}));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

//Getting certain products by its id 
function getProductById(productId){
    return new Promise((resolve,reject)=>{
        try {
            resolve(Products.find({_id:productId}));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

//Getting all product that belong to passed category
function getProductsByCategory(categoryId){
    return new Promise((resolve,reject)=>{
        try {
            resolve(Products.find({categoryId:categoryId}).lean().sort({createdAt:-1}));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

//Getting all those products that are popular
//Popular products are those whose isPopularProduct row is set to true
function getPopularProducts(){
    return new Promise((resolve,reject)=>{
        try {
            resolve(Products.find({isPopularProduct:true}));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

//Adding User review for certain product 
//Idea is to update existing product by pushing new review in reviews array of objects
//that review will contain three fields userId,rating,comment
//JSON example
/*
{
    "userId": "60219dcbe0034d3cd4bbbea7",
    "rating": 5,
    "comment": "Rice was delicious and poultry was nice too."
}
*/
function addReview(reviewData,productId){
    return new Promise(async(resolve,reject)=>{
        try {
            const reviewProduct = await Products.findOneAndUpdate({_id:productId},{
                $push:{reviews:reviewData}
            });
            resolve(reviewProduct);
         } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

//Getting all reviews for certain product 
function getAllReviewsOfProduct(productId){
    return new Promise(async(resolve,reject)=>{
        try {
            const productReviews = await Products.findOne({_id:productId});
            resolve(productReviews.reviews);
         } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

//Getting average user rating of certain product, we are finding that product with productId
//then we are making an array of ratings by mapping product.reviews array and storing that in 
//productRagings array. We are checking if productRatings array is empty if it is we are resolving message "No ratings yet", if not
//we are calling function calculateAverage which will return average number from array of numbers(rating numbers) and rounding it to 
//one decimal so example ratings:[4,3,3] average rating is 3.3 (4+3+3) divided by number of ratings(3) we can later store this 
//calucateAverage function somewhere else
function getAverageRatingOfProduct(productId){
    return new Promise(async(resolve,reject)=>{
        try {
            const product = await Products.findOne({_id:productId});
            const productRatings = product.reviews.map(review=>{
                return review.rating;
            });
            if(productRatings.length<1){
                resolve({msg:"No ratings yet"});
            }else{
                resolve(calculateAverage(productRatings));
            }
         } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

//Getting all comments from certain product by mapping product.reviews array of objects and fetching review.comment and
//storing it into productComments array if array is empty we are returning message No Comments Yet opposite we are 
//returning that array of comments
function getAllCommentsOfProduct(productId){
    return new Promise(async(resolve,reject)=>{
        try {
            const product = await Products.findOne({_id:productId});
            const productComments = product.reviews.map(review=>{
                return review.comment;
            });
            if(productComments.length<1){
                resolve({msg:"No comments yet"});
            }else{
                resolve(productComments);
            }
         } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

//User can remove his/her review from product 
//We are doing this by updating existing which we search with productId
//then we are pulling ($pull) review that has userId same as userId which we passed as parameter to the function
function removeReview(userId,productId){
    return new Promise(async(resolve,reject)=>{
        try {
            resolve(
                Products.findOneAndUpdate({_id:productId},{
                  $pull:{reviews:{userId:userId}}
                })
            ) 
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function calculateAverage(arrayOfNumbers){
    let sum = 0;
    arrayOfNumbers.map(number=>{
        sum+=number;
    });
    let average = sum/arrayOfNumbers.length;
    return  Math.round(average * 10) / 10;
}


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getPopularProducts,
    addReview,
    getAllReviewsOfProduct,
    getAverageRatingOfProduct,
    getAllCommentsOfProduct,
    removeReview
}