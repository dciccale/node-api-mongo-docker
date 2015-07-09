/*
 * Custom User error types
 */

'use strict';

var util = require('util');
var mongoose = require('mongoose');

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
   * Also wraps mongoose.Error.ValidationError
   */
  ValidationError: function (msg) {
    if (msg instanceof UserErrors.ValidationError) {
      return msg;
    }

    this.name = 'ValidationError';
    if (typeof msg === 'string') {
      this.message = msg || 'Validation error';
    }

    // Wrap mongoose error
    if (msg instanceof mongoose.Error.ValidationError) {
      this.message = msg.message;
      this.errors = msg.errors;
    }
  }
};

util.inherits(UserErrors.UserNotFound, Error);
util.inherits(UserErrors.AuthenticationError, Error);
util.inherits(UserErrors.ValidationError, Error);

module.exports = UserErrors;
