var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
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
    // required: 'Please enter your password'
  }, 
  email: {
    type: String,
    // required: 'Please enter your email'
  },
  eventsCreated: [{
    type: Schema.ObjectId,
    ref: 'events'
  }],
  eventsJoined: [{
    type: Schema.ObjectId,
    ref: 'events'
  }]

});
exports.model = mongoose.model('user', userSchema);
