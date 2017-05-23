
angular.module('meanhotel')
    .controller('HotelController', HotelController);


function HotelController($route, $routeParams, hotelDataFactory) {

    var vm = this;
    var id = $routeParams.id; // from router /hotel/:id

    hotelDataFactory.hotelDisplay(id).then(function(response) {
        console.log(response.data);
        vm.hotel = response.data; // take only data of one hotel per id form json object
        vm.stars = _getStarRating(response.data.stars); // you need custom directive to display stars as stars
    });

    // helper function to replace vm.stars to hold an array instead of an number
    function _getStarRating(stars) {
        return new Array(stars);
    }

    // code for adding review through POST
    vm.addReview = function() {
        var postData = {
            name: vm.name,
            rating: vm.rating,
            review: vm.review
        };
        if (vm.reviewForm.$valid) {
            hotelDataFactory.postReview(id, postData).then(function(response) {
                if (response.status === 200) {
                    $route.reload(); // if POST of review is successful reload the route itself
                }
            }).catch(function(error) {
                console.log(error);
            });
        } else {
            vm.isSubmitted = true;
        }
    };
}