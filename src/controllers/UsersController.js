//Users Model
const Users = require("../models/Users");
//Products Model
const Products = require("../models/Products");
//userValidation function from validation folder
const userValidation = require("../validation/userValidation");

/*
Users
AddNewUser - POST : api/Users
GetAllUsers - GET : api/Users
GetUserById - GET : api/Users/4 (User Id)
GetFavoriteFoodByUser - GET : api/Users/FavoriteFood/4 (User ID);
AddFavoriteFood - POST : api/Users/AddFavoriteFood/5 (Product ID);
RemoveFavoriteFood - POST : api/Users/RemoveFavoriteFood/5 (product ID)
*/

//JUST FOR TESTING...this can be later implemented as Users.registerNewUser(data)*
//JSON example
/*
{
    "firstName": "Jovana",
    "lastName": "Jovanovic",
    "email": "jovana@gmail.com",
    "password": "Sifra12345",
    "role": 0,
    "addresses":["Kozaracka 21","Miodraga Bulatovica 42"], *It can be empty*
    "favoriteFood":["602194b72e86a32cd071f9cf","6021953a2e86a32cd071f9d0"]  *It can be empty* 
}
*/
//First we call userValidation function in which we pass data object with data as above and storing it
//in validate variable (check userValidation in validation folder)
//Then if validate.lenght is grater than zero that means that errors array which we returned in userValidation is full with errors
//we then resolve validate which will now be array of objects with error messages
//If validate is empty we are checking if user with same email already exists in our database if yes we are resolving error message
//if not we are creating new user with data that we passed
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

//Getting user by Id
function getUserById(userId){
    return new Promise(async (resolve, reject) => {
        try {
           resolve(Users.findOne({_id:userId}));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

//Getting all users
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

//Getting favorite food by user 
//1.We find user by his id 
//2.We find all those products(favorite food) whose id is inside user.favoriteFood array of ids
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

//User can add product(favorite food)
//We just push productId in favoriteFood row
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

//User can remove favorite food we are doing this by pulling ($pull) 
//productId from favoriteFood array
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
    getUserById,
    getFavoriteFoodByUser,
    addFavoriteFood,
    removeFavoriteFood
};