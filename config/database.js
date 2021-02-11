const Mongoose = require('mongoose')
const { rejects } = require('assert')

const connect = (database) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(Mongoose.connect(`${process.env.MONGODB_URL}/${database}`))
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = connect