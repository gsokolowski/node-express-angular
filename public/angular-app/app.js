
// In angular everything belongs to module
angular.module('meanhotel', ['ngRoute']) // inject angular route library as dependency
    .config(config);



// route provider allows you to setup routes for your application
// Documentation  https://docs.angularjs.org/api/ngRoute/provider/$routeProvider
// $routeProvider is build in service

function config($routeProvider) {

    $routeProvider
    .when('/', {
        templateUrl: 'angular-app/hotel-list/hotels.html',
        controller: 'HotelsController',
        controllerAs: 'vm'
    })
    .when('/hotel/:id', {
        templateUrl: 'angular-app/hotel-display/hotel.html',
        controller: 'HotelController',
        controllerAs: 'vm'
    });

}

