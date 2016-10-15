(function($) {
    'use strict';

    var app = angular.module('app', ['ngCookies', 'ngRoute', 'angular-datepicker']);
    app.config(config);
    app.run(run);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/dashboard', {
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
                redirectTo: '/login',
            });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh

    }

    //factory for holding user data when login/register
    app.factory('userData', function($cookies, $http) {
        var data = {};
        data.firstName;
        data.lastName;
        data.phone;

        data.init = function() {
            return $http({
                url: '../public/classes/Authenticate.php?mode=getUser&userID='+$cookies.get('userID'),
                method: 'GET',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {

                if ( !response.data[0] )
                    return;

                data.firstName = response.data[0].firstName;
                data.lastName = response.data[0].lastName;
                data.phone = response.data[0].phone;
            })
        };

        data.setFirstName = function(fname) {
            data.firstName = fname;
        };

        data.getFirstName = function() {
            return data.firstName;
        };

        data.setLastName = function(lname) {
            data.lastName = lname;
        };

        data.getLastName = function() {
            return data.lastName;
        };

        data.setPhone = function(phone) {
            data.phone = phone;
        };

        data.getPhone = function() {
            return data.phone;
        };

        return data;
    });

    app.service('popupService', function() {
        this.close = function() {
            $('[data-popup]').removeClass('active');
            $('[data-overlay="popup"]').removeClass('visible');
            $('[data-popup]').find('input, textarea').val('');
        }
    });


})(jQuery);
