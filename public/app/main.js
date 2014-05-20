angular.module('root', ['services', 'storage'])

.controller("index", ['$scope', '$timeout', 'Weather', 'cityStorage',
            function($scope, $timeout, Weather, cityStorage) {

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

  var updateAll = function() {
    angular.forEach(cities, function(city) {
      Weather.fetchWeatherData(city.name).then(function(cityData) {
        console.log(cityData);
        cities[cities.indexOf(city)] = cityData;
        cityStorage.put(cities);
      });
    });
  };

  $scope.updateAll = updateAll;

  var poll = function() {
    $timeout(function() {
      updateAll();
      poll();
    }, 3000);
  };

  //poll();

}]);
