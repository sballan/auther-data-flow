'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: '/browser/app/signup/signup.html',
		controller: function($scope, Auth) {
			$scope.signupUser = function() {
				console.info($scope.signup);
				Auth.signup($scope.signup.email, $scope.signup.password);
			}

		}
	});
});