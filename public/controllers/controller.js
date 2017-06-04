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
		if($scope.ingredient_search !== ''){
			$http.get('/recipe/ingredient/' + $scope.ingredient_search).then(function(recipes){
				$scope.cookbook = recipes.data;
			}).catch(function(error){
				console.log(error);
			});
		}
		else{
			$scope.getRecipes();
		}
	};

	$scope.addRecipe = function() {
		$http.post('/recipe', $scope.recipe).then(function(newRecipe){
			$scope.recipe = null;
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