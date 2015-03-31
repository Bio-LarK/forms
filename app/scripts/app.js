'use strict';

/**
 * @ngdoc overview
 * @name css2App
 * @description
 * # css2App
 *
 * Main module of the application.
 */
angular
  .module('cssApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    'ui.select',
    'ngMaterial',
    'google.places'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
