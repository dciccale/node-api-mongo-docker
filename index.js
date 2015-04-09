'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var Hapi = require('hapi');
var server = new Hapi.Server();
var mongoose = require('mongoose');
var config = require('./config/environment');

mongoose.connect(config.mongo.uri, config.mongo.options);
server.connection({port: config.port});

require('./routes')(server);

server.start(function () {
  console.log('Server running at:', server.info.uri);
});

module.exports = server;
