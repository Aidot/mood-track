var app = angular.module('main');

/*
 * AccountCtrl
*/
app.controller('AccountCtrl', function ($scope, $state, $ionicHistory, AuthService, Upload, File, $ionicPopup, $cordovaCamera) {

	var userData = AuthService.user.attributes;
	$scope.formData = {
		name: userData.name,
		email: userData.email,
		mobile: userData.mobile,
		bio: userData.bio,
		picture: userData.picture,
		level: userData.level,
		level_id: userData.level_id,
		level_picture: userData.level_picture,
		real_name: userData.real_name,
		real_id: userData.real_id
	};

	$scope.submit = function (form) {
		if (form.$valid) {
			console.log("AccountCtrl::submit");
			AuthService.update($scope.formData).then(function () {
				//$state.go("tab.dash");
				$state.go($state.current, {}, {reload: true});
			});
		}
	};

	/*Upload Avatar*/
	$scope.uploadImageOne = function (file) {
	    if(file == null) {
	 	    return;
	    } else if (file.type.match(/image.*/) == null) {
	      alert("File not supported.");
	 	  } else if (file.$error) {
	      alert("File too large. Max 2MB.");
	    } else {

	      $scope.isImageOneUploading = true;
	      $scope.imageOneFilename = file.name;

	 		  File.upload(file).then(function (savedFile) {

	        $scope.formData.picture = savedFile;
	        $scope.isImageOneUploading = false;
	        alert('File uploaded');
	 		  },
	      function (error) {
	        $scope.isImageOneUploading = false;
	        alert(error.message);
	 		  })
	 	  }
	 	};
/*
	Add Level Picture
*/
	$scope.addLevelPicture = function () {
		var options = {
			quality: 50,
			destinationType: Camera.DestinationType.DATA_URL,
			sourceType: Camera.PictureSourceType.CAMERA, // CAMERA
			allowEdit: true,
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 480,
			popoverOptions: CameraPopoverOptions,
			saveToPhotoAlbum: true
		};

		$cordovaCamera.getPicture(options).then(function (imageData) {
			$scope.formData.level_picture = imageData;
		}, function (err) {
			console.error(err);
			$ionicPopup.alert({
				title:'Error',
				subTitle: '获取照片出错，请再重试一次！'
			});
		});
		};
/*
			Logout
*/
	$scope.logout = function () {
		console.log("AccountCtrl::logout");
		Parse.User.logOut();
		$ionicHistory.clearCache().then(function() {
	    //now you can clear history or goto another state if you need
	    $ionicHistory.clearHistory();
	    $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
	    $state.go('login');
		});
	};
});
