/**
 * Auth strategy
 */

'use strict';

var jwt = require('jsonwebtoken');

var config = require('../../config/environment');
var User = require('../user/user-model');

module.exports = function (server) {

  function verify() {
  }
  // Auth strategy
  server.register(require('hapi-auth-bearer-token'), function (err) {
    server.auth.strategy('simple', 'bearer-access-token', {
      validateFunc: function (token, callback) {
        var req = this;

        // Verify token
        jwt.verify(token, config.secrets.session, function (err, data) {
          var credentials = {token: token};

          if (err) {
            return callback(err, false, credentials);
          }

          // Look up user
          User.findById(data._id, function (err, user) {
            if (err) {
              return callback(err, false, credentials);
            }
            if (!user) {
              return callback(null, false, credentials);
            }

            // Make user available in the request
            req.user = user;
            credentials.scope = user.role;
            callback(null, true, credentials);
          });
        });
      }
    });
  });

  // Passport Configuration
  require('./local/passport').setup(User, config);
};
