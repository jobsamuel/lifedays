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
	
	$scope.result = false;

	$scope.lifedays = function(day, month, year) { 
	
		if (!isNaN(parseInt(day)) && (parseInt(day) <= 31) && (!isNaN(parseInt(month)) && parseInt(month) <=12) && ( !isNaN(parseInt(year)) && parseInt(year) >= 1900 && parseInt(year) <= 2014)) {
			
			var m = month - 1; 
			var t = new Date();
			var a = moment([year, m, day]);
			var b = moment(t);
			var c = a.diff(b, 'days')*(-1);
			
			$scope.lived = c;

			$scope.result = true;
		} 
		
	}

}])

.directive('ngEnter', function () { // A directive by EpokK (https://gist.github.com/EpokK/5884263)
    return function (scope, elements, attrs) {
       	elements.bind('keydown keypress', function (event) {
           	if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

})();