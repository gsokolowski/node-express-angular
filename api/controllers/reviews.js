// require mongoose library
var mongoose = require('mongoose');
// reference to model
var Hotel = mongoose.model('Hotel');


// Get all reviews for one hotel
// http://localhost:3000/api/hotels/58dae8310013c897054836f0/reviews
module.exports.reviewsGetAll = function(req, res) {
    // get parameters
    var hotelId = req.params.hotelId;
    // there is no hotelId in json - we are using index of json array first on is 0
    console.log("GET hotelId", hotelId);

    Hotel // Hotel model
        .findById(hotelId)
        .select('reviews') // return only reviews data not the whole document
        .exec(function(err, doc) {
            res
                .status(200)
                .json(doc.reviews);
        });
};

// Get single review for a hotel
// http://localhost:3000/api/hotels/58dae8310013c897054836f0/reviews/58ed612c29c1fa4e188a38b1
module.exports.reviewsGetOne = function(req, res) {

    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;

    console.log("GET hotelId " + hotelId + "for hotelId " + hotelId);

    Hotel // Hotel model
        .findById(hotelId)
        .select('reviews') // return only reviews data not the whole document
        .exec(function(err, hotel) {
            console.log("Returned hotel", hotel);
            var review = hotel.reviews.id(reviewId);
            res
                .status(200)
                .json(review);
        });
};