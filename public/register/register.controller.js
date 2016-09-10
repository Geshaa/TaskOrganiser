(function () {
    'use strict';

    var app = angular.module('app');
    app.controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$http'];

    function RegisterController($location, $http) {
        var rc = this;

        rc.register = register;

        function register() {
            rc.dataLoading = true;

            var data = $.param({
                mode: 'register',
                fname: rc.firstName,
                lname: rc.lastName,
                password: rc.password,
                email: rc.email
            });

            $http({
                url: '../public/classes/Authenticate.php',
                method: 'POST',
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {

                if ( response.data === "-1")
                    rc.taken = true;
                else
                    $location.path('/dashboard');

                rc.dataLoading = false;
            })
        }
    }


})();