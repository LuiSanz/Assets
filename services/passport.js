const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  }, function (req, email, password, done) {
    User.findOne({ 'email': email }, function (err, user) {
      if (err)
        return done(err);

      // if no user is found, return the message
      if (!user)
        return done(null, false);
      if (!user.validPassword(password))
        return done(null, false); // create the loginMessage and save it to session as flashdata

      // all is well, return successful user
      return done(null, user);
    })
  }));

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
    function (req, email, password, done) {
      process.nextTick(function () {
        User.findOne({ 'email': email }, function (err, user) {
          if (err)
            return done(err);
          if (user) {
            return done(null, false);
          }
          else {
            const newUser = new User();
            newUser.email = email;
            newUser.password = newUser.generateHash(password);

            newUser.save(function (err) {
              if (err)
                throw err;
              return done(null, newUser)
            });

          }

        })
      })
    })
  );
}