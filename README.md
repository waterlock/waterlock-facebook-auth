# Waterlock Facebook Auth

[![Build Status](http://img.shields.io/travis/davidrivera/waterlock-facebook-auth.svg?style=flat)](https://travis-ci.org/davidrivera/waterlock-facebook-auth) [![NPM version](http://img.shields.io/npm/v/waterlock-facebook-auth.svg?style=flat)](http://badge.fury.io/js/waterlock-facebook-auth) [![Dependency Status](http://img.shields.io/gemnasium/davidrivera/waterlock-facebook-auth.svg?style=flat)](https://gemnasium.com/davidrivera/waterlock-facebook-auth)

waterlock-facebook-auth is a module for [waterlock](http://waterlock.ninja/)
providing a facebook authentication method for users either based on username.

## Usage

```bash
npm install waterlock-facebook-auth
```

set the following option in your `waterlock.js` config file

```js
authMethod: [
	{
		name: "waterlock-facebook-auth",
		appId: "your-app-id",
		appSecret: "your-app-secret"
	}
]
```

Direct your user to `/auth/login?type=facebook` will initiate the oauth request. The callback uri is `/auth/facebook_oauth2` if successfuly authenticated a user record will be created if a user is not found one will be created using the [waterlines](https://github.com/balderdashy/waterline) `findOrCreate` method

If you are using sails blueprints and have pluralized your REST API you can configure waterlock to pluralize the auth endpoints by including pluralizeEndpoints=true in the waterlock.js file:

```js
module.exports.waterlock = {
  
  pluralizeEndpoints: true
  
}
```

### Grabbing Facebook field values

By default, waterlock-facebook-auth stores the user's `facebookId`, `name` and `email` in the Auth model. In reality, Facebook returns more data than that. 

To grab and store this, you will need to modify the add the fields in your `Auth.js` model...

```js
// api/models/Auth.js
module.exports = {
	attributes: require('waterlock').models.auth.attributes({
		firstName: 'string',
		lastName: 'string',
		gender: 'string',
		timezone: 'number'
	})
}
```

...and then add a `fieldMap` object within the facebook authMethod in your `waterlock.js` config file which matches your model's fields to facebook's fields.

```js
authMethod: [
	{
		name: "waterlock-facebook-auth",
		appId: "your-app-id",
		appSecret: "your-app-secret",
		fieldMap: {
			// <model-field>: <facebook-field>,
			'firstName': 'first_name',
			'lastName': 'last_name',
			'gender': 'gender',
			'timezone': 'timezone'
		}
	}
]
```