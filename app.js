require('dotenv').config()

const app = require('./config/server')
const connect = require('./helpers/connectionDB')

app.listen(process.env.PORT || 3000, async () => {
    console.log(`Server is up on port ${process.env.PORT || 3000}\n`)

    try {
        await connect('DostavaHraneAPI')

        console.log('\nConnected to Database.')
    } catch (e) {
        console.log('Something went wrong with database...', '\n\n', e)
    }
})