var express = require('express');
var app = express();
var config = require('./config/config');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase');

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); 

require('./routes')(app);

app.listen(config.port,function(){
  console.log("Listening on port "+ config.port);
});
module.exports = app;

