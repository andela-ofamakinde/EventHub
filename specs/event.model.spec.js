"use strict";
require('../models/event.model');
require('../config/config');
var Event = require('../models/event.model').Events;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase');

// var  Events = mongoose.model('Events'),
var myEvent;

describe('Event model test', function() {

  beforeEach(function(done) {
    myEvent = new Event();
    done();
  });

  describe("Should not save if any of the fields are empty", function() {
    it('should throw an error', function(done){
      myEvent.title = '';
      myEvent.save(function(error,event){
        expect(error).not.toBeNull();
        console.log(error);
        done();
      });
    });

    it('should save the event', function(done){
      myEvent.title = 'Offsite Event';
      myEvent.description = 'Time to have fun';
      myEvent.startdate = Date.now();
      myEvent.enddate = Date.now();
      myEvent.categories = 'party';

      myEvent.save(function(error){
        expect(error).toBeNull();
        done();
      });
    });

  });
});
