'use strict';

/**
 * @ngdoc service
 * @name formsApp.annotatorService
 * @description
 * # annotatorService
 * Factory in the formsApp.
 */
angular.module('cssApp')
    .factory('annotatorService', function ($q) {

        var JSON_PROXY_URL = 'http://jsonp.nodejitsu.com/?url=';
        var ANNOTATE_URL = 'http://115.146.86.140:8080/biolark/annotate';
        var url = JSON_PROXY_URL + encodeURIComponent(ANNOTATE_URL);

        return {
            getAnnotations: getAnnotations
        };
        ////

        function getAnnotations(text) {
            var data = {
                text: text,
                dataSource: 'Human Phenotype Ontology|Bone Dysplasia Ontology'
            };

            console.warn('This needs to be implemented!!');

            // perform HTTP request here

            return $q.when([
                {
                    'uri': 'http://purl.obolibrary.org/obo/HP_0009824',
                    'dataSource': 'Human Phenotype Ontology',
                    'startOffset': '0',
                    'endOffset': '10',
                    'originalSpan': 'short arms'
                }
            ]);
        }
    });
