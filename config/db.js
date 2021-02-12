const mongoose = require("mongoose"); 
const connection = process.env.MONGODB_URI || "mongodb://localhost:27017/DostavaHraneApi";

const connect = (db) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }))
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = connect