/* Services */

var yumdbServices = angular.module('yumdbServices', ['ngResource']);

yumdbServices.factory('recipeSearchService', ['$http', function($http) {
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
        getResults: function(keyword, includedIngredients, excludedIngredients,
            allergies, dietaryRestrictions, includedCuisines, excludedCuisines,
            courses, holidays, numResults, start) {
            var APP_ID = "7ff6888f";
            var APP_KEY = "4bc3d67e990b3b608171d7f132a36f8d";
            var url = "http://api.yummly.com/v1/api/recipes?_app_id=" + APP_ID + "&_app_key=" + APP_KEY + "&";
            if (!(keyword == '')) {
                url += "q=" + keyword;
            }
            url += "&requirePictures=true";
            if (includedIngredients.length > 0) {
                for (var i = 0; i < includedIngredients.length; i++) {
                    url += "&allowedIngredient[]=" + encodeURI(includedIngredients[i]);
                }
            }
            if (excludedIngredients.length > 0) {
                for (var i = 0; i < excludedIngredients.length; i++) {
                    url += "&excludedIngredient[]=" + encodeURI(excludedIngredients[i]);
                }
            }
            if (allergies.length > 0) {
                for (var i = 0; i < allergies.length; i++) {
                    url += "&allowedAllergy[]=" + encodeURI(allergies[i]);
                }
            }
            if (dietaryRestrictions.length > 0) {
                for (var i = 0; i < dietaryRestrictions.length; i++) {
                    url += "&allowedDiet[]=" + encodeURI(dietaryRestrictions[i]);
                }
            }
            if (includedCuisines.length > 0) {
                for (var i = 0; i < includedCuisines.length; i++) {
                    url += "&allowedCuisine[]=" + encodeURI(includedCuisines[i]);
                }
            }
            if (excludedCuisines.length > 0) {
                for (var i = 0; i < excludedCuisines.length; i++) {
                    url += "&excludedCuisine[]=" + encodeURI(excludedCuisines[i]);
                }
            }
            if (courses.length > 0) {
                for (var i = 0; i < courses.length; i++) {
                    url += "&allowedCourse[]=" + encodeURI(courses[i]);
                }
            }
            if (excludedCuisines.length > 0) {
                for (var i = 0; i < excludedCuisines.length; i++) {
                    url += "&allowedHoliday[]=" + encodeURI(holidays[i]);
                }
            }
            url += "&maxResult=" + numResults + "&start=" + start;
            // call to Yummly API
            return $http.get(url).then(function(r) {
                return r.data;
            });
        },
        getRecipe: function(recipeID) {
            var APP_ID = "7ff6888f";
            var APP_KEY = "a215bffa4891258df82de5e745297590";
            var url = "http://api.yummly.com/v1/api/recipe/" + recipeID + "?_app_id=" + APP_ID + "&_app_key=" + APP_KEY;
            return $http.get(url).then(function(r) {
                return r.data;
            });
        }
    }
}]);
