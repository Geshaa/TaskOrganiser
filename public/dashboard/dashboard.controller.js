(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$location', '$cookies', '$http', 'userData', 'popupService', 'animations', 'userAuthenticate'];

    function DashboardController($location, $cookies, $http, userData, popupService, animations, userAuthenticate) {
        var dc = this;

        dc.logout   = logout;
        dc.editUser = editUser;


        if ( ! $cookies.get('userID'))
            $location.path('/login');

        animations.decrease();

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

            userAuthenticate.auth(data).then(function(response) {
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