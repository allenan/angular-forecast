angular.module('root', ['services'])

.controller("index", ['$scope', 'Weather', function($scope, Weather) {
  var cities = $scope.cities = [];

  $scope.newCity = '';

  $scope.addCity = function() {
    var newCity = $scope.newCity.trim();
    Weather.fetchWeatherData(newCity).then(function(data) {
      cities.push({
        name: data.name,
        current: data.current,
        forecast: data.forecast
      });
      $scope.newCity = '';
    });
  };

}]);
