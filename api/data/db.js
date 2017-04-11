// mongoose db connection file

// require mongoose library
var mongoose = require('mongoose');
// this is connection string for loogin in to database meanhotel
var dburl = 'mongodb://localhost:27017/meanhotel';
// to connect to db
mongoose.Promise = global.Promise;
mongoose.connect(dburl);

// event listeners
mongoose.connection.on('connected', function() {
    console.log('Mongoose is connected to ' + dburl);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose is diconnected');
});
mongoose.connection.on('disconnected', function(err) {
    console.log('Mongoose connection error: ' + err);
});

// set mongoose to close connection when nodmon is terminatated
process.on("SIGINT", function () {
   mongoose.connection.close( function() {
       console.log('Mongoose disconnected through app termination (SIGINT)');
       process.exit(0);
   });
});

// for heroku the same ans SIGINT
process.on("SIGTERM", function () {
   mongoose.connection.close( function() {
       console.log('Mongoose disconnected through app termination (SIGTERM)');
       process.exit(0);
   });
});

process.once("SIGUSR2", function () {
    mongoose.connection.close( function() {
        console.log('Mongoose disconnected through app termination (SIGUSR2)');
        process.kill(process.pid, 'SIGUSR2');
    });
});

// BRING IN SCHEMAS AND MODELS
require('./hotels.model.js');
