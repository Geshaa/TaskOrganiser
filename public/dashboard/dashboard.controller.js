(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$location', '$http'];

    function DashboardController($location, $http) {
        var dc = this;

        alert('calling dashboard controller');
    }

})();