'use strict';

var expect = require('chai').expect;
var _ = require('lodash');

var basePath = '../../../..';
var server = require(basePath + '/lib');
var UserModel = require(basePath + '/lib/modules/user/user-model');
var LoginController = require(basePath + '/lib/modules/auth/login/login-controller');

describe('LoginController', function () {
  var fakeLogin = {
    email: 'test@test.com',
    password: 'test'
  };
  var fakeReq = {payload: {}};

  beforeEach(function (done) {
    fakeReq.payload = _.cloneDeep(fakeLogin);
    this.loginController = new LoginController();
    UserModel.remove().exec().then(function () {
      var newUser = new UserModel({
        name: 'Test',
        email: 'test@test.com',
        password: 'test',
        provider: 'local'
      });
      newUser.save(function () {
        done();
      });
    }.bind(this));
  });

  afterEach(function (done) {
    UserModel.remove().exec().then(function () {
      done();
    });
  });

  describe('login()', function () {
    it('should authenticate a user', function (done) {
      this.loginController.login(fakeReq, function (res) {
        expect(res.token).to.exist;
        done();
      });
    });

    it('should fail authentication if wrong password', function (done) {
      fakeReq.payload.password = 'wrong';
      this.loginController.login(fakeReq, function (res) {
        expect(res.output.statusCode).to.equal(401);
        expect(res.output.payload.message).to.equal('This password is not correct.');
        done();
      });
    });

    it('should fail authentication if user do not exist', function (done) {
      fakeReq.payload.email = 'no@exist.com';
      this.loginController.login(fakeReq, function (res) {
        expect(res.output.statusCode).to.equal(401);
        expect(res.output.payload.message).to.equal('This email is not registered.');
        done();
      });
    });
  });

});
