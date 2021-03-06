(function () {
    'use strict';

    var app = angular.module('app');
    app.controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$http', '$cookies', 'userData', 'userAuthenticate'];

    function RegisterController($location, $http, $cookies, userData, userAuthenticate) {
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

            userAuthenticate.auth(data).then(function(response) {

                if ( response.data[0] === -1) {
                    rc.taken = true;
                }
                else {
                    userData.setFirstName(rc.firstName);
                    userData.setLastName(rc.lastName);
                    userData.setPhone(rc.phone);
                    $location.path('/dashboard');
                }

                rc.dataLoading = false;
                $cookies.put('userID', response.data[1]);
            });
        }
    }
})();