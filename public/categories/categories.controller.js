(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$cookies', '$http'];

    function CategoryController($cookies, $http) {
        var cc = this;

        cc.title = $cookies.get('userID');

        var data = $.param({
            mode: 'read',
            userid: $cookies.get('userID')
        });

        $http({
            url: '../public/classes/Categories.php',
            method: 'POST',
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then(function(response) {
            cc.categories = response.data;
        })
    }

})();