angular.module('root', ['services', 'storage'])

.controller("index", ['$scope', 'Weather', 'cityStorage',
            function($scope, Weather, cityStorage) {

  var cities = $scope.cities = cityStorage.get();

  $scope.newCity = '';

  $scope.addCity = function() {
    var newCity = $scope.newCity.trim();
    Weather.fetchWeatherData(newCity).then(function(cityData) {
      cities.push(cityData);
      cityStorage.put(cities);
      $scope.newCity = '';
    });
  };

  $scope.removeCity = function(city) {
    cities.splice(cities.indexOf(city), 1);
    cityStorage.put(cities);
  };

}]);
