'use strict';

/**
 * [login description]
 * @type {[type]}
 */
exports.login = require('./actions/login');

/**
 * [logout description]
 * @type {[type]}
 */
exports.logout = require('./actions/logout');

/**
 * [oauth description]
 * @type {[type]}
 */
exports.extras = {
  facebook_oauth2: require('./actions/oauth2'),
  facebook_access_token: require('./actions/access_token')
};
