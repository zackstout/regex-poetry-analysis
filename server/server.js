
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

app.use(bodyParser.urlencoded({extended: true, limit: '50mb', parameterLimit: 1000000}));
app.use(express.static('server/public'));

// Get total of lines from a given author:
app.get('/totals', function(req, res) {
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('Error connecting', errorConnectingToDb);
    } else {
      var queryText = 'SELECT SUM(linecount) as count, author FROM poems GROUP BY author;';
      db.query(queryText, [], function (errorMakingQuery, result) {
        done(); // pool +1
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
        } else {
          res.send(result);
        }
      }); // END QUERY
    }
  }); // END POOL
});

// we don't need parameter now -- we're going through every row in the lines table.
app.get('/search/:id', function(req, res) {
  console.log(req.params.id);

  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('Error connecting', errorConnectingToDb);
    } else {
      var queryText = 'SELECT author, array_agg("lines") as all_lines FROM lines JOIN poems on lines.poem_id = poems.id GROUP BY author;';
      db.query(queryText, [], function (errorMakingQuery, result) {
        done(); // pool +1
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
        } else {
          // Send back success!
          res.send(result);
        }
      }); // END QUERY
    }
  }); // END POOL
});

// This worked -- putting all our poems in the Database:
app.post('/poems', function(req, res) {
  // console.log(req.body);
  var poem = req.body;
  pool.connect(function (errorConnectingToDb, db, done) {
    if (errorConnectingToDb) {
      console.log('Error connecting', errorConnectingToDb);
    } else {
      var queryText = 'INSERT INTO "poems" ("author", "title", "linecount") VALUES ($1, $2, $3) RETURNING id as id;';
      db.query(queryText, [poem.author, poem.title, parseInt(poem.linecount)], function (errorMakingQuery, result) {

        console.log(result.rows[0].id);
        poem.lines.forEach(function(line, index) {
          var queryText2 = 'INSERT INTO "lines" ("poem_id", "line", "lineNo") VALUES ($1, $2, $3);';
          db.query(queryText2, [result.rows[0].id, line, index], function(err, resp) {
            if (err) {
              console.log(err);
            } else {
              if (index == poem.lines.length - 1) {
                done();
                res.sendStatus(201);
              }
            }
          });
        });

        // done(); // pool +1
        if (errorMakingQuery) {
          console.log('Error making query', errorMakingQuery);
        } else {
          // Send back success!
          // res.sendStatus(201);
        }
      }); // END QUERY
    }
  }); // END POOL
});

app.listen(port, function() {
  console.log('thx for listening on channel ', port);
});
