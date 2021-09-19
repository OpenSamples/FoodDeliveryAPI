# FoodDeliveryAPI   

## Technologies:   
Node.js, MongoDB, Express.js, Passport, OAuth2   
     
## Instructions:
### Install Packages:   
...\FoodDeliveryAPI>`npm install`   
### Add .env to project root:  
`CLIENT_ID=`   
`CLIENT_SECRET=`   
    
### Authorization with Passport:   
- Use `https://console.cloud.google.com/` to create new app and generate new credentials.   
- Set callback URL to `http://localhost:3001/api/users/google/redirect`    
- Use generated credentials to set `CLIENT_ID` and `CLIENT_SECRET`.      
    
### MongoDB:      
 - Make folder: `C:\data\db`,     
 - Command Prompt 1 - Start MongoDB: `C:\Program Files\MongoDB\Server\4.2\bin>mongod`    
 - Command Prompt 2 - Connect to MongoDB: `C:\Program Files\MongoDB\Server\4.2\bin>mongo`     
 *Commands:     
 Choose database: `use FoodDeliveryDB`     
 Collections: `show collections`     
 Find all documents in the collection: `db.users.find().pretty()`      
 Delete all documents from the collection: `db.users.remove({})`   
     
### Run App:   
For development: `npm start`    
For production:    
...\FoodDeliveryAPI>`node app.js`    
   
