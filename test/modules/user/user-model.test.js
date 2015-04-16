'use strict';

var expect = require('chai').expect;
require('../../../');
var User = require('../../../lib/modules/user/user-model');

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

describe('UserModel', function () {
  beforeEach(function (done) {
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
      var userDup = new User(user);
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

  it('should authenticate user if password is valid', function () {
    return expect(user.authenticate('password')).to.equal(true);
  });

  it('should not authenticate user if password is invalid', function () {
    return expect(user.authenticate('blah')).not.equal(true);
  });
});
