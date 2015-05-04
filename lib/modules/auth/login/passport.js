'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (UserModel, config) {
  passport.use(new LocalStrategy({
      usernameField: 'email'
    },
    function (email, password, done) {
      UserModel.findOne({
        email: email.toLowerCase()
      }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {message: 'This email is not registered.'});
        }
        if (!user.authenticate(password)) {
          return done(null, false, {message: 'This password is not correct.'});
        }
        return done(null, user);
      });
    }
  ));
};
