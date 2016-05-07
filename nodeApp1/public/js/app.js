angular.module('todoApp',['ngRoute']);
angular.module('todoApp').config(function ($routeProvider){
    $routeProvider.
            when('/',{
                templateUrl:'templates/home.html' ,
                controller:'homeCtrl',
           })
})
angular.module('todoApp').controller('homeCtrl',function($http,$scope) {
	$http({
                url: '/todos',
                method: 'GET',
            }).success(function (res) {
                console.log(res);
                $scope.todos=res;
            }).error(function (err) {
                console.log(err);
            })


	$scope.createTodo=function () { 
	// alert('raw inserted');
    	$http({
            url: '/todos',
            method: 'POST',
            data: {"text":$scope.text}
        }).success(function (res) {
            console.log(res);
            // window.location='/'
            $scope.todos=res;

        })
    }

    $scope.delete = function(id) {
        $http({
            url: '/todos/'+id,
            method: 'DELETE'
        }).success(function (res) {
            $scope.todos=res;

        })
    }
})


