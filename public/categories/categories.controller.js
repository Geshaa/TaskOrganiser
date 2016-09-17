(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$cookies', '$http'];

    function CategoryController($cookies, $http) {
        var cc = this;

        list();

        cc.add      = add;
        cc.delete   = remove;

        //cc.showAdd = function() {
        //    alert('add');
        //}



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
            });
        }

        function remove(id) {
            $http({
                url: '../public/classes/Categories.php?mode=delete&categoryid='+id,
                method: 'DELETE'
            })
            .then(function(response) {
                console.log(response);
                list();
            });
        }

        function update(id) {

        }

        function list() {
            $http({
                url: '../public/classes/Categories.php?mode=read&userid='+$cookies.get('userID'),
                method: 'GET',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .then(function(response) {
                    cc.categories = response.data;
                })
        }
    }

})();