'use strict';

/**
 * @ngdoc function
 * @name formsApp.controller:RequestCtrl
 * @description
 * # RequestCtrl
 * Controller of the formsApp
 */
angular.module('formsApp')
    .controller('RequestCtrl', function ($scope, pageService, pedigreeMarkupService, $http, $q) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        activate();

        $scope.pedigreeChanged = pedigreeChanged;
        $scope.refreshPhenotypeTerms = refreshPhenotypeTerms;

        $scope.phenotype = {
        };
        $scope.phenotypeTerms = [];
        ////

        function activate() {
            pageService.title = 'Complete Genome Sequencing Request';
        }

        function pedigreeChanged(pedigree) {
            pedigreeMarkupService.markup(pedigree).then(function (markup) {
                $scope.pedigreePreview = markup;
            });
        }

        function refreshPhenotypeTerms(term) {
            return getPhenotypeTerms(term).then(function(terms) {
                $scope.phenotypeTerms = terms;
            });
        }

        function getPhenotypeRefreshUrl(term) {
            var HPO_TERM_URL = 'http://archive-demo.skeletome.org/drupal/api/hpo.json?callback=JSON_CALLBACK&parameters[name]=';
            return HPO_TERM_URL + term;
        }

        function getPhenotypeTerms(term) {

            if(!term || !term.length) {
                return $q.when([]);
            }

            return $q.when(
                [
                    {
                        id: '3624',
                        name: 'Dwarfism',
                        uri: 'http://purl.obolibrary.org/obo/HP_0001516',
                        rdf_mapping: [ ]
                    },
                    {
                        id: '3625',
                        name: 'Dwarfism recognizable at birth',
                        uri: 'http://purl.obolibrary.org/obo/HP_0008930',
                        rdf_mapping: [ ]
                    },
                    {
                        id: '3626',
                        name: 'Dwarfism, \'low birth weight\' type',
                        uri: 'http://purl.obolibrary.org/obo/HP_0001422',
                        rdf_mapping: [ ]
                    },
                    {
                        id: '3627',
                        name: 'Dwarfism, birth weight normal',
                        uri: 'http://purl.obolibrary.org/obo/HP_0008907',
                        rdf_mapping: [ ]
                    },
                    {
                        id: '3628',
                        name: 'Dwarfism, neonatal short-limbed',
                        uri: 'http://purl.obolibrary.org/obo/HP_0008902',
                        rdf_mapping: [ ]
                    },
                    {
                        id: '3629',
                        name: 'Dwarfism, short limb mesomelic',
                        uri: 'http://purl.obolibrary.org/obo/HP_0008910',
                        rdf_mapping: [ ]
                    },
                    {
                        id: '3630',
                        name: 'Dwarfism, short-trunk, short-limbed',
                        uri: 'http://purl.obolibrary.org/obo/HP_0008867',
                        rdf_mapping: [ ]
                    }
                ]
            );
        }
    });
