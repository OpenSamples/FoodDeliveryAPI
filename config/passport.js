const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const User = require("../src/models/Users")

module.exports = () => {
  passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      return done(null, false, { message: "User doesn't exist." });
    }
    const passWordMatch = await bcrypt.compare(password, user.password);
    if (!passWordMatch) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user, { message: "Successful login." });
  }));

  passport.use(new GoogleStrategy({
    clientID:process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:"http://localhost:3000/api/users/google/redirect",
  },
   async(accessToken,refreshToken,profile,done)=>{
      const newUserObject = {
        googleId:profile.id,
        firstName:profile.name.givenName,
        lastName:profile.name.familyName,
        email:profile.emails[0].value,
        logoUrl:profile.photos[0].value
      };
      try {
        const user = await User.findOne({googleId:profile.id});
        if(user){
          done(null,user);
        }else{
          const newUser = await User.create(newUserObject);
          done(null,newUser);
        }
      } catch (error) {
        console.log(error);
      }
   }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};


