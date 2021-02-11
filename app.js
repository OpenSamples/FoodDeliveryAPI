require('dotenv').config()

const app = require('./config/server')
const connect = require('./config/db')

app.listen(process.env.PORT || 3000, async () => {
    console.log(`Server is up on port ${process.env.PORT || 3000}\n`)

    try {
        await connect('DostavaHraneAPI')

        console.log('\nConnected to database.')
    } catch (err) {
        console.log('Something went wrong with database.', '\n\n', err)
    }
})