// scheleton database file
// this file is managing database connections
// you need to open db connection as soon as application starts
// so you will have to call connection in app.js

// mongo client class driver
var MongoClient = require('mongodb').MongoClient;

// this is connection string for loogin in to database meanhotel
var dburl = 'mongodb://localhost:27017/meanhotel';

// variable to hold connection
var _connection = null;

// open function to use for oppenig connection - set connection to mongo db
var open = function() {
  MongoClient.connect(dburl, function(err, db) {
    if (err) {
      console.log("DB connection failed");
      return;
    } else {
      _connection = db;
      console.log("DB connection open", db);    	
    }
  });
};

// to get connection to mongodb
var get = function() {
  return _connection;
};

module.exports = {
  open : open,
  get : get
};