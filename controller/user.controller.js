var mongoose = require('mongoose');

require('../models/user.model');
var User = mongoose.model('user');

exports.createUser = function(req, res){
  console.log(req.body);
  User.create(req.body, function(err, user){
    if(err){
      res.send(err);
    }
    res.json(user);
  });
};

exports.getAllUser = function(req, res){
  User.find(function(err, user){
    if (err){
      return res.send(err);
    }
    res.json({success: 'All users displayed'});
  });
};

exports.getOneUser = function(req, res) {
  Event.findById(req.params.user_id, function(err, user) {
    if (err){
      res.send(err);
    }
      res.json({success : 'This is the single user'});
  });
};

exports.deleteUser = function(req, res){
  User.remove({
       _id : req.params.user_id
      },
    function(err, user){
      if (err){
        res.send(err);
      }
      res.json(user);
  });
};