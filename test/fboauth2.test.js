var should = require('should');
var proxyquire = require('proxyquire');

var FBOAuth2 = proxyquire('../lib/fboauth2',{
  request: function(a, cb){
    cb(true);
  }
});

describe('FBOAuth2', function(){
  it('should create an fboauth instance', function(done){
    var fb = new FBOAuth2('foo','bar','faz');
    fb.should.be.instanceOf(FBOAuth2);
    done();
  });

  describe('getLoginDialogURI', function(){
    it('should return login uri', function(done){
      var fb = new FBOAuth2('foo','bar','faz');
      var uri = fb.getLoginDialogURI();
      uri.should.be.ok;
      done();
    });
  });

});