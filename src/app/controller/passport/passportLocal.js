// import passport from "passport";
// import passportLocal from "passport-local";
// import User from "../../models/User";
const passport = require('passport')
const passportLocal = require('passport-local')
const User = require('../../models/User')

let LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () => {
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, async (req, email, password, done)=> {
    try {
      let user = await User.findByEmail(email);
      if (!user) {
        console.log('NOT FOUND')
        return done(null, false);
      }

      let checkPassword = await(user.comparePassword(password));

      if (!checkPassword) {
        console.log('sai mk')
        return done(null, false);
      }
      return done(null, {
        email,
        password,
        active: true
    })
    } catch (error) {
      console.log(error);
      return done(null, false,);
    }
  }));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {

User.findOne({email: user.email}, function (err, user) {
  done(err, user);
});
})
};


module.exports = initPassportLocal;