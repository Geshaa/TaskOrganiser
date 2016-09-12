(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$location', '$http', '$cookies'];

    function DashboardController($location, $http, $cookies) {
        var dc = this;

        window.console.log($cookies.get('userID'));
    }

})();