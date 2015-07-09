/**
 * Watch files and restart the server
 * Should only be used for development mode
 * Run:
 * $ node start
 */

'use strict';

var path = require('path');
var gaze = require('gaze');
var spawn = require('child_process').spawn;

var server;

// Watch files
gaze(['./lib/**/*.js', './config/**/*.js'], function (err) {
  if (err) {
    throw err;
  }
  this.on('all', function (event, filePath) {
    console.log(path.relative(__dirname, filePath), 'was', event, 'restarting server...');
    start();
  });
});

function exit() {
  server && server.kill();
}

function start() {
  // Kill if already running
  if (server) {
    server.kill('SIGKILL');
    server = null;
  }

  server = spawn(process.execPath, ['index']);
  server.stdout.setEncoding('utf8');
  server.stderr.setEncoding('utf8');

  server.stdout.on('data', function (data) {
    console.log(data.trim());
  });

  server.stderr.on('data', function (data) {
    console.error(data.trim());
  });

  server.once('exit', function (code, sig) {
    if (sig !== 'SIGKILL') {
      process.exit(0);
    }
  });

  process.listeners('exit') || process.once('exit', exit);
}

// Start server
start();
