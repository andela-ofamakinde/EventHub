"use strict";
require('../models/user.model');

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    config = require('../config/config'),
    bcrypt = require('bcrypt-nodejs'),
    User = mongoose.model('User'),
    populateQuery = [{ path: 'eventsCreated', select: 'title description category location' }, 
                    { path: 'eventsJoined', select: 'title description category location' }];

exports.createUser = function(req, res){
  var user = req.body;

  User.create(user, function(err, user) {
    if (err) {
    // duplicate entry
      if (err.code == 11000)
        return res.json({ success: false, message: 'A user with that email already exists. '});
      else
        return res.send(err);
    }
    res.send(user);
  });
};

exports.getAllUsers = function(req, res){
  User.find({})
    .populate(populateQuery)
    .exec(function(err, user) {
        if (err) {
            return res.send(err);
        }
        res.json(user);
    });
};

exports.getOneUser = function(req, res) {
  User.findOne({_id : req.params.userId})
    .populate(populateQuery)
    .exec(function(err, user) {
        if (err) {
            return res.send(err);
        }
        res.json(user);
    });
};

exports.deleteUser = function(req, res){
  User.remove({
       _id : req.params.userId
      },
    function(err, user){
      if (err){
        res.send(err);
      }
      res.json("User successfully deleted");
  });
};

exports.updateUser = function(req, res) {
  User.findById(req.params.userId, function(err, user){
    if (err){
      res.send(err);
    }
    if (req.body.firstname) user.firstname = req.body.firstname;
    if (req.body.lastname) user.lastname = req.body.lastname;
    if (req.body.email) user.email = req.body.email;  
    if (req.body.password) user.password = req.body.password;

    user.save(function(err){
      if (err) {
        res.send(err);
      }
      res.json(user);
    })
  });
};

exports.signIn = function(req, res){
  User.findOne({ email: req.body.email }, 
    function(err, user) {

      if (!user) {
        res.json({ success: false,
          message: 'Incorrect user email.' 
        });

      } else if (user) {
        var token = jwt.sign(user, config.secret, {
          expiresInMinutes : 1440
        });

        bcrypt.compare(req.body.password, user.password, function(err, valid){

          if (err){
            res.send(err);
          } 

          if (!valid) { 
            return res.status(401).send('Wrong Password');
          }
          else {
            res.json({
              success: true,
              message: 'Enjoy your token',
              token: token
            });
          }
        });
      }
  });
};