'use strict';

module.exports = {
  facebookId: {
    type: 'integer',
    required: true,
    unique: true
  },
  name:{
    type: 'string'
  }
};