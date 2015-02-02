'use strict';

/**
 * @ngdoc function
 * @name formsApp.controller:RequestCtrl
 * @description
 * # RequestCtrl
 * Controller of the formsApp
 */
angular.module('formsApp')
  .controller('RequestCtrl', function ($scope, pageService, annotatorService, annotationMarkupService) {
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
            annotatePedigree(pedigree).then(function(annotations) {
               $scope.pedigreePreview = generatePedigreePreview(pedigree, annotations);
            });
        }

        function annotatePedigree(pedigree) {
            return annotatorService.getAnnotations(pedigree);
        }

        function generatePedigreePreview(pedigree, annotations) {
            return annotationMarkupService.markup(pedigree, annotations);
        }
  });
