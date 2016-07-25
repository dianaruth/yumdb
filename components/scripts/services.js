'use strict';

/* Services */

var yumdbServices = angular.module('yumdbServices', ['ngResource']);

yumdbServices.factory('recipeSearchService', ['$http', 'APP_ID', 'APP_KEY', function($http, APP_ID, APP_KEY) {
    return {
        getIngredients: function() {
            return $http.get('data/ingredients.json').then(function(r) {
                return r.data;
            });
        },
        getAllergy: function() {
            return $http.get('data/allergy.json').then(function(r) {
                return r.data;
            });
        },
        getCourse: function() {
            return $http.get('data/course.json').then(function(r) {
                return r.data;
            });
        },
        getCuisine: function() {
            return $http.get('data/cuisine.json').then(function(r) {
                return r.data;
            });
        },
        getDiet: function() {
            return $http.get('data/diet.json').then(function(r) {
                return r.data;
            });
        },
        getHoliday: function() {
            return $http.get('data/holiday.json').then(function(r) {
                return r.data;
            });
        },
        getResults: function(){//includedIngredients, excludedIngredients, allergies, dietaryRestrictions, includedCuisines, excludedCuisines, courses, holidays) {
            return $http.get('data/holiday.json').then(function(r) {
                return APP_KEY;
            });
        }
    }
}]);
