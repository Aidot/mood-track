// var app = angular.module('main', []);
var app = angular.module('main');

app.service('AuthService', function ($q, $ionicPopup) {

	var self = {

		user: Parse.User.current(),

		login: function (email, password) {
			var d = $q.defer();

			Parse.User.logIn(email, password, {
				success: function (user) {
					console.log("Logged In");
					self.user = user;
					d.resolve(self.user);
				},
				error: function (user, error) {
					$ionicPopup.alert({
						title: 'Login Error',
						subTitle: error.message
					});
					d.reject(error);
				}
			});

			return d.promise;
		},
		signup: function (email, name, password) {
			var d = $q.defer();

			var user = new Parse.User();
			user.set('username', email);
			user.set('name',name);
			user.set('password',password);
			user.set('email',email);

			user.signUp(null,{
				success: function (user) {
					console.log("Account Created");
					self.user = user;
					d.resolve(self.user);
				},
				error: function (user, error) {
					$ionicPopup.alert({
						title:'Signup Error',
						subTitle: error.message
					});
					d.reject(error);
				}
			});


			return d.promise;
		},
		'update': function (data)  {
			var d = $q.defer();

			var user = self.user;
			var file = data.level_picture ? new Parse.File("photo.jpg", {base64: data.level_picture}) : null;

			user.set("username", data.email);
			user.set("name", data.name);
			user.set("email", data.email);
			user.set("mobile", data.mobile);
			user.set("bio", data.bio);
			user.set("level", parseInt(data.level));
			user.set("level_id", data.level_id);
			user.set("level_picture", file);
			user.set("real_name", data.real_name);
			user.set("real_id", data.real_id);

			user.save(null, {
				success: function (user) {
					self.user = user;
					d.resolve(self.user);
				},
				error: function (user, error) {
					$ionicPopup.alert({
						title: "Save Error",
						subTitle: error.message
					});
					d.reject(error);
				}
			});

			return d.promise;
		}

	};

	return self;
});
