(function () {
'use strict';

angular.module('app', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
	
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'partials/home-tpl.html',
			controller: 'appController'
		});

	$urlRouterProvider.otherwise('/');
	
	$locationProvider.html5Mode(true);

}])

.controller('appController', ['$scope', function($scope) {
	
	var leapYear = function (y) {
		var year = new Date().getFullYear();
		var bi = 0;
		for (var i = y; i < year; i++) {
			if (((i % 4 == 0) && (i % 100 != 0)) || (i % 400 == 0)) {
				bi += 1;
			} else {
				bi += 0;
			}
		}
		return bi;
	}

}]);

})();