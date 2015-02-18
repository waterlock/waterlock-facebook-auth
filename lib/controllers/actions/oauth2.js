'use strict';

var _ = require('lodash');

var authConfig = require('../../waterlock-facebook-auth').authConfig;
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
      waterlock.logger.debug(error);
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
      waterlock.logger.debug(error);
      res.serverError();
    } else {
      var _data = JSON.parse(body);
      
      if(_data.error){
        waterlock.logger.debug(_data);
        res.serverError(_data.error);
      }
      
      var attr = {
        facebookId: _data.id,
        name: _data.name,
        email: _data.email
      };

      var fieldMap = authConfig.fieldMap || {};

      _.each(fieldMap, function(val, key) {
        if (!_.isUndefined(_data[val])) {
          attr[key] = _data[val];
        }
      });

      if(req.session.authenticated){
        attr['user'] = req.session.user.id;
        waterlock.engine.attachAuthToUser(attr, req.session.user, userFound);  
      }else{
        waterlock.engine.findOrCreateAuth({facebookId: attr.facebookId}, attr, userFound);
      }
    }  
  }

  /**
   * [userFound description]
   * @param  {[type]} err  [description]
   * @param  {[type]} user [description]
   * @return {[type]}      [description]
   */
  function userFound(err, user){
    if(err){
      // ensure your using username instead of email
      waterlock.logger.debug(err);
      waterlock.cycle.loginFailure(req, res, null, {error: 'trouble creating model'});
    }
    
    waterlock.cycle.loginSuccess(req, res, user);
  }
};
