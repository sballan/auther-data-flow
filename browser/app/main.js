'use strict';

var app = angular.module('auther', ['ui.router']);

app.value('currentUser', {});

app.config(function ($urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');
});