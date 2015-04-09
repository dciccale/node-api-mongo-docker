'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/node-api-docker-boilerplate-dev',
    port: 80
  },

  seedDB: true
};
