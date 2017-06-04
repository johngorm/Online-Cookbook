let myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){

	
	$scope.getRecipes = function() {
		$http.get('/recipe').then(function(recipes){
			$scope.cookbook = recipes.data;
			
		}).catch(function (error){
			console.log(error)
		});
	};

	$scope.getRecipes();

	$scope.searchIngredient = function() {
		console.trace($scope.ingredient_search);
		if($scope.ingredient_search !== ''){
			$http.get('/recipe/ingredient/' + $scope.ingredient_search).then(function(recipes){
				console.log(recipes);
				$scope.cookbook = recipes.data;
			});
		}
		else{
			$scope.getRecipes();
		}
	};

	$scope.addRecipe = function() {
		console.log($scope.recipe);
		$http.post('/recipe', $scope.recipe).then(function(recipe){
			$scope.getRecipes();

		}).catch(function(error){
			console.log(error);
		});
	};

	$scope.deleteRecipe = function(id) {
		$http.delete('/recipe/' + id).then(function(response){
			// $http.get('/recipe').then(function(recipes){
				$scope.getRecipes();
	
		}).catch(function(error){
			console.log(error);
		});
	};



	
}]);