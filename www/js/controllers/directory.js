var app = angular.module('main');

app.controller('DirectoryCtrl', function ($scope, $ionicLoading, $ionicModal, $state,
$ionicPopup, Directory) {

  $scope.directory = Directory;
  $scope.query = {
    keyword: ''
  };
  
  var loadDirectory = function() {
    $scope.directory.load($scope.query.keyword).then(function () {
		  $ionicLoading.hide();
	 });
  };
  
  loadDirectory();
  $scope.onSearch = function() {
    loadDirectory();
  };
  

	$ionicLoading.show();
  
	$scope.refreshItems = function () {
		$scope.directory.refresh().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.nextPage = function () {
		$scope.directory.next().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

});

app.controller('DirectoryDetailCtrl', function($scope, $stateParams, Directory) {
  
  $scope.detail = [];
  Directory.get($stateParams.directoryId).then(function(data) {
    $scope.detail = data;
  });
  
});
