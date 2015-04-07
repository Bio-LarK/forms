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
    .controller('MainCtrl', function (
        $scope, pageService, phenotypeMarkupService,
        phenotypeService,
        disorderService) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
  

        $scope.phenotypeFullTextChanged = phenotypeFullTextChanged;
        $scope.refreshPhenotypeTerms = refreshPhenotypeTerms;
        $scope.refreshDisorders = refreshDisorders;

        $scope.phenotype = {};
        $scope.disorder = {};
        $scope.phenotypeTerms = [];
        $scope.disorders = [];




        $scope.formInfo = {};
        $scope.saveData = function() {
            console.log($scope.formInfo);
        };





        $scope.openPanel = function(number) {
            $scope.openPanels = [false, false, false, false, false, false, false];
            $scope.openPanels[number] = true;
        };

        activate();

        ////

        function activate() {
            pageService.title = 'Complete Genome Sequencing Request';

            $scope.openPanel(0);
        }


        function phenotypeFullTextChanged(pedigree) {
            phenotypeMarkupService.markup(pedigree).then(function (markup) {
                $scope.phenotypeFullTextPreview = markup;
            });
        }

        function refreshPhenotypeTerms(term) {
            return phenotypeService.autocomplete(term).then(function(terms) {
                $scope.phenotypeTerms = terms;
            });
        }

        function refreshDisorders(disorder) {
            return disorderService.autocomplete(disorder).then(function(disorders) {
                $scope.disorders = disorders;
            });
        }

       $(function () {

    //jQuery time
            var current_fs, next_fs, previous_fs; //fieldsets
            var left, opacity, scale; //fieldset properties which we will animate
            var animating; //flag to prevent quick multi-click glitches


            $(".next").click(function () {

                /*
                 $('#msform').validate({
                 rules: {
                 videoFile: {
                 required: true,
                 extension:'mov|mp4|mpeg|wmv|jpeg'
                 },
                 videoTitle: {
                 required: true,
                 },
                 videoDescription: {
                 required: true,
                 }
                 },
                 messages: {
                 videoFile: "Please specify a file",
                 videoTitle: "Title is required",
                 videoDescription: "Description is required"
                 }
                 });

                 if ((!$('#msform').valid())) {
                 return false;
                 };

                 */

                if (animating) return false;
                animating = true;

                current_fs = $(this).parent().parent();
                next_fs = $(this).parent().parent().next();

                //activate next step on progressbar using the index of next_fs
                $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

                //show the next fieldset
                next_fs.show();
                //hide the current fieldset with style
                current_fs.animate({opacity: 0}, {
                    step: function (now, mx) {
                        //as the opacity of current_fs reduces to 0 - stored in "now"
                        //1. scale current_fs down to 80%
                        scale = 1 - (1 - now) * 0.2;
                        //2. bring next_fs from the right(50%)
                        left = (now * 50) + "%";
                        //3. increase opacity of next_fs to 1 as it moves in
                        opacity = 1 - now;
                        current_fs.css({'transform': 'scale(' + scale + ')'});
                        next_fs.css({'left': left, 'opacity': opacity});
                    },
                    duration: 800,
                    complete: function () {
                        current_fs.hide();
                        animating = false;
                    },
                    //this comes from the custom easing plugin
                    easing: 'easeInOutBack'
                });
            });

            $(".previous").click(function () {
                if (animating) return false;
                animating = true;

                current_fs = $(this).parent().parent();
                previous_fs = $(this).parent().parent().prev();

                //de-activate current step on progressbar
                $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

                //show the previous fieldset
                previous_fs.show();
                //hide the current fieldsetfieldset with style
                current_fs.animate({opacity: 0}, {
                    step: function (now, mx) {
                        //as the opacity of current_fs reduces to 0 - stored in "now"
                        //1. scale previous_fs from 80% to 100%
                        scale = 0.8 + (1 - now) * 0.2;
                        //2. take current_fs to the right(50%) - from 0%
                        left = ((1 - now) * 50) + "%";
                        //3. increase opacity of previous_fs to 1 as it moves in
                        opacity = 1 - now;
                        current_fs.css({'left': left});
                        previous_fs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
                    },
                    duration: 800,
                    complete: function () {
                        current_fs.hide();
                        animating = false;
                    },
                    //this comes from the custom easing plugin
                    easing: 'easeInOutBack'
                });
            });

            $(".submit").click(function () {
                $.post( "/api/submit",  $( "#f1" ).html()  );
                $.post( "/api/submit",  $( "#f2" ).html()  );
                $.post( "/api/submit",  $( "#f3" ).html()  );
                $.post( "/api/submit",  $( "#f4" ).html()  );
            })

        });

        
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
