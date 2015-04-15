'use strict';

var Boom = require('boom');
var passport = require('passport');

var auth = require('../auth-service');

module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: function (req, reply) {
      req.body = req.payload;
      passport.authenticate('local', function (err, user, info) {
        var error = err || info, token;
        if (error) {
          return reply(Boom.unauthorized(error.message));
        }
        if (!user) {
          return reply(Boom.notFound('Something went wrong, please try again.'));
        }
        token = auth.signToken(user._id, user.role);
        reply({token: token});
      })(req, reply);
    }
  }
];
