'use strict';

var Boom = require('boom');

/**
 * User controller
 * handles HTTP responses
 */
function UserController(userService, commonErrorTypes, userErrorTypes) {
  this.userService = userService;
  this.commonErrorTypes = commonErrorTypes;
  this.userErrorTypes = userErrorTypes;
}

UserController.prototype = {
  /**
   * Get list of users
   * restriction: 'admin'
   */
  index: function (req, reply) {
    this.userService.get()
      .then(reply)
      .catch(this.commonErrorTypes.QueryError, replyError(reply));
  },

  /**
   * Creates a new user
   */
  create: function (req, reply) {
    this.userService.create(req.payload)
      .then(reply)
      .catch(this.userErrorTypes.ValidationError, replyValidationError(reply))
  },

  /**
   * Get a single user
   */
  show: function (req, reply) {
    this.userService.getProfile(req.params.id)
      .then(reply)
      .catch(this.commonErrorTypes.QueryError, replyError(reply))
      .catch(this.userErrorTypes.UserNotFound, replyError(reply, 404));
  },

  /**
   * Deletes a user
   * restriction: 'admin'
   */
  destroy: function (req, reply) {
    this.userService.removeById(req.params.id)
      .then(function () {
        reply().code(204);
      })
      .catch(this.commonErrorTypes.QueryError, replyError(reply));
  },

  /**
   * Change a users password
   */
  changePassword: function (req, reply) {
    this.userService.changePassword(req.user, req.payload.oldPassword, req.payload.newPassword)
      .then(reply)
      .catch(this.userErrorTypes.UserNotFound, replyError(reply))
      .catch(this.userErrorTypes.AuthenticationError, function (err) {
        reply(Boom.unauthorized(err.message));
      })
      .catch(this.userErrorTypes.ValidationError, replyValidationError(reply));
  },

  /**
   * Get my info
   */
  me: function (req, reply) {
    this.userService.me(req.user._id)
      .then(reply)
      .catch(this.commonErrorTypes.QueryError, replyError(reply))
      .catch(this.userErrorTypes.UserNotFound, replyError(reply, 404));
  }
};

/**
 * Reply a Boom error
 * code defaults to 500
 */
function replyError(reply, code) {
  return function (err) {
    reply(Boom.wrap(err, code));
  };
}

/**
 * Reply a Boom.badData error
 */
function replyValidationError(reply) {
  return function (err) {
    reply(Boom.badData(err.message));
  };
}

module.exports = UserController;
