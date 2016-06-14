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
