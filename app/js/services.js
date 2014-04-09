'use strict';

/* Services */
var cs462Services = angular.module('cs462Services', [
	'ngResource'
]);

cs462Services.factory('User', ['$resource',
	function($resource) {
		return $resource('/api/user/:id', {
			id: '@id'
		});
	}
]);