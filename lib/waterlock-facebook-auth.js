'use strict';

var path = require('path');
var FBOAuth2 = require('./fboauth2');

exports.authType = 'facebook';

try{
  var configPath = path.normalize(__dirname+'/../../../config/waterlock.json');
  var config = require(configPath);
}catch(e){
  throw 'waterlock not installed';
}
var method = {};
if(typeof config.authMethod[0] === 'object'){
  for(var i = 0; i < config.authMethod.length; i++){
    if(config.authMethod[i].name === 'waterlock-facebook-auth'){
      method = config.authMethod[i];
    }
  }
}else{
  method = config.authMethod;
}

exports.config = config;
exports.authConfig = method;
exports.fb = new FBOAuth2(method.appId, 
  method.appSecret, config.baseUrl+'/auth/facebook_oauth2');

exports.actions = require('./controllers');

exports.model = require('./models');