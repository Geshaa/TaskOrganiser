(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('TaskController', TaskController);

    TaskController.$inject = ['$cookies', '$http', '$rootScope', 'popupService', 'tasksActions'];

    function TaskController($cookies, $http, $rootScope, popupService, tasksActions) {
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
            window.console.log($event);

            var newVal = tasksActions.toggleCompleted($event);

            var data = $.param({
                mode: 'updateDone',
                userid: $cookies.get('userID'),
                taskid: id,
                done: newVal
            });

            tasksActions.modify(data).then(function(response) {
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

            tasksActions.modify(data).then(function(response) {
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

            tasksActions.modify(data).then(function(response) {
                listAll();
                popupService.close();
            });
        }

        function remove(id, categoryid, name, description, date, done) {
            var data = $.param({
                mode: 'delete',
                taskid: id
            });

            tasksActions.removeTasks(data).then(function(response) {
                setUndo(categoryid, name, description, date, done);
                listAll();
            });
        }

        function removeCompleted() {
            var data = $.param({
                mode: 'deleteCompleted',
                userid: $cookies.get('userID')
            });

            tasksActions.removeTasks(data).then(function(response) {
                listAll();
            });
        }

        function removeFromCategory(categoryid) {

            var data = $.param({
                mode: 'deleteAll',
                userid: $cookies.get('userID'),
                categoryid: categoryid
            });

            tasksActions.removeTasks(data).then(function(response) {
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

            tasksActions.undo(data).then(function() {
                tc.showUndo = true;
            });
        }

        function undoDeleted() {

            var data = $.param({
                mode: 'undo',
                userid: $cookies.get('userID')
            });

            tasksActions.undo(data).then(function(response) {
                countUncompleted();
                listAll();
                tc.showUndo = false;
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
            var data = $.param({
                mode: 'uncompleted',
                userid: $cookies.get('userID')
            });

            tasksActions.countTasks(data).then(function(response) {
                tc.uncompleted = response.data;
            })
        }

        function countCompleted() {
            var data = $.param({
                mode: 'completed',
                userid: $cookies.get('userID')
            });

            tasksActions.countTasks(data).then(function(response) {
                tc.completed = response.data;
            })
        }

        function listAll() {
            var data = $.param({
                mode: 'list',
                userid: $cookies.get('userID')
            });

            tasksActions.list(data).then(function(response) {
                if (!response.data[0])
                    tc.noTasks = true;

                tc.tasks = response.data;
                countUncompleted();
                countCompleted();
            });
        }

        function listByCategory(categoryID) {
            var data = $.param({
                mode: 'listBy',
                categoryid: categoryID,
                userid: $cookies.get('userID')
            });

            tasksActions.list(data).then(function(response) {
                tc.tasks = response.data;
                countUncompleted();
            });
        }
    }

})();