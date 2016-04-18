"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  startDate: {
    type: Date
    // required: 'Please enter the date'
  },
  endDate: {
    type: Date
    // required: 'Please enter the end date'
  },
  category: {
    type: String,
    required: 'Please enter the category'
  },
  location: {
    type: String,
    required: 'Please enter the location'
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Event', eventSchema);
