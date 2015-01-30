'use strict';

/**
 * @ngdoc function
 * @name formsApp.controller:RequestCtrl
 * @description
 * # RequestCtrl
 * Controller of the formsApp
 */
angular.module('formsApp')
  .controller('RequestCtrl', function ($scope, pageService, $q) {
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
            annotateText(pedigree).then(function(annotations) {
               $scope.pedigreePreview = generatePedigreePreview(pedigree, annotations);
            });
        }

        function annotateText(pedigree) {
            var data = {
                text: pedigree,
                dataSource: 'Human Phenotype Ontology|Bone Dysplasia Ontology'
            };

            // using JSONProxy
            var JSON_PROXY_URL = 'http://jsonp.nodejitsu.com/?url=';
            var ANNOTATE_URL = 'http://115.146.86.140:8080/biolark/annotate';
            var url = JSON_PROXY_URL + encodeURIComponent(ANNOTATE_URL);

            console.warn('This needs to be implemented!!');

            return $q.when([
                {
                    "uri": "http://purl.obolibrary.org/obo/HP_0009824",
                    "dataSource": "Human Phenotype Ontology",
                    "startOffset": "0",
                    "endOffset": "10",
                    "originalSpan": "short arms"
                }
            ]);
            //return $http.post(url, $.param(data), {
            //    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            //});
        }

        function generatePedigreePreview(pedigree, annotations) {
            return 'yo yo yo' + pedigree;
        }
  });
