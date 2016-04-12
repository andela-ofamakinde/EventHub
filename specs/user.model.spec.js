"use strict";
require('../models/user.model');

var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/mydatabase');

var User = mongoose.model('User'),
    newUser;

describe('newUSsers model test', function() {

  beforeEach(function(done) {
    newUser = new User();
    done();
  });

  describe("Should not save if any of the fields are empty", function() {
    it('should throw an error', function(done){
      newUser.firstname = '';
      newUser.save(function(error){
        expect(error).not.toBeNull();
        console.log(error);
        done();
      });
    });
    it('should save newUser to database', function(done){
      newUser.firstname = 'toyosi';
      newUser.lastname = 'famakinde';
      newUser.email = 'me@gmail.com';
      newUser.password = 'sugar';
      newUser.save(function(error){
        expect(error).toBeNull();
        done();
      });
    });

  });
});
