const Products = require("../models/Products");

/*
Products
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

function calculateAverage(arrayOfNumbers){
    let sum = 0;
    arrayOfNumbers.map(number=>{
        sum+=number;
    });
    let average = sum/arrayOfNumbers.length;
    return  Math.round(average * 10) / 10;
}

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