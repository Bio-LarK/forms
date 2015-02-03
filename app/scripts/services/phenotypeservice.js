'use strict';

/**
 * @ngdoc service
 * @name formsApp.phenotypeService
 * @description
 * # phenotypeService
 * Factory in the formsApp.
 */
angular.module('formsApp')
    .factory('phenotypeService', function ($http, $q) {
        return {
            autocomplete: autocomplete
        };

        ///

        function autocomplete(query) {
            return getMatchingPhenotypeTerms(query);
        }

        function getAutocompleteUrl(term) {
            return 'http://archive-demo.skeletome.org/drupal/api/hpo.json?parameters[name]=' + term;
        }

        function getMatchingPhenotypeTerms(term) {
            if(!term || !term.length) {
                return $q.when([]);
            }

            return $http.get(getAutocompleteUrl(term)).then(function(response) {
                return response.data.slice(0, 10);
            });
        }
    });
