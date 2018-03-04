
var express = require('express');
var app = express();
var port = process.env.PORT || 4444;
var bodyParser = require('body-parser');
var nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

var allStars = [];

var pg = require('pg');
var config = {
  database: 'poems', // the name of the database
  host: 'localhost', // where is your database?
  port: 5432, // the port number for you database, 5432 is the default
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // Close idle connections to db after
};

var pool = new pg.Pool(config);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(port, function() {
  console.log('thx for listening on channel ', port);
});
