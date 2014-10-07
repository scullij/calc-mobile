angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('Companies', function() {

  var companies = [
    { id: 0, name: 'Test1' },
    { id: 1, name: 'test2' }
  ];

  return {
    all: function() {
      return companies;
    }
  }
})

.factory('SiteData', function($http){

  return {

    load: function(){
      return $http({method: 'GET', url: 'http://localhost:3000/sitio.data'});
    }
  }

});
