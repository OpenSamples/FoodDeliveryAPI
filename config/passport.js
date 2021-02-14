const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
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

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};


