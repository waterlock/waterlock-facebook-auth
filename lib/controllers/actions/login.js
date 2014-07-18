'use strict';
 
 var fb = require('../../waterlock-facebook-auth').fb;

/**
 * Login action
 */
module.exports = function(req, res){
  res.redirect(fb.getLoginDialogURI());
};