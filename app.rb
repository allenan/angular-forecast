require 'sinatra'
require 'sinatra/cross_origin'
require 'httparty'
require 'geocoder'
require 'json'

configure do
  enable :cross_origin
end

class Forecast
  def initialize(city_name)
    @city = find_city(city_name)
  end

  def show
    return data
  end

  private

  def find_city(city_name)
    Geocoder.search(city_name).first
  end

  def data
    fetch_weather.parsed_response.merge(formatted_address: @city.formatted_address)
  end

  def fetch_weather
    HTTParty.get "https://api.forecast.io/forecast/#{api_key}/#{coordinates}"
  end

  def api_key
    "8cb518c4ee07135f95683641b881dec0"
  end

  def coordinates
    "#{@city.latitude},#{@city.longitude}"
  end
end

get '/' do
  redirect '/index.html'
end

get '/forecast' do
  content_type :json
  Forecast.new(params[:city]).show.to_json
end
