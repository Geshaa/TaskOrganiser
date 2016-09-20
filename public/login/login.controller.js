(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$http', '$cookies', 'userData'];

    function LoginController($location, $http, $cookies, userData) {
        var lc = this;

        lc.login = login;

        $('.wrapper').removeClass('lowAnimations');

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
                    userData.setFirstName('');
                    lc.wrongData = false;
                    $location.path('/dashboard');
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