(function () {
    'use strict';

    var app = angular.module('app');
    app.controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$rootScope'];

    function RegisterController($location, $rootScope) {
        var rc = this;

        rc.register = register;

        function register() {
            rc.dataLoading = true;

            //real ajax here

        }
    }


})();