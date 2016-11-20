(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$cookies', '$http', '$rootScope', 'popupService', 'categoriesActions'];

    function CategoryController($cookies, $http, $rootScope, popupService, categoriesActions) {
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

            categoriesActions.addEdit(data).then(function(response) {
                list();
                popupService.close();
            });
        }

        function remove(id) {
            var data = $.param({
                mode: 'delete',
                categoryid: id
            });

            categoriesActions.remove(data).then(function(response) {
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

            categoriesActions.addEdit(data).then(function(response) {
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
            var data = $.param({
                mode: 'read',
                userid: $cookies.get('userID')
            });

            categoriesActions.list(data).then(function(response) {
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