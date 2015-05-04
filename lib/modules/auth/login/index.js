'use strict';

var LoginController = require('./login-controller');
var loginCtrl = new LoginController();

module.exports = [
  {
    method: 'POST',
    path: '/login',
    handler: loginCtrl.login
  }
];
