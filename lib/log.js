/*
 * Logger
 */

'use strict';

var goodConsole = require('good-console');
var good = require('good');

module.exports = function (server, cb) {
  var options = {
    opsInterval: 1000,
    reporters: [{
      reporter: goodConsole,
      events: {log: '*', response: '*'}
    }]
  };

  server.register({
    register: good,
    options: options
  }, function (err) {
    if (err) {
      console.error(err);
    } else {
      cb();
    }
  });
};
