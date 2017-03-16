const React = require('react');
const weatherIcons = require('./icons').default;

const DisplayWeatherInfo = ({ weather }) => {
  const icon = weatherIcons[weather.weather[0].description]
  // if api pulls a weather description that is not defined in the weatherIcons object use the default icon
  const Special = icon ? icon : weatherIcons['clear sky']
  return (
    <div className="weather">
      <h3>{weather.name}</h3>
      <div className="mainWeather">
        <Special className="weather_icon"/>
        <div className="tempContainer">
          <h1>{Math.round(weather.main.temp)}</h1>
          <p>{
          `${Math.round(weather.main.temp_min)} |
          ${Math.round(weather.main.temp_max)}`
          }</p>
        </div>
      </div>
      <p>{weather.weather[0].description}</p>
    </div>
  );
};

module.exports = DisplayWeatherInfo;