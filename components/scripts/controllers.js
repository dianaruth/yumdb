/* Controllers */

var yumdbControllers = angular.module('yumdbControllers', []);

yumdbControllers.controller('RecipeSearchController', ['$scope', 'recipeSearchService',
    function($scope, recipeSearchService) {
        // enable popovers
        $('[data-toggle="popover"]').popover();
        // hide results while user is entering search terms
        $("#loading").hide();
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
            $scope.allergy = data;
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
            // hide search input fields
            $( "#search-terms" ).hide();
            // show loading screen
            $("#loading").show();
            // grab search terms
            var keyword = encodeURI($('#keyword').val());
            $scope.keyword = keyword;
            var includedIngredientsElem = $('#included-ingredients-list')[0].childNodes;
            var includedIngredients = [];
            for (var i = 1; i < includedIngredientsElem.length; i++) {
                var term = includedIngredientsElem[i].innerText;
                term = term.substring(0, term.length/2);
                includedIngredients.push(term);
            }
            $scope.includedIngredients = includedIngredients;
            var excludedIngredientsElem = $('#excluded-ingredients-list')[0].childNodes;
            var excludedIngredients = [];
            for (var i = 1; i < excludedIngredientsElem.length; i++) {
                var term = excludedIngredientsElem[i].innerText;
                term = term.substring(0, term.length/2);
                excludedIngredients.push(term);
            }
            $scope.excludedIngredients = excludedIngredients;
            var allergiesElem = $('#allergy-list')[0].childNodes;
            var allergies = [];
            for (var i = 0; i < allergiesElem.length; i++) {
                allergies.push(allergiesElem[i].childNodes[2].innerText);
            }
            $scope.allergies = allergies;
            var dietaryElem = $('#diet-list')[0].childNodes;
            var dietary = [];
            for (var i = 0; i < dietaryElem.length; i++) {
                dietary.push(dietaryElem[i].childNodes[2].innerText);
            }
            $scope.dietary = dietary;
            var includedCuisinesElem = $('#included-cuisine-list')[0].childNodes;
            var includedCuisines = [];
            for (var i = 0; i < includedCuisinesElem.length; i++) {
                includedCuisines.push(includedCuisinesElem[i].childNodes[2].innerText);
            }
            $scope.includedCuisines = includedCuisines;
            var excludedCuisinesElem = $('#excluded-cuisine-list')[0].childNodes;
            var excludedCuisines = [];
            for (var i = 0; i < excludedCuisinesElem.length; i++) {
                excludedCuisines.push(excludedCuisinesElem[i].childNodes[2].innerText);
            }
            $scope.excludedCuisines = excludedCuisines;
            var courseElem = $('#course-list')[0].childNodes;
            var course = [];
            for (var i = 0; i < courseElem.length; i++) {
                course.push(courseElem[i].childNodes[2].innerText);
            }
            $scope.course = course;
            var holidayElem = $('#holiday-list')[0].childNodes;
            var holiday = [];
            for (var i = 0; i < holidayElem.length; i++) {
                holiday.push(holidayElem[i].childNodes[2].innerText);
            }
            $scope.holiday = holiday;
            $scope.pageNum = 1;
            // call service to get results
            recipeSearchService.getResults(keyword, includedIngredients, excludedIngredients, allergies, dietary, includedCuisines, excludedCuisines, course, holiday, 10, 0).then(function(data) {
                $scope.attribution = data.attribution;
                $scope.recipes = data.matches;
                if (data.totalMatchCount == 0) {
                    $scope.pageNum = 0;
                    $scope.totalPages = 0;
                    $("#next-page").hide();
                    $("#prev-page").hide();
                    $("#no-results").show();
                    $("#loading").hide();
                    $("#results").show();
                }
                else {
                    $scope.totalPages = Math.ceil(data.totalMatchCount / 10);
                    $scope.attribution = data.attribution.html;
                    $("#no-results").hide();
                    $("#loading").hide();
                    $("#results").show();
                }
                $(document).scrollTop($("#results").offset().top - 70);
            });
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
        $("#back-button").click(function() {
            $("#search-terms").show()
            $("#results").hide();
        });
        $("#next-page").click(function() {
            recipeSearchService.getResults($scope.keyword, $scope.includedIngredients, $scope.excludedIngredients, $scope.allergies, $scope.dietary, $scope.includedCuisines, $scope.excludedCuisines, $scope.course, $scope.holiday, 10, ($scope.pageNum * 10)).then(function(data) {
                $scope.recipes = data.matches;
                $scope.pageNum = $scope.pageNum + 1;
                $(document).scrollTop($("#results").offset().top - 70);
            });
        });
        $("#prev-page").click(function() {
            recipeSearchService.getResults($scope.keyword, $scope.includedIngredients, $scope.excludedIngredients, $scope.allergies, $scope.dietary, $scope.includedCuisines, $scope.excludedCuisines, $scope.course, $scope.holiday, 10, ($scope.pageNum - 2) * 10).then(function(data) {
                $scope.recipes = data.matches;
                $scope.pageNum = $scope.pageNum - 1;
                $(document).scrollTop($("#results").offset().top - 70);
            });
        });
        $scope.setCurrentRecipe = function(recipe) {
            recipeSearchService.getRecipe(recipe.id).then(function(data) {
                $scope.currentRecipe = data;
                $scope.nutritionDropped = false;
                $scope.flavorDropped = false;
                var ingredientsList = data.ingredientLines;
                var newIngredients = [];
                for (var i = 0; i < ingredientsList.length; i++) {
                    if (!newIngredients.includes(ingredientsList[i])) {
                        newIngredients.push(ingredientsList[i]);
                    }
                }
                $scope.currentRecipe.ingredientLines = newIngredients;
            });
            $('#recipe-modal').modal();
        }
    }]);
