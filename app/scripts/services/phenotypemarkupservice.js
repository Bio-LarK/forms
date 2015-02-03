'use strict';

/**
 * @ngdoc service
 * @name formsApp.phenotypeMarkupService
 * @description
 * # pedigreeMarkupService
 * Factory in the formsApp.
 */
angular.module('formsApp')
    .factory('phenotypeMarkupService', function (annotatorService, annotationMarkupService) {
        return {
            markup: markup
        };

        ////

        function markup(text) {
            return annotateFullText(text).then(function(annotations) {
                return generateFullTextMarkup(text, annotations);
            });
        }

        function annotateFullText(text) {
            return annotatorService.getAnnotations(text);
        }

        function generateFullTextMarkup(text, annotations) {
            return annotationMarkupService.markup(text, annotations);
        }
    });
