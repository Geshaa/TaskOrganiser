(function () {
    'use strict';

    var app = angular.module('app');
    app.controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];

    function LoginController($location, AuthenticationService, FlashService) {
        var lc = this;

        lc.login = login;

        //reset login status
        (function initController() {
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            lc.dataLoading = true;

            AuthenticationService.Login(lc.username, lc.password, function(response) {

                if ( response.success ) {
                    AuthenticationService.SetCredentials(lc.username, lc.password);
                    $location.path('/');
                }
                else {
                    FlashService.Error(response.message);
                    lc.dataLoading = false;
                }
            });
        }
    }
})();