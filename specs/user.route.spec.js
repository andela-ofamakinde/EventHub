"use strict";
var mongoose = require('mongoose');
require('../routes');
var myApp = require('../server');
var tester = require('supertest')(myApp);
var user =mongoose.model('user');
var newUser;

describe('my api', function(){

  beforeEach(function(done){
    newUser = new user({
      firstname: 'olatoyosi',
      lastname: "fam",
      password: "sugar",
      email: "me@you.com"
    });
    newUser.save(function(err){
      if(err) {
        console.log(err);
      }
    });
    done();
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
      email: "me@you.com"
    };
    tester
    .post('/signUp')
    .send(newUser)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .end(function(err, res) {
    if(err) {
        console.log(err);
    }
    else{  
    expect(res.body).toEqual(jasmine.objectContaining(res));
    }
    done();
    });
  });

  it('should be able to get all users', function(done){
    tester
    .get('/getAllUser')
    .set('Accept', 'application/json')
    .expect('Content-Type', "text/html; charset=utf-8")
    .expect(200)
    .end(function(err, res) {
    if(err) {
        console.log(err);
    }
    else{  
    expect(res.body).toEqual(jasmine.objectContaining(res));
    }
    done();
    });
  });

});



