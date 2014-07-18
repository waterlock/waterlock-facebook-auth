'use strict';

var _ = require('lodash');

exports.attributes = function(attr){
  var template = {
    facebookId: {
      type: 'integer',
      unique: true
    },
    name:{
      type: 'string'
    }
  };

  _.merge(template, attr);
  _.merge(attr, template);
};