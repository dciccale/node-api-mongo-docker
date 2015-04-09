/*
 * Common error types
 */

'use strict';

var util = require('util');

var CommonErrors = {
  /**
   * User not found
   */
  QueryError: function (msg) {
    this.name = 'QueryError';
    this.message = msg || 'Bad query';
  }
};

util.inherits(CommonErrors.QueryError, Error);

module.exports = CommonErrors;
