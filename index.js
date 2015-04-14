'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var Hapi = require('hapi');
var server = new Hapi.Server();
var mongoose = require('mongoose');
var config = require('./config/environment');

require('./db')(config);
server.connection({port: config.port});

require('./routes')(server);

server.start(function () {
  console.log('Server listening on %d, in %s mode', config.port, config.env);
});

module.exports = server;
