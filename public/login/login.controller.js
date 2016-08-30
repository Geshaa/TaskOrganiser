(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$http', '$scope'];

    function LoginController($location, $http, $scope) {
        var lc = this;

        lc.login = login;

        //reset login status
        (function initController() {
            //AuthenticationService.ClearCredentials();
        })();

        function login() {
            lc.dataLoading = true;

            $http.get('../public/classes/Authenticate.php', { params: {"mode": "login"}} ).success(function(data) {
                $scope.users = data;
                lc.dataLoading = false;
            });
        }
    }

})();