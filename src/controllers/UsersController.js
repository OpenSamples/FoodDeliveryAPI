//Users Model
const Users = require("../models/Users");
//Products Model
const Products = require("../models/Products");
//userValidation function from validation folder
const userValidation = require("../validation/userValidation");
//Hashing the password
const bcrypt = require("bcrypt");

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
            !data.role ? data.role = 0 : null;
            const validate = userValidation(data, true);
            if (validate.error) {
                reject(validate);
                return;
            }
            const userByEmail = await Users.findOne({ email: data.email });
            if (userByEmail) {
                reject({
                    error: true,
                    message: 'User with same data already exists in database.',
                    status: 406
                });
            } else {
                data.password = await bcrypt.hash(data.password, 10);
                resolve(Users.create(data));
            }
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while adding new user!',
                status: 500,
                err_msg
            })
        }
    });
}

//Update user
function updateUser(userId, newData) {
    return new Promise(async (resolve, reject) => {
        try {
            if (newData.email !== undefined) {
                if (validateEmail(newData.email)) {
                    const user = await Users.findOne({ email: newData.email });
                    if (user) {
                        if (user.email === newData.email) {
                            resolve(
                                Users.findOneAndUpdate({ _id: userId }, newData, { new: true })
                            );
                        } else {
                            reject({ msg: "User with same email already exist" });
                        }
                    } else {
                        resolve(
                            Users.findOneAndUpdate({ _id: userId }, newData, { new: true })
                        );
                    }
                } else {
                    reject({ msg: "Invalid email format" });
                }
            } else {
                resolve(
                    Users.findOneAndUpdate({ _id: userId }, newData, { new: true })
                );
            }
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while updating user!',
                status: 500,
                err_msg
            })
        }
    });
}

//Getting user by Id
function getUserById(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(Users.findOne({ _id: userId }));
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while fetching an user!',
                status: 500,
                err_msg
            })
        }
    });
}

//Getting all users
function getAllUsers() {
    return new Promise((resolve, reject) => {
        try {
            resolve(Users.find({}).lean().sort({ createdAt: -1 }));
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while fetching users!',
                status: 500,
                err_msg
            })
        }
    });
}

//Getting favorite food by user 
//1.We find user by his id 
//2.We find all those products(favorite food) whose id is inside user.favoriteFood array of ids
function getFavoriteFoodByUser(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Users.findOne({ _id: userId });
            const favoriteFood = await Products.find({ _id: { $in: user.favoriteFood } });
            resolve(favoriteFood);
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while fetching user favorite foods!',
                status: 500,
                err_msg
            })
        }
    });
}

//User can add product(favorite food)
//We just push productId in favoriteFood row
function addFavoriteFood(userId, productId) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Users.findOneAndUpdate({ _id: userId }, {
                $push: { favoriteFood: productId }
            });
            resolve(user);
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while adding favorite food to user!',
                status: 500,
                err_msg
            })
        }
    });
}

//User can remove favorite food we are doing this by pulling ($pull) 
//productId from favoriteFood array
function removeFavoriteFood(userId, productId) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Users.findOneAndUpdate({ _id: userId }, {
                $pull: { favoriteFood: productId }
            });
            resolve(user);
        } catch (err_msg) {
            reject({
                error: true,
                message: 'Something went wrong while removing favorite food from user!',
                status: 500,
                err_msg
            })
        }
    });
}

function verifyEmail(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            let isUpdated = await Users.findOneAndUpdate({_id: userId}, {email_is_verified: true})
            if(!isUpdated) {
                reject({
                    error: true,
                    status: 404,
                    message: 'User does not exist!'
                })
                return;
            }
            resolve(isUpdated)
        } catch (e) {
            reject({
                error: true,
                status: 500,
                message: 'Something went wrong while verifying email...',
                err_msg: e
            })
        }
    })
}

function updateCode(userId, code) {
    return new Promise((resolve, reject) => {
        try {
            resolve(Users.findOneAndUpdate({_id: userId}, { $set: { two_fa: { enabled: true, code } }}))
        } catch(err_msg) {
            reject({
                error: true,
                message: 'Something went wrong...',
                status: 500,
                err_msg
            })
        }
    })
}

function getCode(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await Users.find({_id: userId}).exec()

            if(!user[0]) {
                reject({
                    error: true,
                    message: 'User does not exist!',
                    status: 404
                })
                return;
            }
            resolve(user[0].two_fa.code)
        } catch(e) {
            reject({
                error: true,
                message: 'Something went wrong...',
                status: 500,
                err_msg: e
            })
        }
    })
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}


module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    getFavoriteFoodByUser,
    addFavoriteFood,
    removeFavoriteFood,
    updateUser,
    verifyEmail,
    updateCode,
    getCode
};