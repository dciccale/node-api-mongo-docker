'use strict';

var UserModel = require('./user-model');
var UserService = require('./user-service');
var UserController = require('./user-controller');
var commonErrorTypes = require('../../common-error-types');
var userErrorTypes = require('./user-error-types');

var userService = new UserService(UserModel, commonErrorTypes, userErrorTypes);
var userController = new UserController(userService, commonErrorTypes, userErrorTypes);

// common route config
// bind route handler to the controller
var config = {
  bind: userController
};

module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler: userController.index,
    config: config
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: userController.destroy,
    config: config
  },
  {
    method: 'GET',
    path: '/users/me',
    handler: userController.me,
    config: config
  },
  {
    method: 'PUT',
    path: '/users/{id}/password',
    handler: userController.changePassword,
    config: config
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: userController.show,
    config: config
  },
  {
    method: 'POST',
    path: '/users',
    handler: userController.create,
    config: config
  }
];
