var app = angular.module('main');

app.service("MoodLog", function ($q, AuthService) {
	var self = {
		'page': 0,
		'page_size': 3,
		'isLoading': false,
		'isSaving': false,
		'hasMore': true,
		'results': [],
		'refresh': function () {
			self.page = 0;
			self.isLoading = false;
			self.isSaving = false;
			self.hasMore = true;
			self.results = [];
			return self.load();
		},
		'next': function () {
			self.page += 1;
			return self.load();
		},
		'load': function () {
			self.isLoading = true;
			var d = $q.defer();

			// Initialise Query
			var Mood = Parse.Object.extend("Mood");
			var moodQuery = new Parse.Query(Mood);
			moodQuery.descending('created');
			moodQuery.equalTo("owner", AuthService.user);

			// Paginate
			moodQuery.skip(self.page * self.page_size);
			moodQuery.limit(self.page_size);

			// Perform the query
			moodQuery.find({
				success: function (results) {
					angular.forEach(results, function (item) {
						// var meal = new Meal(item);
						// self.results.push(meal)
						Parse.Promise.when(item).then(function(mood) {
							//console.log(people);
							self.results.push(mood);
 						});
					});
					console.debug(self.results);

					// Are we at the end of the list?
					if (results.length == 0) {
						self.hasMore = false;
					}

					// Finished
					d.resolve();
				}
			});

			return d.promise;
		},
		'track': function (data) {
			self.isSaving = true;
			var d = $q.defer();

			var Mood = Parse.Object.extend("Mood");
			var user = AuthService.user;
			var file = data.picture ? new Parse.File("photo.jpg", {base64: data.picture}) : null;

			var mood = new Mood();
			mood.set("owner", user);
			mood.set("picture", file);
			mood.set("title", data.title);
			mood.set("rate", parseInt(data.rate));
			mood.set("created", new Date());

			mood.save(null, {
				success: function (mood) {
					console.log("Mood tracked");
					self.results.unshift(mood);
					d.resolve(mood);
				},
				error: function (item, error) {
					$ionicPopup.alert({
						title: "Error saving your mood",
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

// Contacts
app.service("Directory", function ($q, AuthService) {
	var self = {
		'page': 0,
		'page_size': 20,
		'isLoading': false,
		'isSaving': false,
		'hasMore': true,
		'results': [],
		'refresh': function () {
			self.page = 0;
			self.isLoading = false;
			self.isSaving = false;
			self.hasMore = true;
			self.results = [];
			return self.load();
		},
		'next': function () {
			self.page += 1;
			return self.load();
		},
		'load': function (params) {
			self.isLoading = true;
			var d = $q.defer();

			// Initialise Query
			var contacts = Parse.Object.extend("Contacts");
			var query = new Parse.Query(contacts);
			query.descending('created');
      
      console.log(params);
			// Paginate
      if (params != '' ) {
        self.results = [];
        query.contains('title', params);
      }
			query.skip(self.page * self.page_size);
			query.limit(self.page_size);

			// Perform the query
			query.find({
				success: function (results) {
					angular.forEach(results, function (item) {
						Parse.Promise.when(item).then(function(contacts) {
							self.results.push(contacts);
 						});
					});
					console.debug(self.results);

					// Are we at the end of the list?
					if (results.length == 0) {
						self.hasMore = false;
					}

					// Finished
					d.resolve();
				}
			});

			return d.promise;
		},
    'get': function (id) {
      var d = $q.defer();
      var query = new Parse.Query('Contacts');
      //query.include('Category');
      query.get(id, {
        success: function (detail) {
          d.resolve(detail);
        },
        error: function (error) {
          d.reject(error);
        }
      });
      return d.promise;
    },
    // end get detail by id
	};

	return self;
});

// Chats
app.service("Conversation", function ($q, AuthService) {
	var self = {
		'page': 0,
		'page_size': 20,
		'isLoading': false,
		'isSaving': false,
		'hasMore': true,
		'results': [],
		'refresh': function () {
			self.page = 0;
			self.isLoading = false;
			self.isSaving = false;
			self.hasMore = true;
			self.results = [];
			return self.load();
		},
		'next': function () {
			self.page += 1;
			return self.load();
		},
		'load': function () {
			self.isLoading = true;
			var d = $q.defer();

			// Initialise Query
			var chat = Parse.Object.extend("_Conversation");
			var query = new Parse.Query(chat);
			query.descending('created');
      
			// Paginate

			query.skip(self.page * self.page_size);
			query.limit(self.page_size);

			// Perform the query
			query.find({
				success: function (results) {
					angular.forEach(results, function (item) {
						Parse.Promise.when(item).then(function(chat) {
							self.results.push(chat);
 						});
					});
					console.debug(self.results);

					// Are we at the end of the list?
					if (results.length == 0) {
						self.hasMore = false;
					}

					// Finished
					d.resolve();
				}
			});

			return d.promise;
		},
    'get': function (id) {
      
      var d = $q.defer();
      var query = new Parse.Query('_Conversation');
      
      query.get(id, {
        success: function (detail) {
//          console.log(detail);
          d.resolve(detail);
        },
        error: function (error) {
          d.reject(error);
        }
      });
      return d.promise;
    },
    // end get detail by id
	};

	return self;
});
