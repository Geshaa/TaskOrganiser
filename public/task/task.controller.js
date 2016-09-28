(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('TaskController', TaskController);

    TaskController.$inject = ['$cookies', '$http'];

    function TaskController($cookies, $http) {
        var tc = this;

        listAll();

        tc.setDone  = setDone;
        tc.add      = add;


        function setDone(id, name) {
           console.log(name);
        }

        function add() {
            console.log(tc.date);
            console.log(tc.category);
            //var data = $.param({
            //    mode: 'create',
            //    name: tc.name,
            //    description: tc.description,
            //    date: tc.date,
            //    userid: $cookies.get('userID')
            //});
            //
            //$http({
            //    url: '../public/classes/Tasks.php',
            //    method: 'POST',
            //    data: data,
            //    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            //})
            //.then(function(response) {
            //    listAll();
            //});
        }


        function listAll() {
            $http({
                url: '../public/classes/Tasks.php?mode=list&userid='+$cookies.get('userID'),
                method: 'GET',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
                tc.tasks = response.data;
            })
        }
    }

})();