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

    }

    //factory for holding user data when login/register
    app.factory('userData', function($cookies, $http) {
        var data = {};
        data.firstName;
        data.lastName;
        data.phone;

        data.init = function() {
            return $http({
                url: './classes/Authenticate.php?mode=getUser&userID='+$cookies.get('userID'),
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

    app.service('animations', function() {

        this.decrease = function() {
            $('.wrapper').addClass('lowAnimations wrapper--noFlex');
        }

        this.increase = function() {
            $('.wrapper').removeClass('lowAnimations wrapper--noFlex');
        }
    });

    app.service('userAuthenticate', ['$http', function($http) {

        this.auth = function(data) {

            return $http({
                url: './classes/Authenticate.php',
                method: 'POST',
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }
    }]);

    app.service('categoriesActions', ['$http', function($http) {

        this.list = function(data) {
            return $http({
                url: './classes/Categories.php?'+data,
                method: 'GET',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }

        this.remove = function(data) {
            return $http({
                url: './classes/Categories.php?'+data,
                method: 'DELETE'
            });
        }

        this.addEdit = function(data) {
            return $http({
                url: './classes/Categories.php',
                method: 'POST',
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }
    }]);

    app.service('tasksActions', ['$http', function($http) {

        this.list = function(data) {

            return $http({
                url: './classes/Tasks.php?'+data,
                method: 'GET',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }

        this.countTasks = function(data) {

            return $http({
                url: './classes/Tasks.php?'+data,
                method: 'GET',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }

        this.removeTasks = function(data) {

            return $http({
                url: './classes/Tasks.php?'+data,
                method: 'DELETE',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }

        this.undo = function(data) {

            return $http({
                url: './classes/Tasks.php',
                method: 'POST',
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }

        this.modify = function(data) {

            return $http({
                url: './classes/Tasks.php',
                method: 'POST',
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }

        this.toggleCompleted = function($event) {

            var attrVal = $($event.target).attr('data-done'),
                newVal;

            if ( attrVal == 0)
                newVal = 1;
            else
                newVal = 0;

            $($event.target).attr('data-done', newVal);
            $($event.target).closest('.tasks__item').find('h1').toggleClass('completed');

            return newVal;
        }

    }]);

    app.filter('textlength', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });

})(jQuery);
