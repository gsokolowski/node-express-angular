// This is mongoose schema that will generate
// hotels model out of this schema structure

// require mongoose library
var mongoose = require('mongoose');

// sub document
var reviewSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true,
        min : 0,
        max : 5
    },
    review : {
        type : String,
        required : true
    },
    createdOn : {
        type : Date,
        "default" : Date.now
    }
});

// sub document
var roomSchema = new mongoose.Schema({
    type : String,
    number : Number,
    description : String,
    photos : [String],
    price : Number
});

// main document
var hotelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    stars : {
        type : Number,
        min : 0,
        max : 5,
        default : 0
    },
    services : [String],
    description : String,
    photos : [String],
    currency : String,
    reviews : [reviewSchema],   // reference to reviewSchema sub document
    rooms : [roomSchema],       // reference to roomSchema sub document
    location : {
        address : String,
        // Always store coordinates longitude (East/West), latitude (North/South) order.
        coordinates : {
            type : [Number],
            index : '2dsphere'
        }
    }
});


//  3 parameters ( name of the model we will use, name of the schema, name of the mongodb collectio you will use )
// this is how you compile model from your model schema.
mongoose.model('Hotel', hotelSchema);

// you need to add this compiled model to db.js

