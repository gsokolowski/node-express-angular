// require mongoose library
var mongoose = require('mongoose');
// reference to model
var Hotel = mongoose.model('Hotel');


// Get all reviews for one hotel
// http://localhost:3000/api/hotels/58dae8310013c897054836f0/rooms
module.exports.roomsGetAll = function(req, res) {
    // get parameters
    var hotelId = req.params.hotelId;
    // there is no hotelId in json - we are using index of json array first on is 0
    console.log("GET hotelId", hotelId);

    Hotel // Hotel model
        .findById(hotelId)
        .select('reviews') // return only rooms data not the whole document
        .exec(function(err, doc) {
            res
                .status(200)
                .json(doc.rooms);
        });
};

// Get single review for a hotel
module.exports.reviewsGetOne = function(req, res) {

};