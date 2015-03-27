"use strict";angular.module("formsApp",["ngAnimate","ngRoute","ngSanitize","ui.select","ui.bootstrap","google.places","ngMaterial","ui.utils","mgo-angular-wizard"]).run(["pageService","$rootScope","$location",function(a,b,c){b.pageService=a,b.$location=c}]).config(["$routeProvider",function(a){a.when("/dashboard",{templateUrl:"views/dashboard.html",controller:"DashboardCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/dashboard",{templateUrl:"views/dashboard.html",controller:"DashboardCtrl"}).when("/request",{templateUrl:"views/request.html",controller:"RequestCtrl"}).otherwise({redirectTo:"/dashboard"})}]),angular.module("formsApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("formsApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("formsApp").controller("DashboardCtrl",["$scope","pageService",function(a,b){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],b.title="Dashboard",a.rows=[[{title:"Sample Submission",icon:"fa-file-text-o"},{title:"Billing",icon:"fa-credit-card"},{title:"Sample Status",icon:"fa-flag"}],[{title:"Patient Management",icon:"fa-stethoscope"},{title:"Workbench Analytics",icon:"fa-area-chart"}]]}]),angular.module("formsApp").factory("pageService",function(){var a=42;return{someMethod:function(){return a}}}),angular.module("formsApp").controller("RequestCtrl",["$scope","pageService","phenotypeMarkupService","phenotypeService","disorderService",function(a,b,c,d,e){function f(){b.title="Complete Genome Sequencing Request",a.openPanel(0)}function g(b){c.markup(b).then(function(b){a.phenotypeFullTextPreview=b})}function h(b){return d.autocomplete(b).then(function(b){a.phenotypeTerms=b})}function i(b){return e.autocomplete(b).then(function(b){a.disorders=b})}a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.phenotypeFullTextChanged=g,a.refreshPhenotypeTerms=h,a.refreshDisorders=i,a.phenotype={},a.disorder={},a.phenotypeTerms=[],a.disorders=[],a.openPanel=function(b){a.openPanels=[!1,!1,!1,!1,!1,!1,!1],a.openPanels[b]=!0},f()}]),angular.module("formsApp").factory("annotatorService",["$q",function(a){function b(b){return console.warn("This needs to be implemented!!"),a.when([{uri:"http://purl.obolibrary.org/obo/HP_0009824",dataSource:"Human Phenotype Ontology",startOffset:"0",endOffset:"10",originalSpan:"short arms"}])}{var c="http://jsonp.nodejitsu.com/?url=",d="http://115.146.86.140:8080/biolark/annotate";c+encodeURIComponent(d)}return{getAnnotations:b}}]),angular.module("formsApp").factory("annotationMarkupService",["$sce",function(a){function b(b,c){var d=b,e='<span class="label label-primary label-phenotype">',f="</span>";return angular.forEach(c,function(a){var b=new RegExp("\\b("+a.originalSpan+")\\b","gi");d=d.replace(b,e+"$1"+f)}),a.trustAsHtml(d)}return{markup:b}}]),angular.module("formsApp").factory("phenotypeMarkupService",["annotatorService","annotationMarkupService",function(a,b){function c(a){return d(a).then(function(b){return e(a,b)})}function d(b){return a.getAnnotations(b)}function e(a,c){return b.markup(a,c)}return{markup:c}}]),angular.module("formsApp").filter("propsFilter",function(){return function(a,b){var c=[];return angular.isArray(a)?a.forEach(function(a){for(var d=!1,e=Object.keys(b),f=0;f<e.length;f++){var g=e[f],h=b[g].toLowerCase();if(-1!==a[g].toString().toLowerCase().indexOf(h)){d=!0;break}}d&&c.push(a)}):c=a,c}}),angular.module("formsApp").factory("phenotypeService",["$http","$q",function(a,b){function c(a){return e(a)}function d(a){return"http://archive-demo.skeletome.org/drupal/api/hpo.json?parameters[name]="+a}function e(c){return c&&c.length?a.get(d(c)).then(function(a){return a.data.slice(0,10)}):b.when([])}return{autocomplete:c}}]),angular.module("formsApp").factory("disorderService",["$http","$q",function(a,b){function c(a){return e(a)}function d(a){return"http://archive-demo.skeletome.org/drupal/api/disorder.json?parameters%5Bname%5D="+a}function e(c){return c&&c.length?a.get(d(c)).then(function(a){return a.data.slice(0,10)},function(){return b.when([{id:"149",name:"Achondroplasia",uri:"http://purl.org/skeletome/bonedysplasia#Achondroplasia"},{id:"402",name:"Achondrogenesis type 1A",uri:"http://purl.org/skeletome/bonedysplasia#Achondrogenesis_type_1A"},{id:"453",name:"Achondrogenesis type 1B",uri:"http://purl.org/skeletome/bonedysplasia#Achondrogenesis_type_1B"},{id:"477",name:"Achondrogenesis type 2",uri:"http://purl.org/skeletome/bonedysplasia#Achondrogenesis_type_2"},{id:"113",name:"Metachondromatosis",uri:"http://purl.org/skeletome/bonedysplasia#Metachondromatosis",rdf_mapping:[]},{id:"192",name:"Metaphyseal dysplasia Braun-Tinschert type",uri:"http://purl.org/skeletome/bonedysplasia#Metaphyseal_dysplasia_Braun-Tinschert_type",rdf_mapping:[]},{id:"201",name:"Melorheostosis",uri:"http://purl.org/skeletome/bonedysplasia#Melorheostosis",rdf_mapping:[]},{id:"202",name:"Melorheostosis with osteopoikilosis",uri:"http://purl.org/skeletome/bonedysplasia#Melorheostosis_with_osteopoikilosis",rdf_mapping:[]},{id:"282",name:"Mesomelic dysplasia Kantaputra type",uri:"http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_Kantaputra_type",rdf_mapping:[]},{id:"283",name:"Mesomelic dysplasia Korean type",uri:"http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_Korean_type",rdf_mapping:[]},{id:"284",name:"Mesomelic dysplasia Kozlowski-Reardon type",uri:"http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_Kozlowski-Reardon_type",rdf_mapping:[]},{id:"285",name:"Mesomelic dysplasia Nievergelt type",uri:"http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_Nievergelt_type",rdf_mapping:[]},{id:"286",name:"Mesomelic dysplasia Savarirayan type",uri:"http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_Savarirayan_type",rdf_mapping:[]},{id:"287",name:"Mesomelic dysplasia with acral synostoses",uri:"http://purl.org/skeletome/bonedysplasia#Mesomelic_dysplasia_with_acral_synostoses",rdf_mapping:[]},{id:"297",name:"Metaphyseal Acroscyphodysplasia",uri:"http://purl.org/skeletome/bonedysplasia#Metaphyseal_Acroscyphodysplasia",rdf_mapping:[]},{id:"298",name:"Metaphyseal anadysplasia type 1",uri:"http://purl.org/skeletome/bonedysplasia#Metaphyseal_anadysplasia_type_1",rdf_mapping:[]},{id:"300",name:"Metaphyseal anadysplasia type 2",uri:"http://purl.org/skeletome/bonedysplasia#Metaphyseal_anadysplasia_type_2",rdf_mapping:[]},{id:"301",name:"Metaphyseal chondromatosis with D-2-hydroxyglutaric aciduria",uri:"http://purl.org/skeletome/bonedysplasia#Metaphyseal_chondromatosis_with_D-2-hydroxyglutaric_aciduria",rdf_mapping:[]},{id:"302",name:"Metaphyseal dysplasia Jansen type",uri:"http://purl.org/skeletome/bonedysplasia#Metaphyseal_dysplasia_Jansen_type",rdf_mapping:[]},{id:"303",name:"Metaphyseal dysplasia Schmid type",uri:"http://purl.org/skeletome/bonedysplasia#Metaphyseal_dysplasia_Schmid_type",rdf_mapping:[]},{id:"304",name:"Metaphyseal dysplasia Spahr type",uri:"http://purl.org/skeletome/bonedysplasia#Metaphyseal_dysplasia_Spahr_type",rdf_mapping:[]},{id:"305",name:"Metaphyseal dysplasia with pancreatic insufficiency and cyclic neutropenia",uri:"http://purl.org/skeletome/bonedysplasia#Metaphyseal_dysplasia_with_pancreatic_insufficiency_and_cyclic_neutropenia",rdf_mapping:[]},{id:"379",name:"Meckel syndrome type 1",uri:"http://purl.org/skeletome/bonedysplasia#Meckel_syndrome_type_1",rdf_mapping:[]},{id:"380",name:"Meckel syndrome type 2",uri:"http://purl.org/skeletome/bonedysplasia#Meckel_syndrome_type_2",rdf_mapping:[]},{id:"148",name:"Pseudodiastrophic dysplasia",uri:"http://purl.org/skeletome/bonedysplasia#Pseudodiastrophic_dysplasia",rdf_mapping:[]},{id:"314",name:"Pseudoachondroplasia",uri:"http://purl.org/skeletome/bonedysplasia#Pseudoachondroplasia",rdf_mapping:[]}])}):b.when([])}return{autocomplete:c}}]);