'use strict';

/* App Module */

var cs462App = angular.module('cs462App', [
	'ngRoute',
	'ngSanitize',
	'ngCookies',
	'cs462Controllers',
	'cs462Services',
]);

cs462App.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/account', {
			templateUrl: 'partials/account.html',
			// controller: 'MainCtrl'
		}).
		otherwise({
			templateUrl: 'partials/home.html',
			// controller: 'MainCtrl'
		})
	}
]);