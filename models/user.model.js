"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  firstname: {
    type: String,
    // required: 'Please type in your first name'
  },
  lastname: {
    type: String,
    // required: 'Please enter your lastname'
  },
  password: {
    type: String,
    required: 'Please enter your password'
  }, 
  email: {
    type: String,
    required: 'Please enter your email',
    unique: true,
    index: { unique: true },
    dropDups: true
  },
  eventsCreated: [{
    type: Schema.ObjectId,
    ref: 'Event'
  }],
  eventsJoined: [{
    type: Schema.ObjectId,
    ref: 'Event'
  }]

});

UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, null, null, function(err, hash) { 
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password) { 
  var user = this;
  return bcrypt.compareSync(password, user.password);
};

exports.model = mongoose.model('User', UserSchema);
