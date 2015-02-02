'use strict';

/**
 * @ngdoc service
 * @name formsApp.pedigreeMarkupService
 * @description
 * # pedigreeMarkupService
 * Factory in the formsApp.
 */
angular.module('formsApp')
    .factory('pedigreeMarkupService', function (annotatorService, annotationMarkupService) {
        return {
            markup: markup
        };

        ////

        function markup(pedigreeText) {
            return annotatePedigree(pedigreeText).then(function(annotations) {
                return generatePedigreeMarkup(pedigreeText, annotations);
            });
        }

        function annotatePedigree(pedigree) {
            return annotatorService.getAnnotations(pedigree);
        }

        function generatePedigreeMarkup(pedigree, annotations) {
            return annotationMarkupService.markup(pedigree, annotations);
        }

    });
