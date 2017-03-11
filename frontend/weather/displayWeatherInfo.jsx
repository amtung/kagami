const React = require('react');
const weatherIcons = {
  'clear sky': require('./weather_icons/Sun.inline.svg'),
  'few clouds': require('./weather_icons/Cloud-Sun.inline.svg'),
  'scattered clouds': require('./weather_icons/Cloud-Sun.inline.svg'),
  'broken clouds': require('./weather_icons/Cloud-Sun.inline.svg'),
  'shower rain': require('./weather_icons/Cloud-Rain.inline.svg'),
  'rain': require('./weather_icons/Cloud-Rain-Sun.inline.svg'),
  'thunderstorm': require('./weather_icons/Cloud-Lightning.inline.svg'),
  'snow': require('./weather_icons/Cloud-Snow-Alt.inline.svg'),
  'mist': require('./weather_icons/Cloud-Fog.inline.svg'),
  'overcast clouds': require('./weather_icons/Cloud-Fog.inline.svg')
}

const DisplayWeatherInfo = ({ weather }) => {
  const Special = weatherIcons[weather.weather[0].description]
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