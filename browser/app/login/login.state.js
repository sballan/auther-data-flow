'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: '/browser/app/login/login.html',
		controller: function($scope, Auth) {
			$scope.loginUser = function() {
				console.info($scope.login);
				Auth.login($scope.login.email, $scope.login.password);
			}
		}
	});
});

// TODO: create sign-in directive for signup and login views