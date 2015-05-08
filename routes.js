module.exports = function(app) {

  var userCtrl = require('./controller/user.controller');
  var eventCtrl = require('./controller/event.controller');

  //USER ROUTES
  app.post('/signUp', userCtrl.createUser);
  app.get('/getAllUsers', userCtrl.getAllUser);
  app.delete('/deleteUser', userCtrl.deleteUser);

  // EVENT ROUTES
  app.post('/createEvent', eventCtrl.createEvent);
  app.get('/getAllEvents', eventCtrl.getAllEvents);
  app.get('/getEvent/:event_id', eventCtrl.getOneEvent);
  app.put('/editEvent/:event_id', eventCtrl.updateEvent);
  app.post('/joinEvent/:event_id', eventCtrl.joinEvent);
  app.delete('/deleteEvent/:event_id', eventCtrl.deleteEvent);
};