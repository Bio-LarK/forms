'use strict';

/**
 * @ngdoc service
 * @name formsApp.disorderService
 * @description
 * # disorderService
 * Factory in the formsApp.
 */
angular.module('formsApp')
    .factory('disorderService', function ($http, $q) {
        return {
            autocomplete: autocomplete
        };

        ////

        function autocomplete(disorder) {
            return getMatchingDisorders(disorder);
        }

        function getAutocompleteUrl(disorder) {
            return 'http://archive-demo.skeletome.org/drupal/api/disorder.json?parameters%5Bname%5D=' + disorder;
        }

        function getMatchingDisorders(disorder) {
            if(!disorder || !disorder.length) {
                return $q.when([]);
            }
            return $http.get(getAutocompleteUrl(disorder)).then(function(response) {
                return response.data.slice(0, 10);
            }, function() {
                // the autocomplete isn't working, use this default
                return $q.when([
                    {
                        id: '149',
                        name: 'Achondroplasia',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Achondroplasia'
                    },
                    {
                        id: '402',
                        name: 'Achondrogenesis type 1A',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Achondrogenesis_type_1A'
                    },
                    {
                        id: '453',
                        name: 'Achondrogenesis type 1B',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Achondrogenesis_type_1B'
                    },
                    {
                        id: '477',
                        name: 'Achondrogenesis type 2',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Achondrogenesis_type_2'
                    }
                ]);
            });
        }

    });
