var yumdbAnimations = angular.module('yumdbAnimations', ['ngAnimate']);

'use strict';

/* App Module */

var yumdb = angular.module('yumdb', [
    'ngRoute',
    'yumdbAnimations',
    'yumdbControllers',
    'yumdbServices'
]);

yumdb.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider){
        $routeProvider.
            when('/', {
                templateUrl : 'partials/main.html'
            }).
            when('/recipes', {
                templateUrl : 'partials/recipes.html'
            }).
            otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode({
            enabled: true
        });
    }]);

'use strict';

/* Controllers */

var yumdbControllers = angular.module('yumdbControllers', []);

// returnOfTheAPIControllers.controller('PeopleListController', ['$scope', 'peopleService',
//     function($scope, peopleService) {
//         $scope.people = [];
//         peopleService.getPeople().then(function(data) {
//             $scope.people = data.people;
//             $scope.sortType = 'name';
//             $scope.sortReverse = false;
//             $scope.currentPage = 1;
//             $scope.pageSize = 10;
//         });
//     }]);

$(window).scroll(function() {
    if ($(document).scrollTop() > 80) {
        $('nav').addClass('shrink');
    }
    else {
        $('nav').removeClass('shrink');
    }
});


'use strict';

/* Services */

var yumdbServices = angular.module('yumdbServices', ['ngResource']);


// returnOfTheAPIServices.factory('peopleService', function($http) {
//     return {
//         getPeople: function() {
//             return $http.get('/get_people').then(function(r) {
//                 return r.data;
//             });
//         }
//     }
// });
