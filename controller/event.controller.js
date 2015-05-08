var mongoose = require('mongoose');
var Event = require('../models/event.model').events;
//var Event = mongoose.model('events'),
_ = require('lodash');

var JoinedUser = mongoose.model('joinedUser');

exports.createEvent = function(req, res){
  console.log('welcome');
  Event.create(req.body, function(err, events){
    if (err){
      res.send(err);
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
      res.json({message : 'event updated'});
    });
  });

};

exports.joinEvent = function(req, res) {
  // Event.findByIdAndUpdate(req.params.event_id, { joinedUsers: { $addToSet: req.body}}, function(err, event) {
  //   console.log(err)
  //   console.log(event)
  // });
  Event.findById(req.params.event_id, function(err, events) {
    
    if(err) return err;
    console.log(events, 'can join eventsss');
    console.log(events.joinedUsers);
    if(events.joinedUsers.length == 0){
      console.log( req.body );
       events.joinedUsers.push(req.body);
      events.save(function(err){
        if (err){
          res.send(err);
        }
        res.json(events);
        });
    }
    else{
      //console.log( "added");
      if(!_.result(_.find(events.joinedUsers, req.body), 'user')){
        console.log('asdgfhg');
        
            events.joinedUsers.push(req.body);
            events.save(function(err){
              if (err){
                res.send(err);
              }
              res.json(events);
            });
          }
          else return res.json('user exist');
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


