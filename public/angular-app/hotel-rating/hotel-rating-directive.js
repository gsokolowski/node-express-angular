// Use one o another Custom Directive or Component


// This is Custom Directive called hotelRating
angular.module('meanhotel')
    .directive('hotelRating', hotelRating); // in html you will have <hotel-rating> in html

function hotelRating() {
    return {
        restrict: 'E',       // E for element A for atribute
        template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
        // explained here
        // https://www.udemy.com/the-complete-javascript-developer-mean-stack-zero-to-hero/learn/v4/t/lecture/5354756?start=0
        bindToController: true, // directive needs to bind to controller
        controller: 'HotelController', // controller needs to be HotelController
        controllerAs: 'vm',
        scope: {
            stars: '@' // '=' if value '@' if array or object, you can also pass functions there using symbol '&'
        }
    }
}


// This is Component called hotelRating from AngularJS 1.5 new feature - does not work here
//angular.module('meanhotel').component('hotelRating', {
//    bindings: {
//        stars: '*'
//    },
//    template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
//    controller: 'HotelController', // controller needs to be HotelController
//    controllerAs: 'vm'
//});
