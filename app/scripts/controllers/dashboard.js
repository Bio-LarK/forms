'use strict';

/**
 * @ngdoc function
 * @name formsApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the formsApp
 */
angular.module('formsApp')
  .controller('DashboardCtrl', function ($scope, pageService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

        pageService.title = 'Dashboard';

        $scope.rows = [
            [
                {
                    title: 'Sample Submission',
                    icon: 'fa-file-text-o'
                },
                {
                    title: 'Billing',
                    icon: 'fa-credit-card'
                },
                {
                    title: 'Sample Status',
                    icon: 'fa-flag'
                }
            ],
            [
                {
                    title: 'Patient Management',
                    icon: 'fa-stethoscope'
                },
                {
                    title: 'Workbench Analytics',
                    icon: 'fa-area-chart'
                }
            ]
        ];
  });
