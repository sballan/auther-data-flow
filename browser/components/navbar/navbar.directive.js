'use strict';

app.directive('navbar', function ($state, $location, $http, currentUser) {
	return {
		restrict: 'E',
		templateUrl: '/browser/components/navbar/navbar.html',
		link: function (scope, elem, attrs) {
			scope.pathStartsWithStatePath = function (state) {
				var partial = $state.href(state);
				var path = $location.path();
				return path.startsWith(partial);
			};
			scope.logout = function() {
				$http.put('/api/users/logout')
				.then(function() {
					currentUser.userId = null;
					console.info("Logged Out")
				})
			};

			scope.loggedIn = function (){
				return currentUser.userId !== null;
			}
		}
	}
});