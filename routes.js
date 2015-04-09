/**
 * All server routes
 */

'use strict';

module.exports = function (server) {
  // require routes here
  server.route(require('./modules/user'));
};
