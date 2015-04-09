/*
 * Custom User error types
 */

'use strict';

var util = require('util');

var UserErrors = {
  /**
   * User not found
   */
  UserNotFound: function (msg) {
    this.name = 'UserNotFound';
    this.message = msg || 'Unable to find user';
  },

  /**
   * Authentication error
   */
  AuthenticationError: function (msg) {
    this.name = 'AuthenticationError';
    this.message = msg || 'Authentication error';
  },

  /**
   * Validation error
   */
  ValidationError: function (msg) {
    this.name = 'ValidationError';
    this.message = msg || 'There was a validation error';
  }
};

util.inherits(UserErrors.UserNotFound, Error);
util.inherits(UserErrors.AuthenticationError, Error);
util.inherits(UserErrors.ValidationError, Error);

module.exports = UserErrors;
