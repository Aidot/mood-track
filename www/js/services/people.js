var app = angular.module('main');

app.service("PeopleService", function ($q, AuthService) {
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
			var People = Parse.Object.extend("User");
			var peopleQuery = new Parse.Query(People);

			peopleQuery.descending('created');
			peopleQuery.notEqualTo("objectId", Parse.User.current().id);

			// Paginate
			console.log(self.page);
			peopleQuery.skip(self.page * self.page_size);
			peopleQuery.limit(self.page_size);

			// Perform the query
			peopleQuery.find({
				success: function (results) {
					angular.forEach(results, function (item) {
						Parse.Promise.when(item).then(function(people) {
							self.results.push(people);
 						});
					});
					//console.debug(self.results);

					// Are we at the end of the list?
					//console.log(results.length);
					if (results.length == 0) {
						self.hasMore = false;
					}

					// Finished
					d.resolve();
				}
			});

			return d.promise;
		}

	};

	return self;
});
