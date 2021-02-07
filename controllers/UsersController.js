const Users = require("../models/Users");
const userValidation = require("../validation/userValidation");

function add(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const validate = userValidation(data);
            if(validate.length>0){
                resolve(validate);
            }else{
                const userByName = await Users.findOne({name:data.name});
                const userByEmail = await Users.findOne({email:data.email});
                if(userByEmail || userByName){
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

function findAll() {
    return new Promise((resolve, reject) => {
        try {
            resolve(Users.find({}).lean().sort({ createdAt: -1 }));
        } catch (error) {
            console.log(error);
            reject(false);
        }
    });
}

module.exports = {
    add,
    findAll
};