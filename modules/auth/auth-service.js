'use strict';

var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var User = require('../user/user-model');

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  return jwt.sign({_id: id}, config.secrets.session, {expiresInMinutes: 60 * 5});
}

exports.signToken = signToken;
