/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../lib/modules/user/user-model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
    role: 'admin'
  }, function() {
      console.log('> Finished populating users');
    }
  );
});
