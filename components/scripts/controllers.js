'use strict';

/* Controllers */

var yumdbControllers = angular.module('yumdbControllers', []);

yumdbControllers.controller('RecipeSearchController', ['$scope', 'recipeSearchService',
    function($scope, recipeSearchService) {
        // enable popovers
        $('[data-toggle="popover"]').popover();
        // hide results while user is entering search terms
        $("#results").hide();
        // load autocomplete search bars for ingredient inputs and enable deletion of items
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
            $( "#excluded-ingredients-input" ).autocomplete({
                source: list,
                appendTo: $("#excluded-ingredients-input").next(),
                select: function( event, ui ) {
                    // add ingredient to list
                    $("#excluded-ingredients-list").append('<span class="element"><i class="fa fa-times" onclick="$(this).parent().remove();"></i><span>' + ui.item.label + '</span><span class="hidden value">' + ui.item.value + '</span></span>');
                    // clear text box
                    $("#excluded-ingredients-input").val("");
                    return false;
                }
            });
        });
        // button logic
        $("#search-button").click(function() {
            alert("search");
            // logic for searching and displaying results here
            // animate terms div going away
            // loading screen
            // append results to results div
            // hide loading screen
            // show results div
        });
        $("#clear-button").click(function() {
            // clear all lists
            $("#included-ingredients-list").empty();
            $("#excluded-ingredients-list").empty();
            $("#allergy-list").empty();
            $("#diet-list").empty();
            $("#included-cuisine-list").empty();
            $("#excluded-cuisine-list").empty();
            $("#course-list").empty();
            $("#holiday-list").empty();
        });
        
    }]);
