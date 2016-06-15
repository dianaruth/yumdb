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

'use strict';

/* Controllers */

var yumdbControllers = angular.module('yumdbControllers', []);

yumdbControllers.controller('IncludedIngredientsController', ['$scope', 'recipeSearchService',
    function($scope, recipeSearchService) {
        $scope.test = function() {
            alert($("#included-ingredients-input").val());
        };
        recipeSearchService.getIngredients().then(function(data) {
            var list = data.map( function (ingredient) {
                return {
                    label: ingredient.term,
                    value: ingredient.searchValue,
                    minLength: 0
                };
            });
            $( "#included-ingredients-input" ).autocomplete({
                source: list,
                appendTo: $("#included-ingredients-input").next()
            });
        });
    }]);

$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
        $('nav').addClass('shrink');
    }
    else {
        $('nav').removeClass('shrink');
    }
});


'use strict';

/* Services */

var yumdbServices = angular.module('yumdbServices', ['ngResource']);


yumdbServices.factory('recipeSearchService', function($http) {
    return {
        getIngredients: function() {
            return $http.get('data/ingredients.json').then(function(r) {
                return r.data;
            });
        }
    }
});
