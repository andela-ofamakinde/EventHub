var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydatabase');

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); 

require('./routes')(app);

app.listen(3000);
console.log('listening on port 3000');
