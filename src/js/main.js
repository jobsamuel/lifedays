(function () {
'use strict';

angular.module('app', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
	
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'partials/home-tpl.html',
			controller: 'appController',
			data: {
				pageTitle: 'Life Days'
			}
		});

	$urlRouterProvider.otherwise('/');
	
	$locationProvider.html5Mode(true);

}])

.run(['$rootScope', '$state', function($rootScope, $state) {

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		
		// Change the page title according the current view.
		if (angular.isDefined(toState.data.pageTitle)) {
			$rootScope.pageTitle = $state.current.data.pageTitle;
		}
		
	});

}])

.controller('appController', ['$scope', function($scope) {
	
	$scope.lifedays = function(day, month, year) { 
	
		var m = month - 1; 

		var a = moment([year, m, day]);
		var b = moment().format('YYYY, MM, DD');
		var c = a.diff(b, 'days')*(-1);
		
		$scope.lived = c;
	}

}]);

})();