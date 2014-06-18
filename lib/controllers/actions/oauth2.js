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
      res.json(500);
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
      res.json(500);
    } else {
      var _data = JSON.parse(body);
      var attr = {
        facebookId: _data.id,
        name: _data.name
      };

      User.findOrCreate({facebookId: attr.facebookId}, attr)
      .done(userFoundOrCreated);
    }  
  }

  /**
   * [userFoundOrCreated description]
   * @param  {[type]} err  [description]
   * @param  {[type]} user [description]
   * @return {[type]}      [description]
   */
  function userFoundOrCreated(err, user){
    if(err){
      // ensure your using username instead of email
      console.log(err);
    }

    // log the attempt 
    // TODO: refactor this into waterlock
    var attempt = {user:user.id, ip: req.connection.remoteAddress, successful: true};
    Attempt.create(attempt).done(function(){});

    req.session.user = user;
    req.session.authenticated = true;
    res.json(user);
  }
};