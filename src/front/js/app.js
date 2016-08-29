/*global console:false, jQuery:false, angular: false */
(function($) {
	'use strict';

	var app = angular.module('app', ['ngRoute', 'ngCookies']);
	app.config(config);
	app.run(run);

	config.$inject = ['$routeProvider', '$locationProvider'];

	function config($routeProvider, $locationProvider) {
		$routeProvider
				.when('/', {
					controller: 'DashboardController',
					templateUrl: 'dashboard/dashboard.view.html',
					controllerAs: 'dc'
				})
				.when('/login', {
					controller: 'LoginController',
					templateUrl: 'login/login.view.html',
					controllerAs: 'lc'
				})
				.when('/register', {
					controller: 'RegisterController',
					templateUrl: 'register/register.view.html',
					controllerAs: 'rc'
				})
				.otherwise({
					redirectTo: '/login'
				});
	}

	run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];

	function run($rootScope, $location, $cookieStore, $http) {
		//keep user logged after refresh page
		$rootScope.globals = $cookieStore.get('globals') || {};

		if ($rootScope.globals.currentUser) {
			$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
		}

		$rootScope.$on('$locationChangeStart', function(event, next, current) {
			// redirect to login page if not logged in and trying to access a restricted page
			var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
			var loggedIn = $rootScope.globals.currentUser;

			if (restrictedPage && !loggedIn) {
				$location.path('/login');
			}
		});
	}



})(jQuery);
