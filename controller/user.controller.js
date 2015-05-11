var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

require('../models/user.model');
var User = mongoose.model('user');

exports.createUser = function(req, res){
  console.log(req.body);
  var user = req.body;
  user.token = jwt.sign(user, config.secret);

  User.create(user, function(err, user){
    if(err){
      res.send(err);
    }
    res.json(user);
  });
};

exports.signIn = function(req, res){
  User.findOne({email: req.body.email, password: req.body.password}, 
    function(err, user) {
      if (err){
        res.send(err);
      } 

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. Incorrect email/password.' });
      } else if (user) {
        res.json({
          success: true,
          message: 'Enjoy your token',
          token: user.token
        });
      }
  });
};

exports.getAllUser = function(req, res){
  User.find(function(err, user){
    if (err){
      return res.send(err);
    }
    res.json(user);
  });
};

exports.getOneUser = function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err){
      res.send(err);
    }
      res.json(user);
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

exports.ensureAuthorized = function(req, res, next) {
  
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });

  } else {
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.' 
    });
  }
};