'use strict';

var request = require('request');
var querystring= require('querystring');

exports = module.exports = FBOAuth2;

/**
 * Facebook OAuth2 object, make various requests
 * the the graphAPI
 * @param {string} appId     the facebook app id
 * @param {string} appSecret the facebook app secret
 * @param {string} redirectURL  the url facebook should use as a callback
 */
function FBOAuth2(appId, appSecret, redirectURL){
  this._appId = appId;
  this._appSecret = appSecret;
  this._redirectURL = 'http://dev.festivaltribe.co.uk:4200/login';
  this._authURL = 'https://www.facebook.com/dialog/oauth';
  this._graphAPIURL = 'https://graph.facebook.com';
  this._accessTokenURI = '/oauth/access_token';
  this._profileURI = '/me';
}

/**
 * process user via access token
 * @return {string} facebook login uri
 */
FBOAuth2.prototype.processAccessToken = function(tokenString, cb){
  this.accessToken = this.toObject('access_token=' + tokenString);
  cb(null, this.accessToken);
};


/**
 * returns the login dialog uri
 * @return {string} facebook login uri
 */
FBOAuth2.prototype.getLoginDialogURI = function(){
  var redirect = arguments[0] || this._redirectURL;

  var params = {
    client_id: this._appId,
    redirect_uri: redirect,
    response_type: 'code',
    scope:'public_profile,email'
  };

  return this._authURL + '?' + this.toQuery(params);
};

/**
 * makes a request to the graph api to confirm the identity of a person trying
 * to login, prevents attackers from spoofing responses. Should be called
 * in the callback from the initial request.
 * @param  {string}   code encrypted string unique to each login request
 * @param  {Function} cb   the user defined callback when request is complete
 */
FBOAuth2.prototype.confirmIdentity = function(code, cb){
  var accessTokenURI = this._getAccessTokenURI(this._redirectURL, code);
  this._confirmCallback = cb;

  request(accessTokenURI, this._confirmIdentity.bind(this));
};

/**
 * wrapper for /me graph api call
 * @param  {Function} cb user defined callback
 */
FBOAuth2.prototype.getMe = function(cb){
  this.get(this._profileURI, cb);
};

/**
 * callback for the @confirmIdentity function, will trigger callback
 * @param  {object} err
 * @param  {object} response
 * @param  {string} body
 */
FBOAuth2.prototype._confirmIdentity = function(err, response, body){
  if(err){
    this._confirmCallback(err);
  }

  this.accessToken = this.toObject(body);
  this._confirmCallback(null, this.accessToken);
};

/**
 * wrapper function to get the access token uri with query params
 * @param  {string} redirect url
 * @param  {string} code     from the login response
 * @return {string}          the access token uri
 */
FBOAuth2.prototype._getAccessTokenURI = function(redirect, code){
  var _redirect = arguments[0] || this._redirectURL;

  var params = {
    client_id: this._appId,
    redirect_uri: _redirect,
    client_secret: this._appSecret,
    code: code
  };

  return this._graphAPIURL + this._accessTokenURI + '?' + this.toQuery(params);
};

/**
 * wrapper for querystring stringify
 * @param  {object} params
 * @return {string}        query string
 */
FBOAuth2.prototype.toQuery = function(params){
  return querystring.stringify(params);
};

/**
 * wrapper for querystring parse
 * @param  {string} str query string
 * @return {object}     object
 */
FBOAuth2.prototype.toObject = function(str){
  return querystring.parse(str);
};

/**
 * performs a GET request to the graph api
 * @param  {string}   uri uri to hit
 * @param  {Function} cb  user defined callback
 */
FBOAuth2.prototype.get = function(uri, cb){
  if(typeof this.accessToken === 'undefined'){
    cb('Access token does not exist!');
  }

  var url = this._graphAPIURL + uri + '?' + this.toQuery(this.accessToken);
  request(url, cb);
};
