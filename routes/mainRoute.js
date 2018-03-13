const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (app, passport) => {
  app.get('/', (req, res) => {

    res.send({ Hello: 'World' });
  });
  app.get('/profile', isLoggedIn, function (req, res) {
    res.send({ user: req.user });
  });
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
  app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/profile'
  }));
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }))
  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the home page
    res.send('You are not logged in');
  }
}
