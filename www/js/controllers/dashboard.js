var app = angular.module('main');


/*********************************************************************
 * DashCtrl
 *********************************************************************/
app.controller('DashCtrl', function ($scope, $timeout, $ionicLoading, $ionicModal, $ionicPopup, $cordovaCamera, MoodLog) {

	$scope.moods = MoodLog;

	$ionicLoading.show();
	$scope.moods.load().then(function () {
		$ionicLoading.hide();
	});

	$scope.refreshItems = function () {
		$scope.moods.refresh().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	$scope.nextPage = function () {
		$scope.moods.next().then(function () {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};


// Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/mood-add.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the Add modal to close it
  $scope.closeAddMood = function() {
    $scope.modal.hide();
  };

  // Open the Add modal
  $scope.addMood = function() {
    $scope.modal.show();
  };

/*********************************************************************
 * CreateCtrl
 *********************************************************************/


	$scope.resetFormData = function () {
		$scope.formData = {
			'title': '',
			'rate': 5,
			'picture': null
		};
	};
	$scope.resetFormData();

	$scope.trackMood = function (form) {
		if (form.$valid) {

			$ionicLoading.show();
			MoodLog.track($scope.formData).then(function () {
				$scope.resetFormData();
				$ionicLoading.hide();
				form.$setPristine(true);
				//$state.go("tab.dash");
				$timeout(function() {
		      $scope.closeAddMood();
		    }, 1000);

			});
		}
	};

	$scope.addPicture = function () {
		var options = {
			quality: 60,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA, // CAMERA
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 480,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: true
		};

		$cordovaCamera.getPicture(options).then(function (imageData) {
			$scope.formData.picture = imageData;
		}, function (err) {
			console.error(err);
			$ionicPopup.alert({
				title:'Error',
				subTitle: '获取照片出错，请再重试一次！'
			});
		});
	};

});
