const React = require('react');
const weatherIcons = require('./icons').default;

const DisplayWeatherInfo = ({ weather }) => {
  const icon = weatherIcons[weather.weather[0].description]
  // if api pulls a weather description that is not defined in the weatherIcons object use the default icon
  const Special = icon ? icon : weatherIcons['clear sky']
  return (
    <div style={{width: '100%', height: '100%', display: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{height: 72, justifyContent: 'space-between',display: 'flex',width: '60%', margin: '0 auto', marginBottom: 10}}>
        <Special className="weather_icon"/>
        <h1 style={{fontSize: 72, margin: 0, lineHeight: '90%'}}>{Math.round(weather.main.temp)}</h1>
      </div>
      <div className="tempContainer">
        <p style={{fontSize: 30, display: 'flex',justifyContent: 'space-between'}}>        
          <span>{`High: ${Math.round(weather.main.temp_max)}˚`}</span> 
          <span>|</span>
          <span>{`Low: ${Math.round(weather.main.temp_min)}˚`}</span>
        </p>
      </div>
      <p style={{textAlign: 'center', fontSize: 30, margin: 0}}>{weather.weather[0].description}</p>
    </div>
  );
};

module.exports = DisplayWeatherInfo;