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

                if ( response.data === "1") {
                    $location.path('/dashboard');
                    lc.wrongData = false;
                }
                else {
                    lc.wrongData = true;
                }
                lc.dataLoading = false;

                console.log($cookies.get('userID'));

                //console.log(response.data === "1", typeof response.data);
                //console.log($cookies.get('testCookie'));
            })

        }
    }

})();