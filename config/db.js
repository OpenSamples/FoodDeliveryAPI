const Mongoose = require('mongoose');

const connect = (db) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(Mongoose.connect(`${process.env.MONGODB_URL}/${db}`))
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = connect