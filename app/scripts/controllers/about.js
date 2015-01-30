'use strict';

/**
 * @ngdoc function
 * @name formsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the formsApp
 */
angular.module('formsApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
