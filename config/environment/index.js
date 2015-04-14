'use strict';

var _ = require('lodash');

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Server port
  port: process.env.PORT || 9001,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'node-api-docker-boilerplate'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(all, all.env ? require('./' + all.env + '.js') : {});
