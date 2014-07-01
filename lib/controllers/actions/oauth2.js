'use strict';

var fb = require('../../waterlock-facebook-auth').fb;

/**
 * Oauth action
 */
module.exports = function (req, res){
  fb.confirmIdentity(req.query.code, accessTokenResponse);


  /**
   * [accessTokenResponse description]
   * @param  {[type]} error                  [description]
   * @param  {[type]} accessToken       [description]
   */
  function accessTokenResponse(error, accessToken){
    if (error && typeof accessToken !== 'undefined') {
      console.log(error);
      res.serverError();
    } else {
      fb.getMe(userInfoResponse);
    }
  }

  /**
   * [userInfoResponse description]
   * @param  {[type]} error    [description]
   * @param  {[type]} data     [description]
   * @param  {[type]} response [description]
   * @return {[type]}          [description]
   */
  function userInfoResponse(error, response, body){
    if (error) {
      console.log(error);
      res.serverError();
    } else {
      var _data = JSON.parse(body);
      var attr = {
        facebookId: _data.id,
        name: _data.name
      };
      
      global.authEvent.findOrCreate({facebookId: attr.facebookId}, attr, req.session.user, userFound);
    }  
  }

  function userFound(err, user){
    var authEvent = global.authEvent;
    if(err){
      // ensure your using username instead of email
      console.log(err);
      authEvent.loginFailure(req, res, null, {error: 'trouble creating model'});
    }
    
    authEvent.loginSuccess(req, res, user);
  }
};