'use strict';

var expect = require('chai').expect;
require('../../../');
var UserModel = require('../../../modules/user/user-model');
var UserService = require('../../../modules/user/user-service');
var commonErrorTypes = require('../../../common-error-types');
var userErrorTypes = require('../../../modules/user/user-error-types');

describe('UserService', function () {

  beforeEach(function(done) {
    this.userService = new UserService(UserModel, commonErrorTypes, userErrorTypes);
    done();
  });

  describe('get()', function () {
    it('should list all users', function (done) {
      this.userService.get()
        .then(function (users) {
        expect(users.length).to.equal(0);
        done();
      });
    });
  });

  describe('create()', function () {
    it('should create a user', function (done) {
      this.userService.create({
        name: 'Denis',
        email: 'asd@asd.com',
        password: 'asd'
      })
      .then(function (res) {
        expect(res.token).to.exist;
        done();
      })
      .catch(userErrorTypes.ValidationError, function () {
        done();
      })
    });

    it('should handle error when creating a user', function (done) {
      this.userService.create({
        name: 'Denis'
      })
      .catch(userErrorTypes.ValidationError, function (err) {
        done();
      })
    });
  })
});
