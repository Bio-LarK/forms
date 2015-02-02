"use strict";angular.module("formsApp",["ngAnimate","ngRoute","ngSanitize","ui.select"]).run(["pageService","$rootScope","$location",function(a,b,c){b.pageService=a,b.$location=c}]).config(["$routeProvider",function(a){a.when("/dashboard",{templateUrl:"views/dashboard.html",controller:"DashboardCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/dashboard",{templateUrl:"views/dashboard.html",controller:"DashboardCtrl"}).when("/request",{templateUrl:"views/request.html",controller:"RequestCtrl"}).otherwise({redirectTo:"/dashboard"})}]),angular.module("formsApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("formsApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("formsApp").controller("DashboardCtrl",["$scope","pageService",function(a,b){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],b.title="Dashboard",a.rows=[[{title:"Sample Submission",icon:"fa-file-text-o"},{title:"Billing",icon:"fa-credit-card"},{title:"Sample Status",icon:"fa-flag"}],[{title:"Patient Management",icon:"fa-stethoscope"},{title:"Workbench Analytics",icon:"fa-area-chart"}]]}]),angular.module("formsApp").factory("pageService",function(){var a=42;return{someMethod:function(){return a}}}),angular.module("formsApp").controller("RequestCtrl",["$scope","pageService","pedigreeMarkupService","phenotypeService","disorderService",function(a,b,c,d,e){function f(){b.title="Complete Genome Sequencing Request"}function g(b){c.markup(b).then(function(b){a.pedigreePreview=b})}function h(b){return d.autocomplete(b).then(function(b){a.phenotypeTerms=b})}function i(b){return e.autocomplete(b).then(function(b){a.disorders=b})}a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],f(),a.pedigreeChanged=g,a.refreshPhenotypeTerms=h,a.refreshDisorders=i,a.phenotype={},a.disorder={},a.phenotypeTerms=[],a.disorders=[]}]),angular.module("formsApp").factory("annotatorService",["$q",function(a){function b(b){return console.warn("This needs to be implemented!!"),a.when([{uri:"http://purl.obolibrary.org/obo/HP_0009824",dataSource:"Human Phenotype Ontology",startOffset:"0",endOffset:"10",originalSpan:"short arms"}])}{var c="http://jsonp.nodejitsu.com/?url=",d="http://115.146.86.140:8080/biolark/annotate";c+encodeURIComponent(d)}return{getAnnotations:b}}]),angular.module("formsApp").factory("annotationMarkupService",["$sce",function(a){function b(b,c){var d=b,e='<span class="label label-primary label-phenotype">',f="</span>";return angular.forEach(c,function(a){var b=new RegExp("\\b("+a.originalSpan+")\\b","gi");d=d.replace(b,e+"$1"+f)}),a.trustAsHtml(d)}return{markup:b}}]),angular.module("formsApp").factory("pedigreeMarkupService",["annotatorService","annotationMarkupService",function(a,b){function c(a){return d(a).then(function(b){return e(a,b)})}function d(b){return a.getAnnotations(b)}function e(a,c){return b.markup(a,c)}return{markup:c}}]),angular.module("formsApp").filter("propsFilter",function(){return function(a,b){var c=[];return angular.isArray(a)?a.forEach(function(a){for(var d=!1,e=Object.keys(b),f=0;f<e.length;f++){var g=e[f],h=b[g].toLowerCase();if(-1!==a[g].toString().toLowerCase().indexOf(h)){d=!0;break}}d&&c.push(a)}):c=a,c}}),angular.module("formsApp").factory("phenotypeService",["$q",function(a){function b(a){return c(a)}function c(b){return a.when(b&&b.length?[{id:"3624",name:"Dwarfism",uri:"http://purl.obolibrary.org/obo/HP_0001516"},{id:"3625",name:"Dwarfism recognizable at birth",uri:"http://purl.obolibrary.org/obo/HP_0008930"},{id:"3626",name:"Dwarfism, 'low birth weight' type",uri:"http://purl.obolibrary.org/obo/HP_0001422"},{id:"3627",name:"Dwarfism, birth weight normal",uri:"http://purl.obolibrary.org/obo/HP_0008907"},{id:"3628",name:"Dwarfism, neonatal short-limbed",uri:"http://purl.obolibrary.org/obo/HP_0008902"},{id:"3629",name:"Dwarfism, short limb mesomelic",uri:"http://purl.obolibrary.org/obo/HP_0008910"},{id:"3630",name:"Dwarfism, short-trunk, short-limbed",uri:"http://purl.obolibrary.org/obo/HP_0008867"}]:[])}return{autocomplete:b}}]),angular.module("formsApp").factory("disorderService",["$q",function(a){function b(a){return c(a)}function c(){return a.when([{id:"149",name:"Achondroplasia",uri:"http://purl.org/skeletome/bonedysplasia#Achondroplasia"},{id:"402",name:"Achondrogenesis type 1A",uri:"http://purl.org/skeletome/bonedysplasia#Achondrogenesis_type_1A"},{id:"453",name:"Achondrogenesis type 1B",uri:"http://purl.org/skeletome/bonedysplasia#Achondrogenesis_type_1B"},{id:"477",name:"Achondrogenesis type 2",uri:"http://purl.org/skeletome/bonedysplasia#Achondrogenesis_type_2"}])}return{autocomplete:b}}]);