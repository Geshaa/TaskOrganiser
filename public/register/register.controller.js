(function () {
    'use strict';

    var app = angular.module('app');
    app.controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$http', '$cookies'];

    function RegisterController($location, $http, $cookies) {
        var rc = this;

        rc.register = register;

        function register() {
            rc.dataLoading = true;

            var data = $.param({
                mode: 'register',
                fname: rc.firstName,
                lname: rc.lastName,
                phone: rc.phone,
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
                window.console.log(response.data);

                if ( response.data[0] === -1)
                    rc.taken = true;
                else
                    $location.path('/dashboard');

                rc.dataLoading = false;

                $cookies.put('userID', response.data[1]);
            })
        }
    }


})();