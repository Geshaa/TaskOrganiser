(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$location', '$cookies', 'userData'];

    function DashboardController($location, $cookies, userData) {
        var dc = this;

        dc.logout = logout;

        if ( ! $cookies.get('userID'))
            $location.path('/login');

        $('.wrapper').addClass('lowAnimations');

        //check if userData is available or make request to DB
        if ( typeof userData.getFirstName() === 'undefined' || userData.getFirstName() === '')
            userData.init().then(setData);
        else
            setData();

        function logout() {
            $cookies.remove('userID');
        }

        function setData() {
            dc.firstName    = userData.getFirstName();
            dc.lastName     = userData.getLastName();
            dc.phone        = userData.getPhone();
        }
    }

})();