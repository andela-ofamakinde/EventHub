"use strict";
var mongoose = require('mongoose');
var Event = require('../models/event.model').Events;
var _ = require('lodash');

require('../models/user.model');
var User = mongoose.model('User');

exports.createEvent = function(req, res){
  Event.create(req.body, function(err, event){
    if (err){
      res.send(err);
    }
    res.json(event);
  });
};

exports.getUserEvents = function(req, res) {
  var userid = req.params.userid;
  Event.find({userId: userid}).populate('userId').exec(function(err, events) {
    if (err) {
      return res.json(err);
    }
    res.json(events);
  });
};

exports.getEventsJoined = function(req, res) {
  Event.find({joinedUsers: req.params.userid}).exec(function(err, events){
    if(err){
      return res.json(err);
    }
    res.json(events);
  });
};

exports.getAllEvents = function(req, res){
  Event.find(function(err, events){
    if (err){
      res.send(err);
    }
    res.json(events);
  });
};

exports.getOneEvent = function(req, res) {
  Event.findById(req.params.event_id, function(err, event) {
    if (err){
      res.send(err);
    }
      res.json(event);
  });
};

exports.updateEvent = function(req, res) {
  Event.update({_id: req.params.event_id}, req.body, function(err, events) {
    if(err) {
      res.send(err);
    }
    res.json(events);
  });
};

exports.joinEvent = function(req, res) {
  Event.findById(req.params.event_id, function(err, event) {
    if (err) {
      res.json(err);
    }
    var added = event.joinedUsers.addToSet(req.user._id);
    if (!added.length) {
      res.status(400).json({'message': 'duplicate userid'});
    } else {
      event.save(function(err, event) {
        if (err) {
          res.json(err);
        }
        res.json(event);
      });
    }
  });
};

exports.deleteEvent = function(req, res) {
  Event.remove({ _id : req.params.event_id}, function(err, event){
    if(err) {
      res.send(err);
    }
    res.json({ message: ' Event Successfully deleted' });
  });
};

exports.viewUsers = function(req, res) {
  Event.findById(req.params.event_id, function(err , event) {
    if(err){
      res.send(err);
    }
    res.send(event.joinedUsers);
  });
};


