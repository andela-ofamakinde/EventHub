"use strict";
require('../models/user.model');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase');

var user = mongoose.model('user'),
    User;

describe('Users model test', function() {

  beforeEach(function(done) {
    User = new user();
    done();
  });

  describe("Should not save if any of the fields are empty", function() {
    it('should throw an error', function(done){
      User.firstname = '';
      User.save(function(error){
        expect(error).not.toBeNull();
        console.log(error);
        done();
      });
    });
    it('should save User to database', function(done){
      User.firstname = 'toyosi';
      User.lastname = 'famakinde';
      User.email = 'me@gmail.com';
      User.password = 'sugar';
      User.save(function(error){
        expect(error).toBeNull();
        done();
      });
    });

  });
});
