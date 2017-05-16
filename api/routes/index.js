// get express
var express = require('express');
// instatiate router
var router = express.Router();

var controllerHotels = require('../controllers/hotels.js');
var controllerReviews = require('../controllers/reviews.js');
var controllerRooms = require('../controllers/rooms.js');


// Hotel routes
router
	.route('/hotels')
	.get(controllerHotels.hotelsGetAll)
	.post(controllerHotels.hotelsAddOne);

router
	.route('/hotels/:hotelId')
	.get(controllerHotels.hotelsGetOne)
	.put(controllerHotels.hotelsUpdateOne)
	.delete(controllerHotels.hotelsDeleteOne);



// Review routes
router
	.route('/hotels/:hotelId/reviews')
	.get(controllerReviews.reviewsGetAll)
	.post(controllerReviews.reviewsAddOne);


router
	.route('/hotels/:hotelId/reviews/:reviewId')
	.get(controllerReviews.reviewsGetOne)
	.put(controllerReviews.reviewsUpdateOne)
	.delete(controllerReviews.reviewsDeleteOne);



// Room routes
router
	.route('/hotels/:hotelId/rooms')
	.get(controllerRooms.roomsGetAll);

// export instantiated router and in app.js you need to require routes folder and to use them.
module.exports = router;


