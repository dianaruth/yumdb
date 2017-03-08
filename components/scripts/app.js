/* App Module */

var yumdb = angular.module('yumdb', [
    'ngRoute',
    'ngSanitize',
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
            when('/recipesearch', {
                templateUrl : '/partials/recipes.html'
            }).
            otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode({
            enabled: true
        });
    }]);

yumdb.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
