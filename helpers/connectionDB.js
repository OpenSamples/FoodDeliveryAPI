const Mongoose = require('mongoose');

const connect = (db) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(MOngoose.connect(`${process.env.MONGODB_URL}/${db}`))
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = connect