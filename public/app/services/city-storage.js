angular.module('storage', [])

.factory('cityStorage', function() {
  var STORAGE_ID = 'cities-forecast';

  return {
    get: function() {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },
    put: function(cities) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(cities));
    }
  };
});
