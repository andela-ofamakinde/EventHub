var mongoose = require('mongoose');
require('../routes');
var myApp = require('../server');
var tester = require('supertest')(myApp);
var user =mongoose.model('user');
var newUser;

describe('my api', function(){

  beforeEach(function(){
    newUser = new user({
      firstname: 'olatoyosi',
      lastname: "fam",
      password: "sugar",
      email: "me@you.com",
    });
  });

  it('should return an error message for a non existing route', function(done){
    tester
    .get('/errorroute')
    .expect(404, 'Cannot GET /errorroute\n');
    done();
  });

  it('should create a user',function(done){
    newUser = {
      firstname: 'olatoyosi',
      lastname: "fam",
      password: "sugar",
      email: "me@you.com",
    };
    tester
    .post('/signUp')
    .send(newUser)
    .expect(201);
    done();
  });
});



