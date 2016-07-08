// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('main', [
	'ionic',
	'ngCordova',
	'ngFileUpload',
	'angularMoment'
])

.run(function($ionicPlatform, $rootScope, $state, $location, AuthService) {

  //console.log(AuthService.user);
  // Redirect unauthorized users to login.
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    if (toState.name !== 'login' && toState.name !== 'register' && AuthService.user == null) {
      $state.go('login');
      event.preventDefault();
    }
  });

	$ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('login', {
		url: "/login",
		cache: false,
		controller: 'LoginCtrl',
		templateUrl: "templates/login.html"
	})
	.state('register', {
		url: "/register",
		cache: false,
		controller: 'SignupCtrl',
		templateUrl: "templates/register.html"
	})
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

	.state('tab.directory', {
    url: '/directory',
    views: {
      'tab-directory': {
        templateUrl: 'templates/tab-directory.html',
        controller: 'DirectoryCtrl'
      }
    }
  })

  .state('tab.directory-detail', {
      url: '/directory/:directoryId',
      views: {
        'tab-directory': {
          templateUrl: 'templates/directory-detail.html',
          controller: 'DirectoryDetailCtrl'
        }
      }
    })

	.state('tab.people', {
    url: '/people',
    views: {
      'tab-people': {
        templateUrl: 'templates/tab-people.html',
        controller: 'PeopleCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
