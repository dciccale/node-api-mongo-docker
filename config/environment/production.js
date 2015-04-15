'use strict';

// Production specific configuration
// =================================
var MONGO_ADDR = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost';
var MONGO_PORT = process.env.MONGO_PORT_27017_TCP_PORT || 27017;

module.exports = {

  // Server IP
  ip: process.env.IP || undefined,

  // Server port
  port: process.env.PORT || 8888,

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://' + MONGO_ADDR + ':' + MONGO_PORT + '/node-api-docker-boilerplate'
  },

  secrets: {
    session: process.env.SESSION_SECRET
  }
};
