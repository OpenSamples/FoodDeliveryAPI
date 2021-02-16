require("dotenv").config();

//We have to include our config files
const connect = require('./config/db')
const app = require("./config/server")

const port = process.env.PORT || 3000;


//First we connect to database then we are running the server
(async () => {
    try {
        await connect()
    
        console.log("Successfully connected to database\n")
    
        app.listen(port, () => 
             console.log(`Server is running properly on port ${port}.`) 
        )
    
    } catch(e) {
        console.log(`Error Ocurred in connecting to database: ${e}`)
    }
})()