"use strict";
var express = require('express');
var app = express();
var userRouter = express.Router();
var eventRouter = express.Router();

module.exports = function(app) {

  var userCtrl = require('./controller/user.controller');
  var eventCtrl = require('./controller/event.controller');
  var authCtrl = require('./controller/auth.controller');

  // USER ROUTES
  userRouter.route('/')
    .post(userCtrl.createUser)
    .get(userCtrl.getAllUsers);

  userRouter.post('/login', userCtrl.signIn);

  userRouter.route('/:userId')
    .get(authCtrl.ensureAuthorized, userCtrl.getOneUser)
    .put(authCtrl.ensureAuthorized, userCtrl.updateUser)
    .delete(authCtrl.ensureAuthorized, userCtrl.deleteUser);

  userRouter.post('/:userId/addevent', eventCtrl.createEvent);
  userRouter.post('/:userId/joinevent', eventCtrl.joinEvent);

  // EVENT ROUTES
  eventRouter.route('/')
    .get(eventCtrl.getAllEvents)

  eventRouter.route('/:eventId')
    .get(eventCtrl.getOneEvent)
    .put(eventCtrl.updateEvent)
    .delete(eventCtrl.deleteEvent);

  app.use('/users', userRouter);
  app.use('/events', eventRouter);
};
