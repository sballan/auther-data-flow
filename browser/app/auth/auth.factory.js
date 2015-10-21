'use strict';

app.factory('Auth', function ($http, User){
	var Auth = {};

	Auth.signup = function (username, _password){
		$http.post("/api/users/", {email: username, password: _password})
		.then (function (res){
			console.log("Response to signup: ", res);
		})

	}

	Auth.login = function (username, _password){
		$http.get("/api/users/" + username + "/" + _password)
		.then (function (res){
			console.log("Response to login: ", res);
		})
	}

	return Auth;
})