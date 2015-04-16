'use strict';

var expect = require('chai').expect;

var server = require('../../../');
var UserModel = require('../../../lib/modules/user/user-model');
var UserService = require('../../../lib/modules/user/user-service');
var UserController = require('../../../lib/modules/user/user-controller');
var commonErrorTypes = require('../../../lib/common-error-types');
var userErrorTypes = require('../../../lib/modules/user/user-error-types');

describe('UserController', function () {
  var noop = function () {};
  var testUser = {
    name: 'Test',
    email: 'test@test.com',
    password: '123456',
    provider: 'local',
    role: 'user'
  };
  var fakeId = '5526709bde9252a349e5a054';

  beforeEach(function (done) {
    // Clear users before testing
    UserModel.remove().exec().then(function () {
      var userService = new UserService(UserModel, commonErrorTypes, userErrorTypes);
      this.userController = new UserController(userService, commonErrorTypes, userErrorTypes);
      done();
    }.bind(this))
  });

  describe('index()', function () {
    it('should reply a list of users', function (done) {
      this.userController.index(noop, function () {
        done();
      });
    });
  });

  describe('create()', function () {
    it('should create a user', function (done) {
      this.userController.create({payload: testUser}, function (data) {
        expect(data.token).to.exist;
        done();
      });
    });

    it('should give a validation error if password missing', function (done) {
      this.userController.create({payload: {
        name: 'Test',
        email: 'test@test.com'
      }}, function (data) {
        expect(data.output.statusCode).to.equal(422);
        expect(data.output.payload.message).to.equal('Error: Invalid password');
        done();
      });
    })
  });

  describe('show()', function () {
    it('should retrieve user profile info by id', function (done) {
      var newUser = new UserModel(testUser);
      newUser.save(function (err, user) {
        this.userController.show({params: {id: user._id}}, function (data) {
          expect(data.name).to.equal('Test');
          expect(data.role).to.equal('user');
          done();
        });
      }.bind(this));
    });

    it('should give an error if profile by id not found', function (done) {
      var newUser = new UserModel(testUser);
      this.userController.show({params: {id: fakeId}}, function (data) {
        expect(data.output.statusCode).to.equal(404);
        expect(data.output.payload.message).to.equal('Unable to find user');
        done();
      });
    });

    it('should give an error if the query is bad', function (done) {
      var newUser = new UserModel(testUser);
      this.userController.show({params: {id: 3}}, function (data) {
        expect(data.output.statusCode).to.equal(500);
        expect(data.output.payload.message).to.equal('An internal server error occurred');
        done();
      });
    });
  });

  describe('destroy()', function () {
    it('should remove a user', function (done) {
      var replyCode = function () {
        return {
          code: function (code) {
            expect(code).to.equal(204);
            done();
          }
        }
      };

      var newUser = new UserModel(testUser);
      newUser.save(function (err, user) {
        this.userController.destroy({params: {id: user._id}}, replyCode);
      }.bind(this));

    });

    it('should fail to remove a user if no valid data passed', function (done) {
      var newUser = new UserModel(testUser);
      newUser.save(function (err, user) {
        this.userController.destroy({params: {id: 3}}, function (data) {
          expect(data.output.statusCode).to.equal(500);
          expect(data.output.payload.message).to.equal('An internal server error occurred');
          done();
        });
      }.bind(this));

    });
  });

  describe('changePassword()', function () {
    it('should change a user password', function (done) {
      var newUser = new UserModel(testUser);
      newUser.save(function (err, user) {
        this.userController.changePassword({
          user: user,
          payload: {
            oldPassword: testUser.password,
            newPassword: 'newpassword'
          }
        }, function () {
          done();
        });
      }.bind(this));

    });

    it('should give an error if old password is wrong', function (done) {
      var newUser = new UserModel(testUser);
      newUser.save(function (err, user) {
        this.userController.changePassword({
          user: user,
          payload: {
            oldPassword: 'wrongOldPassword',
            newPassword: 'newpassword'
          }
        }, function (data) {
          expect(data.output.statusCode).to.equal(401);
          expect(data.output.payload.message).to.equal('Authentication error');
          done();
        });
      }.bind(this));

    });

    it('should give an error if new password is invalid', function (done) {
      var newUser = new UserModel(testUser);
      newUser.save(function (err, user) {
        this.userController.changePassword({
          user: user,
          payload: {
            oldPassword: testUser.password,
            newPassword: ''
          }
        }, function (data) {
          expect(data.output.statusCode).to.equal(422);
          expect(data.output.payload.message).to.equal('ValidationError: Password cannot be blank');
          done();
        });
      }.bind(this));

    });
  });

  describe('me()', function () {
    it('should show my info', function (done) {
      var newUser = new UserModel(testUser);
      newUser.save(function (err, user) {
        this.userController.me({user: user}, function (data) {
          expect(data.name).to.equal(user.name);
          expect(data.email).to.equal(user.email);
          done();
        });
      }.bind(this));
    });

    it('should give an error if user not found by specified id', function (done) {
      this.userController.me({user: {_id: fakeId}}, function (data) {
        expect(data.output.statusCode).to.equal(404);
        expect(data.output.payload.message).to.equal('Unable to find user');
        done();
      });
    });

    it('should give an error if bad arguments passed', function (done) {
      this.userController.me({user: {_id: 3}}, function (data) {
        expect(data.output.statusCode).to.equal(500);
        expect(data.output.payload.message).to.equal('An internal server error occurred');
        done();
      });
    });
  });

});
