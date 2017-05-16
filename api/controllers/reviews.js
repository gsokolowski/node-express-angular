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


var _addReview = function (req, res, hotel) {

    // push review to hotel instance
    hotel.reviews.push({
        name : req.body.name,
        rating : parseInt(req.body.rating, 10),
        review : req.body.review
    });

    // mongoose save()
    hotel.save(function(err, hotelUpdated) {
        if (err) {
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(200)
                .json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
        }
    });

};

// POST http://localhost:3000/api/hotels/591a28c8ada2b5fc73769687/reviews
module.exports.reviewsAddOne = function(req, res) {

    var id = req.params.hotelId;

    console.log('POST review to hotelId', id);

    Hotel
        .findById(id)
        .select('reviews')
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : doc
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if(!doc) {
                console.log("HotelId not found in database", id);
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found " + id
                };
            }
            if (doc) {
                _addReview(req, res, doc);
            } else {
                res
                    .status(response.status)
                    .json(response.message);
            }
        });


};

// Update review
module.exports.reviewsUpdateOne = function(req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, hotel) {
            var thisReview;
            var response = {
                status : 200,
                message : {}
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if(!hotel) {
                console.log("Hotel id not found in database", id);
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found " + id
                };
            } else {
                // Get the review
                thisReview = hotel.reviews.id(reviewId);
                // If the review doesn't exist Mongoose returns null
                if (!thisReview) {
                    response.status = 404;
                    response.message = {
                        "message" : "Review ID not found " + reviewId
                    };
                }
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                thisReview.name = req.body.name;
                thisReview.rating = parseInt(req.body.rating, 10);
                thisReview.review = req.body.review;
                hotel.save(function(err, hotelUpdated) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    }
                });
            }
        });

};


// Delete review

module.exports.reviewsDeleteOne = function(req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err, hotel) {
            var thisReview;
            var response = {
                status : 200,
                message : {}
            };
            if (err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if(!hotel) {
                console.log("Hotel id not found in database", id);
                response.status = 404;
                response.message = {
                    "message" : "Hotel ID not found " + id
                };
            } else {
                // Get the review
                thisReview = hotel.reviews.id(reviewId);
                // If the review doesn't exist Mongoose returns null
                if (!thisReview) {
                    response.status = 404;
                    response.message = {
                        "message" : "Review ID not found " + reviewId
                    };
                }
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                hotel.reviews.id(reviewId).remove();
                hotel.save(function(err, hotelUpdated) {
                    if (err) {
                        res
                            .status(500)
                            .json(err);
                    } else {
                        res
                            .status(204)
                            .json();
                    }
                });
            }
        });

};