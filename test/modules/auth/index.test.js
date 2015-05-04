'use strict';

var expect = require('chai').expect;
var _ = require('lodash');
var request = require('supertest');

var basePath = '../../..';
var server = require(basePath + '/lib/');
var UserModel = require(basePath + '/lib/modules/user/user-model');
var config = require(basePath + '/config/environment');

describe('Auth strategy', function () {

  request = request('http://localhost:' + config.port);

  var fakeUser = {
    name: 'Fred',
    email: 'fred@test.com',
    password: 'test',
    provider: 'local'
  };

  var testUser = {};
  var token = '';

  beforeEach(function (done) {
    testUser = _.cloneDeep(fakeUser);
    var newUser = new UserModel(testUser);
    newUser.save(function () {
      done();
    });
  });

  afterEach(function (done) {
    UserModel.remove().exec().then(function () {
      done();
    });
  });

  describe('simple strategy', function () {
    it('should validate user login', function (done) {
      server.inject({
        method: 'GET',
        url: '/users/me'
      }, function (res) {
        expect(res.statusCode).to.equal(401);
        done();
      });
    });

    it('should validate user login', function (done) {
      server.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: testUser.email,
          password: testUser.password
        }
      }, function (res) {
        expect(res.statusCode).to.equal(200);
        expect(res.result.token).to.exist;
        done();
      });
    });

    it('should validate user token', function (done) {
      server.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: testUser.email,
          password: testUser.password
        }
      }, function (res) {
        expect(res.statusCode).to.equal(200);
        expect(res.result.token).to.exist;

        server.inject({
          method: 'GET',
          url: '/users/me',
          headers: {
            authorization: 'Bearer ' + res.result.token
          }
        }, function (res) {
          expect(res.result.name).to.equal('Fred');
          done();
        });
      });
    });
  });

});
