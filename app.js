// open connection to mongo database
require('./api/data/db.js'); // running on moongose
// get express
var express = require('express'); // mnpm install express --save
var app = express();						
var path = require('path');					
var bodyParser = require('body-parser'); 	// npm install --save body-parser for receving POST data

var routes = require('./api/routes/index.js');

app.set('port', 3000);
// app.get('port'); 


// middleware to log all requests
app.use('/', function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

//http://localhost:3000/index.html
// middlewere to load all static elements from public folder
app.use('/', express.static( path.join( __dirname, 'public' )));

// add angularjs libraries to app to be able to use in app
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// for dealing with form POSTED
// enable parsing of posted forms
app.use( bodyParser.urlencoded( {extended : false }) );

// middlewere to load routes - http://localhost:3000/api/json
app.use('/api', routes);


// set listen server for requests on port defined at the top
var server = app.listen(app.get('port'), function() {
	var port = server.address().port;
	console.log('Magic happens on port ' + port);	

});
