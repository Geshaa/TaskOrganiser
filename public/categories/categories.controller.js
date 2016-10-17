(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$cookies', '$http', '$rootScope', 'popupService'];

    function CategoryController($cookies, $http, $rootScope, popupService) {
    var cc = this;

        list();

        cc.add          = add;
        cc.delete       = remove;
        cc.update       = update;
        cc.setInfo      = setInfo;
        cc.list         = list;
        cc.listAllTasks = listAllTasks;
        cc.listBy       = listBy;
        cc.setEmpty     = setEmpty;


        function add() {
            var data = $.param({
                mode: 'create',
                name: cc.name,
                description: cc.description,
                userid: $cookies.get('userID')
            });

            $http({
                url: '../public/classes/Categories.php',
                method: 'POST',
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
                list();
                popupService.close();
            });
        }

        function remove(id) {
            $http({
                url: '../public/classes/Categories.php?mode=delete&categoryid='+id,
                method: 'DELETE'
            })
            .then(function(response) {
                list();
                $rootScope.$broadcast('deleteCategory', id);
            });
        }

        function update() {

            var data = $.param({
                mode: 'update',
                id: cc.updateID,
                name: cc.name,
                description: cc.description
            });

            $http({
                url: '../public/classes/Categories.php',
                method: 'POST',
                data: data,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
                list();
                popupService.close();
            });
        }

        function setInfo(id, name, description) {
            cc.updateID     = id;
            cc.name         = name;
            cc.description  = description;
        }

        function setEmpty() {
            cc.name         = null;
            cc.description  = null;
        }

        function list() {
            $http({
                url: '../public/classes/Categories.php?mode=read&userid='+$cookies.get('userID'),
                method: 'GET',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
                if (!response.data[0])
                    cc.noCategories = true;
                cc.categories = response.data;
            })
        }

        function listAllTasks() {
            $rootScope.$broadcast('listAllTasks');
        }

        function listBy(id) {
            $rootScope.$broadcast('listByCategory', id);
        }
    }

})();