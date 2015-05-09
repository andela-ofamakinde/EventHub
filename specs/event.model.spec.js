require('../models/event.model');
require('../config/config');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase');

var  events = mongoose.model('events'),
    myEvent;

describe('Event model test', function() {

  beforeEach(function(done) {
    myEvent = new events();
    done();
  });

  describe("Should not save if any of the fields are empty", function() {
    it('should throw an error', function(done){
      myEvent.title = '';
      myEvent.save(function(error){
        expect(error).toBeDefined();
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
