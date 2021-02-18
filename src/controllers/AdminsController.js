const Users = require("../models/Users");
const Products = require("../models/Products");
const Categories = require("../models/Categories");

function deleteUser(id){
   return new Promise(async(resolve,reject)=>{
    try {
        resolve(
            Users.findOneAndDelete({_id:id})
        );
    } catch (err_msg) {
        reject({
            error: true,
            message: 'Something went wrong while deleting entity!',
            status: 500,
            err_msg
        })
    }
   });
}

function deleteProduct(id){
    return new Promise(async(resolve,reject)=>{
     try {
         resolve(
             Products.findOneAndDelete({_id:id})
         );
     } catch (err_msg) {
         reject({
             error: true,
             message: 'Something went wrong while deleting entity!',
             status: 500,
             err_msg
         })
     }
    });
 }

 function deleteCategory(id){
    return new Promise(async(resolve,reject)=>{
     try {
         resolve(
             Categories.findOneAndDelete({_id:id})
         );
     } catch (err_msg) {
         reject({
             error: true,
             message: 'Something went wrong while deleting entity!',
             status: 500,
             err_msg
         })
     }
    });
 }

module.exports = {
    deleteUser,
    deleteProduct,
    deleteCategory
};