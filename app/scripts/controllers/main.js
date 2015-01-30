'use strict';

/**
 * @ngdoc function
 * @name formsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the formsApp
 */
angular.module('formsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
