'use strict';
 
 var fb = require('../../waterlock-facebook-auth').fb;

/**
 * Login action
 */
module.exports = function(req, res, waterlock){
  global.authEvent = waterlock.authEvent;
  res.redirect(fb.getLoginDialogURI());
};