var express = require('express');
var app = express();
var config = require('./config/config');
var morgan =  require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/eventhubdb');

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); 

app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

require('./routes')(app);

app.listen(config.port,function(){
  console.log("Listening on port "+ config.port);
});
module.exports = app;

