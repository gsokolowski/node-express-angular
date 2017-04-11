// his file is called hotels.controller.js

// require mongoose library
var mongoose = require('mongoose');
// reference to model
var Hotel = mongoose.model('Hotel');

var ObjectId = require('mongodb').ObjectId;


// http://localhost:3000/api/hotels
module.exports.hotelsGetAll = function(req, res) {

	// set default for offset and count to slice paginate data
	var offset = 0; //start point
	var count = 5; // how meny to display 


    // check if query string exist and if offset paramiters is there
	if(req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10 );
	}

	if(req.query && req.query.count) {
		count = parseInt(req.query.count, 10 );
	}


	// http://localhost:3000/api/hotels/?offset=0&count=2
	Hotel // Hotel model
		.find()
		.skip(offset)
		.limit(count)
		.exec(function(err, hotels) {
			console.log("Found hotels", hotels.length);
			res
				.json(hotels);
		});


}; 

// http://localhost:3000/api/hotels/0
module.exports.hotelsGetOne = function(req, res) {

	// get parameters
	var hotelId = req.params.hotelId;
	// there is no hotelId in json - we are using index of json array first on is 0
	console.log("GET hotelId", hotelId);

	Hotel // Hotel model
		.findById(hotelId)
		.exec(function(err, doc) {
			res
				.status(200)
				.json(doc);
		});

}; 

// use POSTMAN http://localhost:3000/api/hotels/new
// pass x-www-form-urlcoded
// name address stars
module.exports.hotelsAddOne = function(req, res) {

	var db = dbconn.get();
	var collection = db.collection('hotels');
	var newHotel;

	console.log("POST data for hotel");

	if(req.body && req.body.name && req.body.stars) {

		newHotel = req.body;
		newHotel.stars = parseInt(req.body.stars, 10);
		
		collection
			.insertOne(newHotel, function(error, response) {
				
				console.log(response.ops); // returns json response 
				res
					.status(201)
					.json( response.ops ); // passing POST body here
			});

	} else {
		console.log("Data missing from body");
		res
			.status(400)
			.json({message : "Required data missing from body"})
	}

}; 
































