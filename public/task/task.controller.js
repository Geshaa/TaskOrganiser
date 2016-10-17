(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('TaskController', TaskController);

    TaskController.$inject = ['$cookies', '$http', '$rootScope', 'popupService'];

    function TaskController($cookies, $http, $rootScope, popupService) {
        var tc = this;

        listAll();

        tc.add              = add;
        tc.update           = update;
        tc.remove           = remove;
        tc.setInfo          = setInfo;
        tc.setDone          = setDone;
        tc.removeCompleted  = removeCompleted;
        tc.undoDeleted      = undoDeleted;
        tc.setEmpty         = setEmpty;


        $rootScope.$on('listByCategory', function(e, data) {
            listByCategory(data);
        });

        $rootScope.$on('listAllTasks', function() {
            listAll();
        });

        $rootScope.$on('deleteCategory', function(e, data) {
            removeFromCategory(data);
        });


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
                listAll();
                popupService.close();
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
                popupService.close();
            });
        }

        function remove(id, categoryid, name, description, date, done) {
            $http({
                url: '../public/classes/Tasks.php?mode=delete&taskid='+id,
                method: 'DELETE'
            })
            .then(function(response) {
                setUndo(categoryid, name, description, date, done);
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

        function removeFromCategory(categoryid) {
            $http({
                url: '../public/classes/Tasks.php?mode=deleteAll&userid='+$cookies.get('userID')+'&categoryid='+categoryid,
                method: 'DELETE'
            })
            .then(function(response) {
                listAll();
            });
        }

        function setUndo(categoryid, name, description, date, done) {

            var data = $.param({
                mode: 'setUndo',
                categoryid: categoryid,
                name: name,
                description: description,
                date: date,
                done: done,
                userid: $cookies.get('userID')
            });

            $http({
                url: '../public/classes/Tasks.php',
                method: 'POST',
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }

        function undoDeleted() {

            var data = $.param({
                mode: 'undo',
                userid: $cookies.get('userID')
            });

            $http({
                url: '../public/classes/Tasks.php',
                method: 'POST',
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
                countUncompleted();
                listAll();
            });
        }

        function setEmpty() {
            tc.name         = null;
            tc.description  = null;
            tc.date         = null;
        }

        function setInfo(id, categoryID, name, description, date) {
            tc.updateID     = id;
            tc.category     = categoryID;
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

        function countCompleted() {
            $http({
                url: '../public/classes/Tasks.php?mode=completed&userid='+$cookies.get('userID'),
                method: 'GET',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
                tc.completed = response.data;
            })
        }

        function listAll() {
            $http({
                url: '../public/classes/Tasks.php?mode=list&userid='+$cookies.get('userID'),
                method: 'GET',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
                if (!response.data[0])
                    tc.noTasks = true;

                tc.tasks = response.data;
                countUncompleted();
                countCompleted();
            });
        }

        function listByCategory(categoryID) {
            $http({
                url: '../public/classes/Tasks.php?mode=listBy&categoryid='+categoryID+'&userid='+$cookies.get('userID'),
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