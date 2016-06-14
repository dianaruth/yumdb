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
                    value: ingredient.searchValue
                };
            });
            $( "#included-ingredients-input" ).autocomplete({
                source: list
            });
        });
    }]);
