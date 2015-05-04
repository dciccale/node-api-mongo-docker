'use strict';

var Boom = require('boom');
var passport = require('passport');

var auth = require('../auth-service');

/**
 * Login controller
 * handles HTTP responses
 */
function LoginController() {}

LoginController.prototype = {
  /**
   * Login a user
   */
  login: function (req, reply) {
    req.body = req.payload;
    passport.authenticate('local', function (err, user, info) {
      var error = err || info, token;
      if (error) {
        return reply(Boom.unauthorized(error.message));
      }
      token = auth.signToken(user._id, user.role);
      reply({token: token});
    })(req, reply);
  }
};

module.exports = LoginController;
