'use strict';

var app = angular.module('auther', ['ui.router']);

app.value('currentUser', {});

app.config(function ($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true)

	$urlRouterProvider.when('/auth/:provider', function () {
    window.location.reload();
	})
	.otherwise('/');
});



//Client Id: 430671225831-2b75mtc1lcq4t0gvvso0eqh0vvivicv3.apps.googleusercontent.com
//Secret: SMB-wwO0s29kxon_wAwk45rj