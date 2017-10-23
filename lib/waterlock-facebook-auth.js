'use strict';

var path = require('path');
var FBOAuth2 = require('./fboauth2');

exports.authType = 'facebook';

try {
	var configPath = path.normalize(__dirname + '/../../../config/waterlock.js');
	var config = require(configPath)
		.waterlock;
} catch (e) {
	throw 'waterlock not installed';
}

var method = {};
if (typeof config.authMethod[0] === 'object') {
	for (var i = 0; i < config.authMethod.length; i++) {
		if (config.authMethod[i].name === 'waterlock-facebook-auth') {
			method = config.authMethod[i];
		}
	}
} else {
	method = config.authMethod;
}

if (method.redirectUri) {
	method.fbOAuth2Url = method.redirectUri;
} else {
	if (config.pluralizeEndpoints) {
		method.fbOAuth2Url = config.baseUrl + '/auths/facebook_oauth2';
	} else {
		method.fbOAuth2Url = config.baseUrl + '/auth/facebook_oauth2';
	}
}

exports.config = config;
exports.authConfig = method;
exports.fb = new FBOAuth2(method);

exports.actions = require('./controllers');

exports.model = require('./models');
