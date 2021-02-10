const Users = require('../models/Users')
const isValidUserData = require('../validation/isValidUserData')

function getUserBy(type, value) {
    return new Promise((resolve, reject) => {
        try {

            /* Users can be found by //username or// email, if something else is provided 
               it will throw an error */
            if(!['email'].includes(type)) {
                throw {error: true, message: 'You can only find by email!'}
            }

            resolve(Users.find({[type]: value}).exec())
        } catch (e) {
            reject(e)
        }
    })
}


function createUser(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const isValid = isValidUserData(data, true)

            if(isValid !== 'OK') {
                throw {error: true, message: isValid}
            }

            const userCreated = await Users.create(data)

            resolve(userCreated)
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    getUserBy,
    createUser
}