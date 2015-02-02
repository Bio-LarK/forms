'use strict';

/**
 * @ngdoc service
 * @name formsApp.disorderService
 * @description
 * # disorderService
 * Factory in the formsApp.
 */
angular.module('formsApp')
    .factory('disorderService', function ($q) {
        return {
            autocomplete: autocomplete
        };

        ////

        function autocomplete(disorder) {
            return getMatchingDisorders(disorder);
        }

        function getMatchingDisorders(disorder) {
            //http://archive-demo.skeletome.org/drupal/api/disorder.json?parameters%5Bname%5D=achondroplasia
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
        }
    });
