'use strict';

var path = require('path');
var FBOAuth2 = require('./fboauth2');

exports.authType = 'facebook';

try{
  var configPath = path.normalize(__dirname+'/../../../config/waterlock.js');
  var config = require(configPath).waterlock;
}catch(e){
  throw 'waterlock not installed';
}

try{
  var blueprintsConfigPath = path.normalize(__dirname+'/../../../config/blueprints.js');
  var blueprintConfig = require(blueprintsConfigPath).blueprints;
}catch(e){
  //sometimes this happens
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

var fbOAth2Url;

if(blueprintConfig.pluralize){
  fbOAth2Url = '/auths/facebook_oauth2';
}else{
  fbOAth2Url = '/auth/facebook_oauth2';
}

exports.config = config;
exports.authConfig = method;
exports.fb = new FBOAuth2(method.appId,
  method.appSecret, config.baseUrl+fbOAuth2Url);

exports.actions = require('./controllers');

exports.model = require('./models');
