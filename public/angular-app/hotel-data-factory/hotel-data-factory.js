// In angular everything belongs to module. Module is myApp. And we create factory called FilmFactory handled by function FilmFactory not FilmFactory() - this will couse an error
angular.module('meanhotel').factory('hotelDataFactory', hotelDataFactory);

function hotelDataFactory($http) {

    // define what factory will be returning as json object
    return {
        hotelList: hotelList,
        hotelDisplay: hotelDisplay,
        postReview: postReview
    };

    function hotelList() {
        return $http.get('/api/hotels?count=10').then(complete).catch(failed); // this part from .then is promise

    }

    function hotelDisplay(id) {
        return $http.get('/api/hotels/' + id).then(complete).catch(failed); // this part from .then is promise
    }

    function postReview(id, review) {
        return $http.post('/api/hotels/' + id + '/reviews', review).then(complete).catch(failed);
    }

    function complete(response) {
        return response;
    }

    function failed(error) {
        return error.statusText;
    }

}