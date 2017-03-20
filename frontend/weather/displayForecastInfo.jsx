const React = require('react');
const weatherIcons = require('./icons').default;

const DisplayForecastInfo = ({ weather, time, day }) => {
  const icon = weatherIcons[weather.weather[0].description]
  // if api pulls a weather description that is not defined in the weatherIcons object use the default icon
  const Special = icon ? icon : weatherIcons['clear sky']
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minWidth: 145}}>
      <h1 style={{fontSize: 30, margin: 0}}>{day}</h1>
      <div style={{width: 45%, height: 45%}}>
        <Special className="forecast_icon"/>
      </div>
      <div style={{display: 'flex', width: '85%', justifyContent: 'space-between'}}>
        <p style={{margin: 0, fontSize: 30, width: 'auto'}}>{`${Math.round(weather.temp.max)}˚`}</p>
        <p style={{margin: 0, fontSize: 30, width: 'auto'}}>{`${Math.round(weather.temp.min)}˚`}</p>
      </div>
    </div>
  );
};

module.exports = DisplayForecastInfo;