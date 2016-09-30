(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('TaskController', TaskController);

    TaskController.$inject = ['$cookies', '$http'];

    function TaskController($cookies, $http) {
        var tc = this;

        listAll();

        tc.add              = add;
        tc.update           = update;
        tc.remove           = remove;
        tc.setInfo          = setInfo;
        tc.setDone          = setDone;
        tc.removeCompleted  = removeCompleted;

        function setDone($event, id) {
            var attrVal = $($event.target).attr('data-done'),
                newVal;

            if ( attrVal == 0)
                newVal = 1;
            else
                newVal = 0;

            $($event.target).attr('data-done', newVal);
            $($event.target).closest('.tasks__item').find('h1').toggleClass('completed');

            var data = $.param({
                mode: 'updateDone',
                userid: $cookies.get('userID'),
                taskid: id,
                done: newVal
            });

            $http({
                url: '../public/classes/Tasks.php',
                method: 'POST',
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
                //console.log(response);
                listAll();
            });

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

        function update() {

            var data = $.param({
                mode: 'update',
                userid: $cookies.get('userID'),
                taskid: tc.updateID,
                categoryid: tc.category,
                name: tc.name,
                description: tc.description,
                date: tc.date,
            });

            $http({
                url: '../public/classes/Tasks.php',
                method: 'POST',
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
                listAll();
            });
        }

        function remove(id) {
            $http({
                url: '../public/classes/Tasks.php?mode=delete&taskid='+id,
                method: 'DELETE'
            })
            .then(function(response) {
                listAll();
            });
        }

        function removeCompleted() {
            $http({
                url: '../public/classes/Tasks.php?mode=deleteCompleted&userid='+$cookies.get('userID'),
                method: 'DELETE'
            })
            .then(function(response) {
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

        function countUncompleted() {
            $http({
                url: '../public/classes/Tasks.php?mode=uncompleted&userid='+$cookies.get('userID'),
                method: 'GET',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
                tc.uncompleted = response.data;
            })
        }

        function listAll() {
            $http({
                url: '../public/classes/Tasks.php?mode=list&userid='+$cookies.get('userID'),
                method: 'GET',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
                tc.tasks = response.data;
                countUncompleted();
            });
        }
    }

})();