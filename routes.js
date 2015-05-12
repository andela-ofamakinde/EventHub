"use strict";

module.exports = function(app) {

  var userCtrl = require('./controller/user.controller');
  var eventCtrl = require('./controller/event.controller');

  //USER ROUTES
  app.post('/signup', userCtrl.createUser);
  app.post('/signin', userCtrl.signIn);
  app.get('/allusers', userCtrl.getAllUser);
  app.get('/allusers/user/:user_id', userCtrl.getOneUser);
  app.delete('/allusers/:user_id', userCtrl.deleteUser);

  // EVENT ROUTES
  app.post('/createevent', eventCtrl.createEvent);
  app.get('/allevents', eventCtrl.getAllEvents);
  app.get('/allevents/:event_id', eventCtrl.getOneEvent);
  app.put('/allevents/:event_id', eventCtrl.updateEvent);
  app.post('/allevents/:event_id/joinevent', eventCtrl.joinEvent);
  app.get('/allevents/:event_id/viewusers', eventCtrl.viewUsers);
  app.delete('/deleteEvent/:event_id', eventCtrl.deleteEvent);
};