'use strict';

var mongoose = require('mongoose');

module.exports = function (config) {
  var db = mongoose.connect(config.mongo.uri, config.mongo.options, function (err) {
    if (err) {
      console.error('Could not connect to MongoDB!');
      console.log(err);
    }
  });

  mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
  });

  // Populate DB with sample data
  if (config.seedDB) {
    require('./seed');
  }

  return db;
};
