'use strict';

/* Controllers */
var cs462Controllers = angular.module('cs462Controllers', []);

cs462Controllers.controller('MainCtrl', ['$scope', 'User','$cookies',
	function($scope, User, $cookies) {
 		$scope.users = User.get({id : $cookies.user_id});
	}
])