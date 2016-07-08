var app = angular.module('main');


/*********************************************************************
 * PeopleCtrl
 *********************************************************************/
app.controller('PeopleCtrl', function ($scope, $ionicLoading, PeopleService) {

	$scope.people = PeopleService;

	console.log($scope.people);

	$ionicLoading.show();
	$scope.people.load().then(function () {
		$ionicLoading.hide();
	});

	$scope.refreshItems = function () {
		$scope.people.refresh().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.nextPage = function () {
		$scope.people.next().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

});
