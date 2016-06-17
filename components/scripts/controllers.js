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
                source: list,
                appendTo: $("#included-ingredients-input").next(),
                select: function( event, ui ) {
                    // add ingredient to list
                    $("#included-ingredients-list").append('<span class="element"><i class="fa fa-times" onclick="$(this).parent().remove();"></i><span>' + ui.item.label + '</span><span class="hidden value">' + ui.item.value + '</span></span>');
                    // clear text box
                    $("#included-ingredients-input").val("");
                    return false;
                }
            });
        });
    }]);
