'use strict';

/**
 * @ngdoc service
 * @name formsApp.pageService
 * @description
 * # pageService
 * Factory in the formsApp.
 */
angular.module('cssApp')
  .factory('pageService', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
