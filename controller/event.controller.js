"use strict";
var mongoose = require('mongoose');
var Event = require('../models/event.model').Events;
var _ = require('lodash');

require('../models/user.model');
var User = mongoose.model('User');
// var JoinedUser = mongoose.model('JoinedUser');

exports.createEvent = function(req, res){
  Event.create(req.body, function(err, event){
    if (err){
      res.send(err);
    } else {
        User.findById(event.userId, function(err, user) {
        if (err) {
          res.send(err);
        }
        user.eventsCreated.push(event._id);
        user.save(function(err) {
          res.json(event);
        });
      });
    }
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
  Event.findById(req.params.event_id, function(err , event) {
    if(err){
      res.send(err);
    }

    event.title = req.body.title;
    event.description = req.body.description;

    event.save(function(err){
      if (err){
        res.send(err);
      }
      res.json(event);
    });
  });

};

exports.joinEvent = function(req, res) {

  Event.findById(req.params.event_id, function(err, events) {
    
    if(err) return err;
    if(events.joinedUsers.length === 0){
      events.joinedUsers.push(req.body);
      events.save(function(err){
        if (err){
          res.send(err);
        }
        res.json(events);
        });
    }
    else {
      if(!_.result(_.find(events.joinedUsers, req.body), 'user')){
            events.joinedUsers.push(req.body);
            events.save(function(err){
              if (err){
                res.send(err);
              }
              res.json(events);
            });
          }
          else return res.json('userId exist');
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


