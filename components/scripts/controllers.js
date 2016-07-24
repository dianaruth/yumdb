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
            $scope.included_ingredients = [];
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
                    // add ingredient to list if not already there
                    var children = $("#included-ingredients-list").children();
                    var found = false;
                    for (var i = 1; i < children.length; i++) {
                        if (children[i].lastElementChild.textContent == ui.item.value){
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        $("#included-ingredients-list").append('<span class="element"><i class="fa fa-times" onclick="$(this).parent().remove();"></i><span>' + ui.item.label + '</span><span class="hidden value">' + ui.item.value + '</span></span>');
                    }
                    // clear text box
                    $("#included-ingredients-input").val("");
                    return false;
                }
            });
            $( "#excluded-ingredients-input" ).autocomplete({
                source: list,
                appendTo: $("#excluded-ingredients-input").next(),
                select: function( event, ui ) {
                    var children = $("#excluded-ingredients-list").children();
                    var found = false;
                    for (var i = 1; i < children.length; i++) {
                        if (children[i].lastElementChild.textContent == ui.item.value){
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        $("#excluded-ingredients-list").append('<span class="element"><i class="fa fa-times" onclick="$(this).parent().remove();"></i><span>' + ui.item.label + '</span><span class="hidden value">' + ui.item.value + '</span></span>');
                    }
                    // clear text box
                    $("#excluded-ingredients-input").val("");
                    return false;
                }
            });
        });
        recipeSearchService.getAllergy().then(function(data) {
            $scope.allergies = data;
            $("#allergy-input").on("change", function() {
                var val = this.value;
                var text = $("#allergy-input option:selected").text();
                var children = $("#allergy-list").children();
                var found = false;
                for (var i = 0; i < children.length; i++) {
                    if (children[i].lastElementChild.textContent == val){
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    $("#allergy-list").append('<span class="element"><i class="fa fa-times" onclick="$(this).parent().remove();"></i><span>' + text + '</span><span class="hidden value">' + val + '</span></span>');
                }
            });
        });
        recipeSearchService.getDiet().then(function(data) {
            $scope.diets = data;
            $("#diet-input").on("change", function() {
                var val = this.value;
                var text = $("#diet-input option:selected").text();
                var children = $("#diet-list").children();
                var found = false;
                for (var i = 0; i < children.length; i++) {
                    if (children[i].lastElementChild.textContent == val){
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    $("#diet-list").append('<span class="element"><i class="fa fa-times" onclick="$(this).parent().remove();"></i><span>' + text + '</span><span class="hidden value">' + val + '</span></span>');
                }
            });
        });
        recipeSearchService.getCuisine().then(function(data) {
            $scope.cuisines = data;
            $("#included-cuisine-input").on("change", function() {
                var val = this.value;
                var text = $("#included-cuisine-input option:selected").text();
                var children = $("#included-cuisine-list").children();
                var found = false;
                for (var i = 0; i < children.length; i++) {
                    if (children[i].lastElementChild.textContent == val){
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    $("#included-cuisine-list").append('<span class="element"><i class="fa fa-times" onclick="$(this).parent().remove();"></i><span>' + text + '</span><span class="hidden value">' + val + '</span></span>');
                }
            });
            $("#excluded-cuisine-input").on("change", function() {
                var val = this.value;
                var text = $("#excluded-cuisine-input option:selected").text();
                var children = $("#excluded-cuisine-list").children();
                var found = false;
                for (var i = 0; i < children.length; i++) {
                    if (children[i].lastElementChild.textContent == val){
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    $("#excluded-cuisine-list").append('<span class="element"><i class="fa fa-times" onclick="$(this).parent().remove();"></i><span>' + text + '</span><span class="hidden value">' + val + '</span></span>');
                }
            });
        });
        recipeSearchService.getCourse().then(function(data) {
            $scope.courses = data;
            $("#course-input").on("change", function() {
                var val = this.value;
                var text = $("#course-input option:selected").text();
                var children = $("#course-list").children();
                var found = false;
                for (var i = 0; i < children.length; i++) {
                    if (children[i].lastElementChild.textContent == val){
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    $("#course-list").append('<span class="element"><i class="fa fa-times" onclick="$(this).parent().remove();"></i><span>' + text + '</span><span class="hidden value">' + val + '</span></span>');
                }
            });
        });
        recipeSearchService.getHoliday().then(function(data) {
            $scope.holidays = data;
            $("#holiday-input").on("change", function() {
                var val = this.value;
                var text = $("#holiday-input option:selected").text();
                var children = $("#holiday-list").children();
                var found = false;
                for (var i = 0; i < children.length; i++) {
                    if (children[i].lastElementChild.textContent == val){
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    $("#holiday-list").append('<span class="element"><i class="fa fa-times" onclick="$(this).parent().remove();"></i><span>' + text + '</span><span class="hidden value">' + val + '</span></span>');
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
