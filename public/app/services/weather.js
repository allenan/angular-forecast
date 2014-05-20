angular.module('services', [])

.factory('Weather', function($http, $q) {

  /* Public */

  function fetchWeatherData(city) {
    var deferred = $q.defer();

    $http.get('http://localhost:4567/forecast', {params: {city: city}}).
      success(function(data) {
        deferred.resolve(structure(data));
      });

    return deferred.promise;
  }

  /* Private */

  function structure(data) {
      return {
        name: data.formatted_address,
        current: {
          summary: data.currently.summary,
          icon: data.currently.icon,
          temperature: Math.round(data.currently.apparentTemperature),
          windspeed: Math.round(data.currently.windSpeed)
        },
        forecast: structuredForecast(data.daily.data)
      }
  }

  function structuredForecast(days) {
    forecast = [];
    for (var i = 0; i < 4; i ++) {
      var day = days[i];
      forecast.push(
        {
          weekday: getWeekday(day.time),
          icon: day.icon,
          high: Math.round(day.temperatureMax),
          low: Math.round(day.temperatureMin)
        }
      )
    }
    return forecast;
  }

  function getWeekday(unixTime) {
    var day = new Date(unixTime * 1000).getDay();
    return weekdays[day];
  }

  var weekdays = [
    'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
  ]

  /* Exports */

  return {
    fetchWeatherData: fetchWeatherData
  }
});
