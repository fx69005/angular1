var app = angular.module('todo', []);

app.directive('ngBlur', function(){
	return function(scope, elem, attrs){
		elem.bind('blur' , function(){
			scope.$apply(attrs.ngBlur)
		})
	}
})

app.controller('TodoCtrl', function($scope, filterFilter, $location){
	$scope.todos = [
		{
			name : 'Tache incomplete',
			completed : false
		},
		{
			name :'Tache complète',
			completed : true
		}
	];

	$scope.statusFilter = {};

	$scope.$watch('todos', function(){
		$scope.remaining = filterFilter($scope.todos,  {completed:false}).length;
		$scope.allchecked = !$scope.remaining;
	}, true)

	if($location.path() == ''){ $location.path('/')}
	$scope.location =  $location;

	$scope.$watch('location.path()', function(path){
		$scope.statusFilter = 
			(path == '/active') ? {completed : false} :
			(path == '/done') ? {completed : true} :
			null;
			
	})

	$scope.removeTodo = function(index){
		$scope.todos.splice(index,1);
	}

	$scope.addTodo = function(){
		$scope.todos.push({
			name : $scope.newtodo,
			completed : false
		})

		$scope.newtodo ='';
	}

	$scope.checkAllTodo = function(allchecked){
		$scope.todos.forEach(function(todo){
			todo.completed = allchecked;
		})
	}

	$scope.editTodo = function(todo){
		todo.editing = false;
	}
})