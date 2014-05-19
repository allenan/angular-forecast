require 'sinatra'
require 'sinatra/cross_origin'
require 'httparty'
require 'geocoder'
require 'json'

configure do
  enable :cross_origin
end

class Forecast
  def initialize(city)
    @city = city
  end

  def show
    return data
  end

  private

  def fetch
    HTTParty.get "https://api.forecast.io/forecast/#{api_key}/#{coordinates}"
  end

  def data
    @data ||= fetch.parsed_response
  end

  def api_key
    "8cb518c4ee07135f95683641b881dec0"
  end

  def coordinates
    results = Geocoder.search(@city)
    "#{results.first.latitude},#{results.first.longitude}"
  end
end

get '/' do
  redirect '/index.html'
end

get '/forecast' do
  content_type :json
  Forecast.new(params[:city]).show.to_json
end
