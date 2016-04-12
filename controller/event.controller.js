"use strict";
require('../models/event.model');
require('../models/user.model');

var mongoose = require('mongoose'),
    _ = require('lodash'),
    Event = mongoose.model("Event"),
    User = mongoose.model("User"),
    populateQuery = [{ path: 'createdBy', select: 'firstname lastname email' }];

exports.createEvent = function(req, res){
  var newEvent = new Event({
    title : req.body.title,
    description : req.body.description,
    startDate : req.body.startDate,
    endDate : req.body.endDate,
    category : req.body.category,
    location : req.body.location,
    createdBy: req.params.userId
  });

  newEvent.save(function(err, event){
    if (err) {
      return res.send(err);
    }
    User.findById(req.params.userId, function(err, user) {
      if (err){
        res.send(err);
      }
      user.eventsCreated.push(event);
      user.save(function(err) {
        if (err) {                            
          res.json(400, { message: 'Error while creating event ' + err});
        }
      });
    });
    res.send(event);
  });
};

exports.getAllEvents = function(req, res){
  Event.find({})
    .populate(populateQuery)
    .exec(function(err, events) {
        if (err) {
            return res.send(err);
        }
        res.json(events);
    });
};

exports.getOneEvent = function(req, res) {
  Event.findById({_id : req.params.eventId})
    .populate(populateQuery)
    .exec(function(err, events) {
      if (err) {
        return res.send(err);
      }
      res.json(events);
      });
};

exports.updateEvent = function(req, res) {
  Event.findById(req.params.eventId, function(err , events) {
    if(err){
      res.send(err);
    }

    if (req.body.title) events.title = req.body.title;
    if (req.body.description) events.description = req.body.description;
    if (req.body.location) events.location = req.body.location;  
    if (req.body.category) events.category = req.body.category;
    if (req.body.startdate) events.startdate = req.body.startdate;
    if (req.body.enddate) events.enddate = req.body.enddate;

    events.save(function(err){
      if (err){
        res.send(err);
      }
      res.json(events);
    });
  });

};

exports.deleteEvent = function(req, res) {
  Event.remove({ _id : req.params.eventId}, function(err, events){
    if(err) {
      res.send(err);
    }
    res.json({ message: ' Event Successfully deleted' });
  });
};

exports.joinEvent = function(req, res) {
  Event.findById(req.body.eventId, function(err, events) {
    if (err){
      res.send(err);
    }
    else {
      User.findById(req.params.userId, function(err, user) {
        if (err){
          res.send(err);
        }
        user.eventsJoined.push(events);
        user.save(function(err) {
          if (err) {                            
            res.json(400, { message: 'Error when trying to event ' + err});
          }
          res.json(events);
        });
      });
    }
  });
}
