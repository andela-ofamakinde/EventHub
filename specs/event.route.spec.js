var mongoose = require('mongoose');
var express = require('express');
require('../routes');
var myApp = require('../server');
var tester = require('supertest')(myApp);
var events =mongoose.model('events');
var newEvent;

describe('my api', function(){

  beforeEach(function(done){
    newEvent = new events({
      title: 'cinema time',
      description: "fun time",
      startdate: Date.now(),
      enddate: Date.now(),
      categories: 'party'
    });
    newEvent.save(function(err){
      if(err) {
        console.log(err);
      }
    });
    done();
  });

  it('should return an error message for a non existing route', function(done){
    tester
    .get('/errorroute')
    .expect(404, 'Cannot GET /errorroute\n');
    done();
  });

  it('should create a new event',function(done){
    newEvent = {
      title: 'cinema time',
      description: "fun time",
      startdate: Date.now(),
      enddate: Date.now(),
      categories: 'party'
    };
    tester
    .post('/createEvent')
    .send(newEvent)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201)
    .end(function(err, res) {
    if(err) {
        console.log(err);
    }
    else{  
    expect(res.body).toEqual(jasmine.objectContaining({
      title: 'cinema time',
      description: "fun time",
      startdate: Date.now(),
      enddate: Date.now(),
      categories: 'party'
    }));
    }
    done();
    });
  });

  it('should be able to get all events saved', function(done){
    tester
    .get('/getAllEventss')
    .set('Accept', 'application/json')
    .expect('Content-Type', "text/html; charset=utf-8")
    .expect(200)
    .end(function(err, res) {
    if(err) {
        console.log(err);
    }
    else{  
      expect(res.body).toEqual(jasmine.objectContaining({
        title: 'cinema time',
        description: "fun time",
        startdate: Date.now(),
        enddate: Date.now(),
        categories: 'party'
      }));
    }
    done();
    });
  });

});



