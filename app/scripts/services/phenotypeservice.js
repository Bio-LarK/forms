'use strict';

/**
 * @ngdoc service
 * @name formsApp.phenotypeService
 * @description
 * # phenotypeService
 * Factory in the formsApp.
 */
angular.module('formsApp')
    .factory('phenotypeService', function ($q) {
        return {
            autocomplete: autocomplete
        };

        ///

        function autocomplete(query) {
            return getMatchingPhenotypeTerms(query);
        }

        //function getPhenotypeRefreshUrl(term) {
        //    var HPO_TERM_URL =
        // 'http://archive-demo.skeletome.org/drupal/api/hpo.json?callback=JSON_CALLBACK&parameters[name]=';
        //    return HPO_TERM_URL + term;
        //}

        function getMatchingPhenotypeTerms(term) {

            if(!term || !term.length) {
                return $q.when([]);
            }

            return $q.when(
                [
                    {
                        id: '3624',
                        name: 'Dwarfism',
                        uri: 'http://purl.obolibrary.org/obo/HP_0001516'
                    },
                    {
                        id: '3625',
                        name: 'Dwarfism recognizable at birth',
                        uri: 'http://purl.obolibrary.org/obo/HP_0008930'
                    },
                    {
                        id: '3626',
                        name: 'Dwarfism, \'low birth weight\' type',
                        uri: 'http://purl.obolibrary.org/obo/HP_0001422'
                    },
                    {
                        id: '3627',
                        name: 'Dwarfism, birth weight normal',
                        uri: 'http://purl.obolibrary.org/obo/HP_0008907'
                    },
                    {
                        id: '3628',
                        name: 'Dwarfism, neonatal short-limbed',
                        uri: 'http://purl.obolibrary.org/obo/HP_0008902'
                    },
                    {
                        id: '3629',
                        name: 'Dwarfism, short limb mesomelic',
                        uri: 'http://purl.obolibrary.org/obo/HP_0008910'
                    },
                    {
                        id: '3630',
                        name: 'Dwarfism, short-trunk, short-limbed',
                        uri: 'http://purl.obolibrary.org/obo/HP_0008867'
                    }
                ]
            );
        }
    });
