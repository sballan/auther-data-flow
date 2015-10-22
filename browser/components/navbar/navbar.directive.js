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
				console.log("We're trying to logout from the scope")
				$http.put('/api/users/logout')
				.then(function() {
					console.log("WE DID IT")
				})
			};
			// if (attrs.hasOwnProperty('loggedIn')) scope.loggedIn = false;
			
			scope.loggedIn = function (){
				console.log("in loggedIN");
				return currentUser.userId !== null;

			}

			// if (currentUser.userId == null){
			// 	scope.loggedIn = false;
			// } else{
			// 	scope.loggedIn = true;
			// }
		}
	}
});