'use strict';

/**
 * @ngdoc function
 * @name formsApp.controller:RequestCtrl
 * @description
 * # RequestCtrl
 * Controller of the formsApp
 */
angular.module('formsApp')
  .controller('RequestCtrl', function ($scope, pageService, pedigreeMarkupService) {
        $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];

        activate();

        $scope.pedigreeChanged = pedigreeChanged;

        ////

        function activate() {
            pageService.title = 'Complete Genome Sequencing Request';
        }

        function pedigreeChanged(pedigree) {
            pedigreeMarkupService.markup(pedigree).then(function(markup) {
                $scope.pedigreePreview = markup;
            });
        }
  });
