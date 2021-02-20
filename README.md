# FoodDeliveryAPI   

### Technologies:   
Node.js, MongoDB, Express.js, Passport, OAuth2   
     
### Instrucions:
#### Install Packages:   
...\FoodDeliveryAPI>`npm install`   
#### Add .env to project root:  
`CLIENT_ID=`   
`CLIENT_SECRET=`   
#### Run App:   
...\FoodDeliveryAPI>`node app.js`
#### MongoDB:      
 - Make folder: `C:\data\db`,     
 - Command Prompt 1 - Start MongoDB: `C:\Program Files\MongoDB\Server\4.2\bin>mongod`    
 - Command Prompt 2 - Connect to MongoDB: `C:\Program Files\MongoDB\Server\4.2\bin>mongo`     
 *Commands:     
 Choose database: `use FoodDeliveryAPI`     
 Collections: `show collections`     
 Find all documents in the collection: `db.users.find().pretty()`      
 Delete all documents from the collection: `db.users.remove({})`   
### Scope of functionalities:
- There are 6 models (Users,Products,Shopping_Cart_Items,Categories,Orders,Orders_Details)
- User can register(after registration email is sent to the user, and he needs to confirm it in order to login)
- There are two possible authentication strategies Local which includes registration+login(email+password) and Google which connects Google profile to website
- If User registers with invalid data there is validation to handle those situations
- There are two possible roles for Users: admin & basic
- Logged User(basic) can add/remove his/her favorite food
- Logged User(basic) can add/remove Products to Shopping_Cart_Items 
- Logged User(basic) can make an Order which will take all data from Shopping_Cart_Items, transfer that data in new Order and create Orders_Details for that Order
- Logged User(basic) can add/remove review from certain Product
- User's review has: id of User who posted it,rating,comment
- Each Product has its own average rating which is being calculated from all Users ratings of that specific Product
- Logged User(admin) can add/remove/update Products & Categories
- Logged User(admin) can remove other Users
#### Heroku:   
https://api-food-delivery.herokuapp.com   
   
