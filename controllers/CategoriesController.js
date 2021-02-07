const Categories = require("../models/Categories");

function add(data){
    return new Promise((resolve,reject)=>{
        try {
            resolve(Categories.create(data));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function findAll(){
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
    add,
    findAll
};