const React = require('react');
const weatherIcons = require('./icons').default;

const DisplayForecastInfo = ({ weather }) => {
  const icon = weatherIcons[weather.weather[0].description]
  // if api pulls a weather description that is not defined in the weatherIcons object use the default icon
  const Special = icon ? icon : weatherIcons['clear sky']
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Special className="forecast_icon"/>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span>High</span>
          <span>{Math.round(weather.temp.max)}</span></div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <span>Low</span>
          <span>{Math.round(weather.temp.min)}</span>
        </div>
      </div>
    </div>
  );
};

module.exports = DisplayForecastInfo;