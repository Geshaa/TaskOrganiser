(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('TaskController', TaskController);

    TaskController.$inject = ['$cookies', '$http'];

    function TaskController($cookies, $http) {
        var tc = this;

        listAll();


        function listAll() {
            $http({
                url: '../public/classes/Tasks.php?mode=list&userid='+$cookies.get('userID'),
                method: 'GET',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
                console.log(response.data);
                tc.tasks = response.data;
            })
        }
    }

})();