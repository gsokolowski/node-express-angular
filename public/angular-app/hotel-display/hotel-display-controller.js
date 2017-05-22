
angular.module('meanhotel')
    .controller('HotelController', HotelController);


function HotelController($routeParams, hotelDataFactory) {

    var vm = this;
    var id = $routeParams.id; // from router /hotel/:id

    hotelDataFactory.hotelDisplay(id).then(function(response) {
        vm.hotel = response.data; // take only data of one hotel per id form json object
    });
}