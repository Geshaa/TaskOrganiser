(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$http', '$scope'];

    function LoginController($location, $http, $scope) {
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

                if ( response.data == 1) {
                    lc.dataLoading = false;
                    $location.path('/dashboard');
                }
                //else {
                //
                //}
                console.log(response.data);
            })
        }
    }

})();