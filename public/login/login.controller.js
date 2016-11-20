(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$http', '$cookies', 'userData', 'animations', 'userAuthenticate'];

    function LoginController($location, $http, $cookies, userData, animations, userAuthenticate) {
        var lc = this;

        lc.login = login;

        animations.increase();

        function login() {
            lc.dataLoading = true;

            var data = $.param({
                mode: 'login',
                email: lc.email,
                password: lc.password,
            });

            userAuthenticate.auth(data).then(function(response) {

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

            });
        }
    }
})();