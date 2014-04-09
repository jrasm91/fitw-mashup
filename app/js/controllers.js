'use strict';

/* Controllers */
var cs462Controllers = angular.module('cs462Controllers', []);

cs462Controllers.controller('MainCtrl', ['$scope', 'User',
	function($scope, User) {
		$scope.users = User.get({id : '123'});
		$scope.update = function(user) {
			$scope.current = user;
		};
	}
])