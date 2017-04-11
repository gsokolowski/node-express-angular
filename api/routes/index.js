// get express
var express = require('express');
// instatiate router
var router = express.Router();

var controllerHotels = require('../controllers/hotels.js');

// create route for json
router
	.route('/hotels')
	.get( controllerHotels.hotelsGetAll );

router
	.route('/hotels/:hotelId')
	.get( controllerHotels.hotelsGetOne);	

router
	.route('/hotels/new')
	.post( controllerHotels.hotelsAddOne);	


// export instantiated router and in app.js you need to require routes folder and to use them.
module.exports = router;
