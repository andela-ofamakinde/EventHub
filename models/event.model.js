"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var joinedUserSchema = new Schema ({
  user: {
    type: String,
    unique: true
  }
});

var eventSchema = new Schema({
  title: {
    type: String,
    required: 'Please Enter the event title',
    unique: true
  },
  description: {
    type: String,
    required: 'Please enter a brief description'
  },
  startdate: {
    type: Date,
    required: 'Please enter the date'
  },
  enddate: {
    type: Date,
    required: 'Please enter the end date'
  },
  category: {
    type: String,
    required: 'Please enter the category'
  },
  location: {
    type: String,
    required: 'Please enter the location'
  },
  userId: {
    type: Schema.ObjectId, 
    ref: 'User',
    required: "Please enter the user ID"
  },
  joinedUsers: [joinedUserSchema]
  
});

module.exports = {
  Events:    mongoose.model('Events', eventSchema)
};