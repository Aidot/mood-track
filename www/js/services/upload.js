'use strict';
angular.module('main')
.factory('File', function ($q) {
  
  return {
    
    upload: function (file) {

      var defer = $q.defer();
      var parseFile = new Parse.File(file.name, file);

      parseFile.save({
      	success: function (savedFile) {
      	  defer.resolve(savedFile);
		},
		error: function (error) {
	      defer.reject(error);
		}
	  });
			 
	  return defer.promise;
		},
  };
});