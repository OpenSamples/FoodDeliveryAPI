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
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while creating category',
                status: 500,
                err_msg
            })
        }
    });
}

//Getting all categories sorted by creation date
function getAllCategories(){
    return new Promise((resolve,reject)=>{
        try {
            resolve(Categories.find({}).lean().sort({createdAt:-1}));
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while fetching categories',
                status: 500,
                err_msg
            })
        }
    });
}

function deleteById(id) {
    return new Promise((resolve, reject) => {
        try {
            resolve(Categories.deleteOne({_id: id}))
        } catch(e) {
            reject({
                error: true,
                message: 'Something went wrong while deleting category...',
                err_msg: e,
                status: 500
            })
        }
    })
}


module.exports ={
    createCategories,
    getAllCategories,
    deleteById
};