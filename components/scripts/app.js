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
                templateUrl : '/partials/main.html'
            }).
            when('/recipes', {
                templateUrl : '/partials/recipes.html'
            }).
            otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode({
            enabled: true
        });
    }]);
