const React = require('react');

const DisplayWeatherInfo = ({ weather }) => {
  const icon = weatherIcons[weather.weather[0].description]
  // if api pulls a weather description that is not defined in the weatherIcons object use the default icon
  const Special = icon ? icon : weatherIcons['clear sky']
  console.log(Special)
  console.log(weather.weather[0].description)
  return (
    <div className="fiveDay">

    </div>
  );
};

module.exports = DisplayWeatherInfo;