'use strict';

var expect = require('chai').expect;
require('../../../');
var User = require('../../../lib/modules/user/user-model');

var fakeUser = {
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
};

var user;

describe('UserModel', function () {
  beforeEach(function (done) {
    user = new User(fakeUser);

    User.remove().exec().then(function () {
      done();
    });
  });

  afterEach(function (done) {
    User.remove().exec().then(function () {
      done();
    });
  });

  it('should begin with no users', function (done) {
    User.find({}, function (err, users) {
      expect(err).to.not.exist;
      expect(users.length).to.equal(0);
      done();
    });
  });

  it('should fail when saving a duplicate user', function (done) {
    user.save(function () {
      var userDup = new User(fakeUser);
      userDup.save(function (err) {
        expect(err).to.exist;
        done();
      });
    });
  });

  it('should fail when saving without an email', function (done) {
    user.email = '';
    user.save(function(err) {
      expect(err).to.exist;
      done();
    });
  });

  it('should fail if email is already taken', function (done) {
    user.save(function (err, user1) {
      var userSameEmail = new User(fakeUser);
      expect(user1.email).to.equal(userSameEmail.email);
      userSameEmail.save(function (err, user) {
        expect(err).to.exist;
        expect(err.errors.email.message).to.equal('The specified email address is already in use.');
        done();
      });
    });
  });

  it('should not fail if trying to save the same user', function (done) {
    user.save(function (err, user1) {
      var user2 = new User(user1);
      user2.save(function (err, user) {
        done();
      });
    });
  });

  it('should authenticate user if password is valid', function () {
    expect(user.authenticate(fakeUser.password)).to.equal(true);
  });

  it('should not authenticate user if password is invalid', function () {
    expect(user.authenticate('blah')).not.equal(true);
  });

  it('should get virtual password', function () {
    expect(user.password).to.equal(fakeUser.password);
  });

  it('should get virtual token info', function () {
    var tokenInfo = user.token;
    expect(tokenInfo._id).to.equal(user._id);
    expect(tokenInfo.role).to.equal(user.role);
  });
});
