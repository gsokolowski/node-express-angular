// This file is called hotels.controller.js IN tutorial

// require mongoose library
var mongoose = require('mongoose');
// reference to model
var Hotel = mongoose.model('Hotel');

var ObjectId = require('mongodb').ObjectId;

var runGeoQuery = function (req, res) {

	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);



	// define geoJson point
	var geoPoint = {
		type : "Point",
		coordinates : [lng, lat]
	};

	// define geoOptions
	var geoOptions = {
		spherical : true, 	// on globe
		maxDistance : 2000,	// in the radius of 2 km distanse from you geoPoint Lng and lat
		num: 5				// no more then 5 hotels suggested
	};

	// call mongoose getNear() method wirh defined geoPoint and geoOptions
	// using mongoose from here
	Hotel // mongoose model
		.geoNear(geoPoint, geoOptions, function(err, results, stats) {
			console.log('Geo results', results);
			console.log('Geo stats', stats);
			res
				.status(200)
				.json(results);
		});
};

// http://localhost:3000/api/hotels
// http://localhost:3000/api/hotels?lng=47.502649&lat=19.066785

module.exports.hotelsGetAll = function(req, res) {

	// set default for offset and count to slice paginate data
	var offset = 0; //start point
	var count = 5; // how meny to display
	var maxCount = 10; // to limit amount of hotels returned by api


	// check if latituda and longitude exists in query string and if call runGeoWuery()
	if(req.query && req.query.lng && req.query.lat) {
		runGeoQuery(req, res);
		return;
	}

    // check if query string exist and if offset paramiters is there
	if(req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10 );
	}

	if(req.query && req.query.count) {
		count = parseInt(req.query.count, 10 );
	}

	// to check is offest and count are numbers
	if(isNaN(offset) || isNaN(count)) {
		res
			.status(400) // bed request
			.json({
				"message" : "If supplied in querystring count and offset should be string"
			});
	}

	// to limit amount of hotels returned by api
	if(count > maxCount) {
		res
			.status(400) // bed request
			.json({
				"message" : "maxCount limit of " + maxCount + " exceeded"
			});
		return;
	}

	// http://localhost:3000/api/hotels/?offset=0&count=2
	// using mongoose from here
	Hotel // Hotel model
		.find() //mongoose method findById()
		.skip(offset)
		.limit(count)
		.exec(function(err, hotels) {

			if(err) {

				console.log("Error finding hotels");
				res
					.status(500)
					.json(err);
			} else {

				console.log("Found hotels", hotels.length);
				res
					.json(hotels);
			}
		});


}; 

// http://localhost:3000/api/hotels/591a28c8ada2b5fc73769687
module.exports.hotelsGetOne = function(req, res) {

	// get parameters
	var hotelId = req.params.hotelId;

	// there is no hotelId in json - we are using index of json array first on is 0
	console.log("GET hotelId", hotelId);

	// using mongoose from here
	Hotel // Hotel model
		.findById(hotelId) //mongoose method findById()
		.exec(function(err, doc) {

			var response = {
				status : 200,
				message : doc
			};

			if(err) {
				console.log("Error finding hotel");
				response.status = 500;
				response.message = err;

			} else if (!doc) {
				response.status = 404;
				response.message  = {
						"message" :  "Hotel ID not found"
					};
			}
			res
				.status(response.status)
				.json(response.message);

		});

}; 

// use POSTMAN http://localhost:3000/api/hotels
// pass x-www-form-urlcoded
var _splitArray = function(input) {
	var output;
	if (input && input.length > 0) {
		output = input.split(";");
	} else {
		output = [];
	}
	return output;
};



//POST http://localhost:3000/api/hotels
// Create New Hotel using mongoose
module.exports.hotelsAddOne = function(req, res) {
	// using mongoose from here
	// mongoose method create() //http://mongoosejs.com/docs/guide.html
	Hotel
		.create({
			name : req.body.name,
			description : req.body.description,
			stars : parseInt(req.body.stars,10),
			services : _splitArray(req.body.services),
			photos : _splitArray(req.body.photos),
			currency : req.body.currency,
			location : {
				address : req.body.address,
				coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
			}
		}, function(err, hotel) {
			if (err) {
				console.log("Error creating hotel");
				res
					.status(400)
					.json(err);
			} else {
				console.log("Hotel created!", hotel);
				res
					.status(201)
					.json(hotel);
			}
		});


}; 

// Update hotel with put method - update whole document patch is for part of document only
// PUT http://localhost:3000/api/hotels/591b716f386ca30576c48e1e need to provide all hotel data for update
module.exports.hotelsUpdateOne = function(req, res) {

	var hotelId = req.params.hotelId;

	console.log('GET hotelId', hotelId);

	Hotel
		.findById(hotelId)
		.select('-reviews -rooms') // exclude subdocument reviews and rooms
		.exec(function(err, hotel) {
			if (err) {
				console.log("Error finding hotel");
				res
					.status(500)
					.json(err);
				return;
			} else if(!hotel) {
				console.log("HotelId not found in database", hotelId);
				res
					.status(404)
					.lson({
						"message" : "Hotel ID not found " + hotelId
					});
				return;
			}

			hotel.name = req.body.name;
			hotel.description = req.body.description;
			hotel.stars = parseInt(req.body.stars,10);
			hotel.services = _splitArray(req.body.services);
			hotel.photos = _splitArray(req.body.photos);
			hotel.currency = req.body.currency;
			hotel.location = {
				address : req.body.address,
				coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
			};

			hotel
				.save(function(err, hotelUpdated) {
					if(err) {
						res
							.status(500)
							.json(err);
					} else {
						res
							.status(204) // for put
							.json();
					}
				});

		});
};


// delete hotel
module.exports.hotelsDeleteOne = function(req, res) {
	var hotelId = req.params.hotelId;

	Hotel
		.findByIdAndRemove(hotelId)
		.exec(function(err, location) {
			if (err) {
				res
					.status(404)
					.json(err);
			} else {
				console.log("Hotel deleted, id:", hotelId);
				res
					.status(204)
					.json();
			}
		});
};
































