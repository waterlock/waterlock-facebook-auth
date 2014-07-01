var model = require('../../lib/models/').auth.attributes;

describe('model', function(){
  it('should be an object', function(done){
    model.should.be.Object;
    done();
  }); 
  it('should have a facebookId', function(done){
    model.should.have.property('facebookId');
    done();
  });
  it('should have a name', function(done){
    model.should.have.property('name');
    done();
  });
});