'use strict';

/**
 * @ngdoc function
 * @name formsApp.controller:RequestCtrl
 * @description
 * # RequestCtrl
 * Controller of the formsApp
 */
angular.module('formsApp')
    .controller('RequestCtrl', function (
        $scope, pageService, phenotypeMarkupService,
        phenotypeService,
        disorderService) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        activate();

        $scope.phenotypeFullTextChanged = phenotypeFullTextChanged;
        $scope.refreshPhenotypeTerms = refreshPhenotypeTerms;
        $scope.refreshDisorders = refreshDisorders;

        $scope.phenotype = {};
        $scope.disorder = {};
        $scope.phenotypeTerms = [];
        $scope.disorders = [];
        ////

        function activate() {
            pageService.title = 'Complete Genome Sequencing Request';
        }

        function phenotypeFullTextChanged(pedigree) {
            phenotypeMarkupService.markup(pedigree).then(function (markup) {
                $scope.phenotypeFullTextPreview = markup;
            });
        }

        function refreshPhenotypeTerms(term) {
            return phenotypeService.autocomplete(term).then(function(terms) {
                $scope.phenotypeTerms = terms;
            });
        }

        function refreshDisorders(disorder) {
            return disorderService.autocomplete(disorder).then(function(disorders) {
                $scope.disorders = disorders;
            });
        }
    });
