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
  Event.findOne({_id : req.params.eventId})
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
      User.findOne({_id : req.params.userId})
      .where("eventsJoined")
      .in([req.body.eventId])
      .exec(function(err, user){
        if (err) {
          return res.send(err);
        }
        if (user) {
          return res.send("You already joined");
        }
        pushToJoinedEvents(req, res, req.params.userId, events);
        });
    }
  });
};

exports.leaveEvent = function(req, res) {
  Event.findById(req.body.eventId, function(err, events) {
    if (err){
      res.send(err);
    }
    else {
      User.findOne({_id : req.params.userId})
      .where("eventsJoined")
      .in([req.body.eventId])
      .exec(function(err, user){
        if (err) {
          return res.send(err);
        }
        if(!user) {
          res.send("You were not added to this event")
        }
        if (user) {
          user.eventsJoined.pop(events);
          user.save(function(err) {
            if (err) {                            
              res.send(400, { message: 'Error when trying to leave event ' + err});
            }
            res.send("You have left this event successfully");
          });
        }
      });
    }
  });
};

var pushToJoinedEvents = function(req, res, userId, events) {
  User.findOne({_id : userId}, function(err, new_user){
    if (err){
      res.send(err);
    }
    new_user.eventsJoined.push(events);
    new_user.save(function(err, user) {
      if (err) {                            
        res.send(400, { message: 'Error when trying to join event ' + err});
      }
      res.send("You have joined this event successfully");
    });
  });
};
