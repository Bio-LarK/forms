'use strict';

/**
 * @ngdoc service
 * @name formsApp.annotationMarkupService
 * @description
 * # annotationMarkupService
 * Factory in the formsApp.
 */
angular.module('formsApp')
    .factory('annotationMarkupService', function ($sce) {
        return {
            markup: markup
        };
        ////

        function markup(text, annotations) {
            // string replace all annotations
            // with our markup
            var formattedText = text;
            //var tagLhs = '<span style="cursor: pointer; padding: 2px 4px; border-radius:1px; background-color:
            // rgba(22, 125, 156, 0.2);" class="mention" ng-mouseenter="enteredMention(' + mentionIndex + ')"
            // ng-mouseleave="leftMention(' + mentionIndex + ')" ng-click="mentionClicked(' + mentionIndex + ');
            // $event.stopPropagation()">';
            var tagLhs = '<span class="label label-primary label-phenotype">';
            var tagRhs = '</span>';
            angular.forEach(annotations, function (annotation) {
                var re = new RegExp('\\b(' + annotation.originalSpan + ')\\b', 'gi');
                formattedText = formattedText.replace(re, tagLhs + '$1' + tagRhs);
            });
            return $sce.trustAsHtml(formattedText);
        }
    });
