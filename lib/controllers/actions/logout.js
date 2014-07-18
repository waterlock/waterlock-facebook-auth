'use strict';

/**
 * Logout action
 */
module.exports = function (req, res, waterlock){
  waterlock.engine.logout(req, res);
};