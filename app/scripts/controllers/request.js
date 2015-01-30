'use strict';

/**
 * @ngdoc function
 * @name formsApp.controller:RequestCtrl
 * @description
 * # RequestCtrl
 * Controller of the formsApp
 */
angular.module('formsApp')
  .controller('RequestCtrl', function ($scope, pageService) {
        $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];

        activate();

        ////

        function activate() {
            pageService.title = 'Complete Genome Sequencing Request';
        }

  });
