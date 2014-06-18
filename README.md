# Waterlock Facebook Auth

[![Build Status](http://img.shields.io/travis/davidrivera/waterlock-facebook-auth.svg?style=flat)](https://travis-ci.org/davidrivera/waterlock-facebook-auth) [![NPM version](http://img.shields.io/npm/v/waterlock-facebook-auth.svg?style=flat)](http://badge.fury.io/js/waterlock-facebook-auth) [![Dependency Status](http://img.shields.io/gemnasium/davidrivera/waterlock-facebook-auth.svg?style=flat)](https://gemnasium.com/davidrivera/waterlock-facebook-auth)

waterlock-facebook-auth is a module for [waterlock](https://github.com/davidrivera/waterlock)
providing a facebook authentication method for users either based on username.

## Usage

```bash
npm install waterlock-facebook-auth
```

set the following option in your `waterlock.json` config file

```json
"authMethod":{
	"name": "waterlock-facebook-auth",
	"appKey": "your-app-key",
	"appSecret": "your-app-secret"
}
```

Direct your user to `/auth/login` will initiate the oauth request. The callback uri is `/auth/oauth2` if successfuly authenticated a user record will be created if a user is not found one will be created using the [waterlines](https://github.com/balderdashy/waterline) `findOrCreate` method