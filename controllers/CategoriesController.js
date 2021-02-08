const Categories = require("../models/Categories");

/*
Categories
- GetCategories - GET: api/Categories
-CreateCategories - POST: api/Categories
*/

function createCategories(data){
    return new Promise((resolve,reject)=>{
        try {
            resolve(Categories.create(data));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function getAllCategories(){
    return new Promise((resolve,reject)=>{
        try {
            resolve(Categories.find({}).lean().sort({createdAt:-1}));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}


module.exports ={
    createCategories,
    getAllCategories
};