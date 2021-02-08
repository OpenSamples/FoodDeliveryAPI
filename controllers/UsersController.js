const Users = require("../models/Users");
const Products = require("../models/Products");
const userValidation = require("../validation/userValidation");

/*
Users
AddNewUser - POST : api/Users
GetAllUsers - GET : api/Users
GetFavoriteFoodByUser - GET : api/Users/FavoriteFood/4 (User ID);
*/

function addUser(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const validate = userValidation(data);
            if(validate.length>0){
                resolve(validate);
            }else{
                const userByEmail = await Users.findOne({email:data.email});
                if(userByEmail){
                    resolve({msg:"User with same data already exists in database."});
                }else{
                    resolve(Users.create(data));
                }
            }
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function getAllUsers() {
    return new Promise((resolve, reject) => {
        try {
            resolve(Users.find({}).lean().sort({ createdAt: -1 }));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function getFavoriteFoodByUser(userId) {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await Users.findOne({_id:userId});
            const favoriteFood = await Products.find({_id:{$in:user.favoriteFood}});
            resolve(favoriteFood);
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}


function addFavoriteFood(userId,productId) {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await Users.findOneAndUpdate({_id:userId},{
                $push:{favoriteFood:productId}
            });
            resolve(user);
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

function removeFavoriteFood(userId,productId) {
    return new Promise(async(resolve, reject) => {
        try {
            const user = await Users.findOneAndUpdate({_id:userId},{
                $pull:{favoriteFood:productId}
            });
            resolve(user);
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}



module.exports = {
    addUser,
    getAllUsers,
    getFavoriteFoodByUser,
    addFavoriteFood,
    removeFavoriteFood
};