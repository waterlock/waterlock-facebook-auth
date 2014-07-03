var should = require('should');
var proxyquire =  require('proxyquire');

var pathStub = {
  normalize: function(str){
    return __dirname+"/waterlock.config.js";
  }
};

var wl = proxyquire.noCallThru().load('../lib/waterlock-facebook-auth', { 'path': pathStub});

describe('waterlock-facebook-auth', function(){
  it('should export actions', function(done){
    wl.should.have.property('actions');

    done();
  });
  it('should export a model', function(done){
    wl.should.have.property('model');
    done();
  });
  it('should export a fb instance', function(done){
    wl.should.have.property('fb');
    done();
  });
})