(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$location', '$http', '$cookies'];

    function DashboardController($location, $http, $cookies) {
        var dc = this;

        dc.logout = logout;

        if ( ! $cookies.get('userID'))
            $location.path('/login');

        $('.wrapper').addClass('lowAnimations');




        function logout() {
            $cookies.remove('userID');
        }
    }

})();