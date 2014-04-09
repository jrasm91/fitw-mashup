'use strict';

/* Controllers */
var cs462Controllers = angular.module('cs462Controllers', []);

cs462Controllers.controller('MainCtrl', ['$scope', 'User',
	function($scope, User) {
		$scope.name = "Foursquare Tracker";
		$scope.users = User.getAll();
        console.log($scope.users);
		$scope.update = function(user) {
			$scope.current = user;
		};
	}
])