'use strict';

var path = require('path');
var FBOAuth2 = require('./fboauth2');

try{
  var configPath = path.normalize(__dirname+'/../../../config/waterlock.json');
  var config = require(configPath);
}catch(e){
  throw 'waterlock not installed';
}

exports.config = config;

exports.fb = new FBOAuth2(config.authMethod.appId, 
  config.authMethod.appSecret, config.baseUrl+'/auth/oauth2');

exports.actions = require('./controllers');

exports.model = require('./models');