"use strict";

module.exports = function(app) {

  var userCtrl = require('./controller/user.controller');
  var eventCtrl = require('./controller/event.controller');

  //USER ROUTES
  app.post('/signup', userCtrl.createUser);
  app.post('/signin', userCtrl.signIn);
  app.get('/allusers', userCtrl.getAllUser);
  app.get('/users/:user_id', userCtrl.getOneUser);
  app.delete('/:user_id', userCtrl.deleteUser);

  // EVENT ROUTES
  app.post('/createevent', eventCtrl.createEvent);
  app.get('/allevents', eventCtrl.getAllEvents);
  app.get('/:event_id', eventCtrl.getOneEvent);
  app.get('/events/:userid', eventCtrl.getUserEvents);
  app.put('/:event_id', eventCtrl.updateEvent);
  app.post('/:event_id/joinevent', eventCtrl.joinEvent);
  app.get('/:event_id/viewusers', eventCtrl.viewUsers);
  app.delete('/:event_id', eventCtrl.deleteEvent);
};