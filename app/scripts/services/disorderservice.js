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
            if (!disorder || !disorder.length) {
                return $q.when([]);
            }
            return $http.get(getAutocompleteUrl(disorder)).then(function (response) {
                return response.data.slice(0, 10);
            }, function () {
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
                    },
                    {
                        id: '113',
                        name: 'Metachondromatosis',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metachondromatosis',
                        rdf_mapping: []
                    },
                    {
                        id: '192',
                        name: 'Metaphyseal dysplasia Braun-Tinschert type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_dysplasia_Braun-Tinschert_type',
                        rdf_mapping: []
                    },
                    {
                        id: '201',
                        name: 'Melorheostosis',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Melorheostosis',
                        rdf_mapping: []
                    },
                    {
                        id: '202',
                        name: 'Melorheostosis with osteopoikilosis',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Melorheostosis_with_osteopoikilosis',
                        rdf_mapping: []
                    },
                    {
                        id: '282',
                        name: 'Mesomelic dysplasia Kantaputra type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_Kantaputra_type',
                        rdf_mapping: []
                    },
                    {
                        id: '283',
                        name: 'Mesomelic dysplasia Korean type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_Korean_type',
                        rdf_mapping: []
                    },
                    {
                        id: '284',
                        name: 'Mesomelic dysplasia Kozlowski-Reardon type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_Kozlowski-Reardon_type',
                        rdf_mapping: []
                    },
                    {
                        id: '285',
                        name: 'Mesomelic dysplasia Nievergelt type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_Nievergelt_type',
                        rdf_mapping: []
                    },
                    {
                        id: '286',
                        name: 'Mesomelic dysplasia Savarirayan type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_Savarirayan_type',
                        rdf_mapping: []
                    },
                    {
                        id: '287',
                        name: 'Mesomelic dysplasia with acral synostoses',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_with_acral_synostoses',
                        rdf_mapping: []
                    },
                    {
                        id: '297',
                        name: 'Metaphyseal Acroscyphodysplasia',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_Acroscyphodysplasia',
                        rdf_mapping: []
                    },
                    {
                        id: '298',
                        name: 'Metaphyseal anadysplasia type 1',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_anadysplasia_type_1',
                        rdf_mapping: []
                    },
                    {
                        id: '300',
                        name: 'Metaphyseal anadysplasia type 2',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_anadysplasia_type_2',
                        rdf_mapping: []
                    },
                    {
                        id: '301',
                        name: 'Metaphyseal chondromatosis with D-2-hydroxyglutaric aciduria',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_chondromatosis_with_D-2-hydroxyglutaric_aciduria',
                        rdf_mapping: []
                    },
                    {
                        id: '302',
                        name: 'Metaphyseal dysplasia Jansen type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_dysplasia_Jansen_type',
                        rdf_mapping: []
                    },
                    {
                        id: '303',
                        name: 'Metaphyseal dysplasia Schmid type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_dysplasia_Schmid_type',
                        rdf_mapping: []
                    },
                    {
                        id: '304',
                        name: 'Metaphyseal dysplasia Spahr type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_dysplasia_Spahr_type',
                        rdf_mapping: []
                    },
                    {
                        id: '305',
                        name: 'Metaphyseal dysplasia with pancreatic insufficiency and cyclic neutropenia',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_dysplasia_with_pancreatic_insufficiency_and_cyclic_neutropenia',
                        rdf_mapping: []
                    },
                    {
                        id: '379',
                        name: 'Meckel syndrome type 1',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Meckel_syndrome_type_1',
                        rdf_mapping: []
                    },
                    {
                        id: '380',
                        name: 'Meckel syndrome type 2',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Meckel_syndrome_type_2',
                        rdf_mapping: []
                    },
                    {
                        id: '148',
                        name: 'Pseudodiastrophic dysplasia',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Pseudodiastrophic_dysplasia',
                        rdf_mapping: []
                    },
                    {
                        id: '314',
                        name: 'Pseudoachondroplasia',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Pseudoachondroplasia',
                        rdf_mapping: []
                    }

                ]);
            });
        }

    });
