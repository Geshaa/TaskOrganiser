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
        tc.setInfo  = setInfo;


        function setDone(id, name) {
           console.log(name);
        }

        function add() {
            tc.fields = false;

            if ( tc.date == undefined || tc.category == undefined) {
                tc.fields = true;
                return;
            }

            var data = $.param({
                mode: 'create',
                name: tc.name,
                description: tc.description,
                date: tc.date,
                done: 0,
                categoryid: tc.category,
                userid: $cookies.get('userID')
            });

            $http({
                url: '../public/classes/Tasks.php',
                method: 'POST',
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
                console.log(response);
                listAll();
            });
        }

        function setInfo(id, category_id, name, description, date) {
            tc.updateID     = id;
            tc.category     = category_id;
            tc.name         = name;
            tc.description  = description;
            tc.date         = date;
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