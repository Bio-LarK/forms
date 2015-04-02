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
                $.post( "submit",  $( "#f1" ).html()  );
            })

        });

        
    });
