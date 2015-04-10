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
    'ngSanitize',
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

'use strict';

/**
 * @ngdoc function
 * @name formsApp.controller:RequestCtrl
 * @description
 * # RequestCtrl
 * Controller of the formsApp
 */
angular.module('cssApp')
    .controller('MainCtrl', function ($scope, $http, pageService, phenotypeMarkupService, phenotypeService, disorderService) {
        $scope.phenotype = {};
        $scope.phenotypeTerms = [];
        $scope.disorder = {};
        $scope.disorders = [];

        $scope.s1 = {};
        $scope.s2 = {};
        $scope.s3 = {};
        $scope.s4 = {};
        $scope.address = {};

        $scope.currentPage = 1;

        $scope.nextPage = function() {

            // check to make sure the form is completely valid
            //if ($scope.cssform.$invalid) {
                //alert('cant proceed without completing mandatory fields');
           // }

            //if ($scope.cssform.$valid) {
                if($scope.currentPage < 4) {

                    var current_fs = $("fieldset");

                    
                    current_fs.fadeOut(300, function() {

                        $("#progressbar li:nth(" + ($scope.currentPage) + ")").addClass("active");
                        current_fs.children().remove();

                        current_fs.fadeIn(10, function() {
                           $scope.currentPage++;
                            $scope.$apply();
                        });
                    })
                }
           //}


        };

        $scope.previousPage = function() {
            if($scope.currentPage > 1) {

                var current_fs = $("fieldset");
                
                current_fs.fadeOut(300, function() {

                    $("#progressbar li:nth(" + ($scope.currentPage - 1 ) + ")").removeClass("active");
                    current_fs.children().remove();

                    current_fs.fadeIn(10, function() {
                        $scope.currentPage--;
                        $scope.$apply();
                    });
                })
                
            }
        };

        $scope.previousVisible = function() {
            if($scope.currentPage > 1) {
                return true;
            }
        };

        $scope.nextVisible = function() {
            if($scope.currentPage < 4) {
                return true;
            }
        };

        $scope.submitVisible = function() {
            if($scope.currentPage == 4) {
                return true;
            }
        };

        $scope.phenotypeFullTextChanged = function(pedigree) {
            phenotypeMarkupService.markup(pedigree).then(function (markup) {
                $scope.phenotypeFullTextPreview = markup;
            });
        };

        $scope.refreshPhenotypeTerms = function(term) {
            return phenotypeService.autocomplete(term).then(function(terms) {
                $scope.phenotypeTerms = terms;
            });
        };

        $scope.refreshDisorders = function(disorder) {
            return disorderService.autocomplete(disorder).then(function(disorders) {
                $scope.disorders = disorders;
            });
        };

        $scope.$watch("address.address", function(newValue, oldValue) {
            if(oldValue != newValue && newValue) {
                var address = {
                    subpremise: "",
                    street_number: "",
                    route: "",
                    locality: "",
                    country: "",
                    administrative_area_level_1: "",
                    postal_code: ""
                };

                angular.forEach($scope.address.address.address_components, function(add) {
                    angular.forEach(add.types, function(type) {
                        address[type] = {
                            long_name: add.long_name,
                            short_name: add.short_name
                        };
                    });
                });

                if(!$scope.s1.hasOwnProperty("patient")) {
                    $scope.s1.patient = {};
                };

                var number = [];
                if(address.subpremise) {
                    number.push(address.subpremise.long_name);
                }
                number.push(address.street_number.long_name)
                number = number.join("/");

                $scope.s1.patient.street_address = [number, address.route.long_name].join(" ");
                $scope.s1.patient.city = address.locality.long_name;
                $scope.s1.patient.state = address.administrative_area_level_1.short_name;
                $scope.s1.patient.postcode = address.postal_code.long_name;
                $scope.s1.patient.country = address.country.long_name;
                //$scope.s1.patient.fullAddress = newValue;

                if(typeof(newValue) == "object") {
                    $scope.s1.address = "";
                };
            }
        })

        $scope.$watch("address.address2", function(newValue, oldValue) {
            if(oldValue != newValue && newValue) {
                var address2 = {
                    subpremise: "",
                    street_number: "",
                    route: "",
                    locality: "",
                    country: "",
                    administrative_area_level_1: "",
                    postal_code: ""
                };

                angular.forEach($scope.address.address2.address_components, function(add) {
                    angular.forEach(add.types, function(type) {
                        address2[type] = {
                            long_name: add.long_name,
                            short_name: add.short_name
                        };
                    });
                });

                if(!$scope.s2.hasOwnProperty("requester")) {
                    $scope.s2.requester = {};
                };

                var number = [];
                if(address2.subpremise) {
                    number.push(address2.subpremise.long_name);
                }
                number.push(address2.street_number.long_name)
                number = number.join("/");

                $scope.s2.requester.street_address  = [number, address2.route.long_name].join(" ");
                $scope.s2.requester.city            = address2.locality.long_name;
                $scope.s2.requester.state           = address2.administrative_area_level_1.short_name;
                $scope.s2.requester.postcode        = address2.postal_code.long_name;
                $scope.s2.requester.country         = address2.country.long_name;
                //$scope.s2.requester.fullAddress = newValue;

                if(typeof(newValue) == "object") {
                    $scope.s2.address2 = "";
                };
            }
        })





        $scope.formSave = function() {
            var postObject = new Object();
            postObject.step1 = $scope.s1;
            postObject.step2 = $scope.s2;
            postObject.step3 = $scope.s3;
            postObject.step4 = $scope.s4;

            $http({
                url: "api/submit",
                method: "POST",
                data: postObject
            }).success(function(data, status, headers, config) { 
                $scope.data = data;
            }).error(function(data, status, headers, config) {
                $scope.status = status;
            });
        };

        
    });
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

'use strict';

/**
 * @ngdoc service
 * @name formsApp.annotationMarkupService
 * @description
 * # annotationMarkupService
 * Factory in the formsApp.
 */
angular.module('cssApp')
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

'use strict';

/**
 * @ngdoc service
 * @name formsApp.phenotypeMarkupService
 * @description
 * # pedigreeMarkupService
 * Factory in the formsApp.
 */
angular.module('cssApp')
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

'use strict';

/**
 * @ngdoc filter
 * @name formsApp.filter:propsFilter
 * @function
 * @description
 * # propsFilter
 * Filter in the formsApp.
 */
angular.module('cssApp')
    .filter('propsFilter', function () {
        return function (items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function (item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    });

'use strict';

/**
 * @ngdoc service
 * @name formsApp.phenotypeService
 * @description
 * # phenotypeService
 * Factory in the formsApp.
 */
angular.module('cssApp')
    .factory('phenotypeService', function ($http, $q) {
        return {
            autocomplete: autocomplete
        };

        ///

        function autocomplete(query) {
            return getMatchingPhenotypeTerms(query);
        }

        function getAutocompleteUrl(term) {
            return 'http://archive-demo.skeletome.org/drupal/api/hpo.json?parameters[name]=' + term;
        }

        function getMatchingPhenotypeTerms(term) {
            if(!term || !term.length) {
                return $q.when([]);
            }

            return $http.get(getAutocompleteUrl(term)).then(function(response) {
                return response.data.slice(0, 10);
            });
        }
    });

'use strict';

/**
 * @ngdoc service
 * @name formsApp.disorderService
 * @description
 * # disorderService
 * Factory in the formsApp.
 */
angular.module('cssApp')
    .factory('disorderService', function ($http, $q) {
        return {
            autocomplete: autocomplete
        };

        ////

        function autocomplete(disorder) {
            return getMatchingDisorders(disorder);
        }

        function getAutocompleteUrl(disorder) {
            return 'http://archive-demo.skeletome.org/drupal/api/disorder.json?parameters%5Bname%5D=' + disorder;
        }

        function getMatchingDisorders(disorder) {
            if (!disorder || !disorder.length) {
                return $q.when([]);
            }
            return $http.get(getAutocompleteUrl(disorder)).then(function (response) {
                return response.data.slice(0, 10);
            }, function () {
                // the autocomplete isn't working, use this default
                return $q.when([
                    {
                        id: '149',
                        name: 'Achondroplasia',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Achondroplasia'
                    },
                    {
                        id: '402',
                        name: 'Achondrogenesis type 1A',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Achondrogenesis_type_1A'
                    },
                    {
                        id: '453',
                        name: 'Achondrogenesis type 1B',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Achondrogenesis_type_1B'
                    },
                    {
                        id: '477',
                        name: 'Achondrogenesis type 2',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Achondrogenesis_type_2'
                    },
                    {
                        id: '113',
                        name: 'Metachondromatosis',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metachondromatosis',
                        rdf_mapping: []
                    },
                    {
                        id: '192',
                        name: 'Metaphyseal dysplasia Braun-Tinschert type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_dysplasia_Braun-Tinschert_type',
                        rdf_mapping: []
                    },
                    {
                        id: '201',
                        name: 'Melorheostosis',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Melorheostosis',
                        rdf_mapping: []
                    },
                    {
                        id: '202',
                        name: 'Melorheostosis with osteopoikilosis',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Melorheostosis_with_osteopoikilosis',
                        rdf_mapping: []
                    },
                    {
                        id: '282',
                        name: 'Mesomelic dysplasia Kantaputra type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_Kantaputra_type',
                        rdf_mapping: []
                    },
                    {
                        id: '283',
                        name: 'Mesomelic dysplasia Korean type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_Korean_type',
                        rdf_mapping: []
                    },
                    {
                        id: '284',
                        name: 'Mesomelic dysplasia Kozlowski-Reardon type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_Kozlowski-Reardon_type',
                        rdf_mapping: []
                    },
                    {
                        id: '285',
                        name: 'Mesomelic dysplasia Nievergelt type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_Nievergelt_type',
                        rdf_mapping: []
                    },
                    {
                        id: '286',
                        name: 'Mesomelic dysplasia Savarirayan type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_Savarirayan_type',
                        rdf_mapping: []
                    },
                    {
                        id: '287',
                        name: 'Mesomelic dysplasia with acral synostoses',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_with_acral_synostoses',
                        rdf_mapping: []
                    },
                    {
                        id: '297',
                        name: 'Metaphyseal Acroscyphodysplasia',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_Acroscyphodysplasia',
                        rdf_mapping: []
                    },
                    {
                        id: '298',
                        name: 'Metaphyseal anadysplasia type 1',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_anadysplasia_type_1',
                        rdf_mapping: []
                    },
                    {
                        id: '300',
                        name: 'Metaphyseal anadysplasia type 2',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_anadysplasia_type_2',
                        rdf_mapping: []
                    },
                    {
                        id: '301',
                        name: 'Metaphyseal chondromatosis with D-2-hydroxyglutaric aciduria',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_chondromatosis_with_D-2-hydroxyglutaric_aciduria',
                        rdf_mapping: []
                    },
                    {
                        id: '302',
                        name: 'Metaphyseal dysplasia Jansen type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_dysplasia_Jansen_type',
                        rdf_mapping: []
                    },
                    {
                        id: '303',
                        name: 'Metaphyseal dysplasia Schmid type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_dysplasia_Schmid_type',
                        rdf_mapping: []
                    },
                    {
                        id: '304',
                        name: 'Metaphyseal dysplasia Spahr type',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_dysplasia_Spahr_type',
                        rdf_mapping: []
                    },
                    {
                        id: '305',
                        name: 'Metaphyseal dysplasia with pancreatic insufficiency and cyclic neutropenia',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Metaphyseal_dysplasia_with_pancreatic_insufficiency_and_cyclic_neutropenia',
                        rdf_mapping: []
                    },
                    {
                        id: '379',
                        name: 'Meckel syndrome type 1',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Meckel_syndrome_type_1',
                        rdf_mapping: []
                    },
                    {
                        id: '380',
                        name: 'Meckel syndrome type 2',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Meckel_syndrome_type_2',
                        rdf_mapping: []
                    },
                    {
                        id: '148',
                        name: 'Pseudodiastrophic dysplasia',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Pseudodiastrophic_dysplasia',
                        rdf_mapping: []
                    },
                    {
                        id: '314',
                        name: 'Pseudoachondroplasia',
                        uri: 'http://purl.org/skeletome/bonedysplasia#Pseudoachondroplasia',
                        rdf_mapping: []
                    }

                ]);
            });
        }

    });
