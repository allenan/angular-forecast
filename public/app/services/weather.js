angular.module('services', [])

.factory('Weather', function($http, $q) {

  var weatherData;

  var weekdays = [
    'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
  ]

  var iconMap = {
    'clear-day': 'wicon-sun',
    'clear-night': 'wicon-moon',
    'rain': 'wicon-rainy2',
    'snow': 'wicon-snowy3',
    'sleet': 'wicon-weather4',
    'wind': 'wicon-windy2',
    'fog': 'wicon-weather3',
    'cloudy': 'wicon-cloud2',
    'partly-cloudy-day': 'wicon-cloudy',
    'partly-cloudy-night': 'wicon-cloud'
  }

  function fetchWeatherData(city) {
    var deferred = $q.defer();

    $http.get('http://localhost:4567/forecast', {params: {city: city}}).
      success(function(data) {
        deferred.resolve(structure(data));
      });

    return deferred.promise;
  }

  function getWeekday(unixTime) {
    var day = new Date(unixTime * 1000).getDay();
    return weekdays[day];
  }

  function structuredForecast(days) {
    forecast = [];
    for (var i = 0; i < 4; i ++) {
      var day = days[i];
      forecast.push(
        {
          weekday: getWeekday(day.time),
          icon: iconMap[day.icon],
          high: Math.round(day.temperatureMax),
          low: Math.round(day.temperatureMin)
        }
      )
    }
    return forecast;
  }

  function structure(data) {
      return {
        current: {
          summary: data.currently.summary,
          icon: iconMap[data.currently.icon],
          temperature: Math.round(data.currently.apparentTemperature),
          windspeed: Math.round(data.currently.windSpeed)
        },
        forecast: structuredForecast(data.daily.data)
      }
  }

  return {
    fetchWeatherData: fetchWeatherData
  }
});
