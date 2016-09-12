(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$http', '$cookies'];

    function LoginController($location, $http, $cookies) {
        var lc = this;

        lc.login = login;

        function login() {
            lc.dataLoading = true;

            var data = $.param({
                mode: 'login',
                email: lc.email,
                password: lc.password,
            });

            $http({
                url: '../public/classes/Authenticate.php',
                method: 'POST',
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {

                if ( response.data[0] === 1) {
                    $location.path('/dashboard');
                    lc.wrongData = false;
                }
                else {
                    lc.wrongData = true;
                }

                lc.dataLoading = false;
                $cookies.put('userID', response.data[1]);
            })
        }
    }
})();