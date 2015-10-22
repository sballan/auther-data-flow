'use strict';

app.factory('Auth', function ($http, User, currentUser, $rootScope){
	var Auth = {};

	Auth.signup = function (username, _password){
		$http.post("/api/users/", {email: username, password: _password})
		.then (function (res){
			currentUser.userId=res.data[0]._id;
			console.log("Response to signup: ", res);
			//$rootScope.$digest();
		})

	}

	Auth.login = function (username, _password, $rootScope){
		$http.get("/api/users/" + username + "/" + _password)
		.then (function (res){
			currentUser.userId=res.data[0]._id;
			console.log("Response to login: ", res);
			console.log("current user check: ", currentUser);
			//$rootScope.$digest();
		})
	}

	return Auth;
})