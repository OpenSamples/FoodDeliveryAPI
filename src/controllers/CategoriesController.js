//Categories Model
const Categories = require("../models/Categories");

/*
Routes for categories

Categories
- GetCategories - GET: api/Categories
- CreateCategories - POST: api/Categories
*/

//Adding new category 
//JSON example of req.body(data)
/*
{
    "name": "CategoryName",
    "imageUrl": "ImageUrl",
}    
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

//Getting all categories sorted by creation date
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