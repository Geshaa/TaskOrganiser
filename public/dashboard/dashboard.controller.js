(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$location', '$cookies', '$http', 'userData', 'popupService'];

    function DashboardController($location, $cookies, $http, userData, popupService) {
        var dc = this;

        dc.logout   = logout;
        dc.editUser = editUser;


        if ( ! $cookies.get('userID'))
            $location.path('/login');

        $('.wrapper').addClass('lowAnimations wrapper--noFlex');

        //check if userData is available or make request to DB
        if ( typeof userData.getFirstName() === 'undefined' || userData.getFirstName() === '')
            userData.init().then(setData);
        else
            setData();


        function logout() {
            $cookies.remove('userID');
        }

        function editUser() {
            var data = $.param({
                mode: 'update',
                userid: $cookies.get('userID'),
                fname: dc.firstName,
                lname: dc.lastName,
                phone: dc.phone,
                password: dc.password
            });

            $http({
                url: '../public/classes/Authenticate.php',
                method: 'POST',
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
                popupService.close();
            });
        }

        function setData() {
            dc.firstName    = userData.getFirstName();
            dc.lastName     = userData.getLastName();
            dc.phone        = userData.getPhone();
        }
    }

})();