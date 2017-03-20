const React = require('react');
const weatherIcons = require('./icons').default;

const DisplayForecastInfo = ({ weather, time, day }) => {
  const icon = weatherIcons[weather.weather[0].description]
  // if api pulls a weather description that is not defined in the weatherIcons object use the default icon
  const Special = icon ? icon : weatherIcons['clear sky']
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minWidth: 145}}>
      <h1 style={{fontSize: 30, margin: 0}}>{day}</h1>
<<<<<<< HEAD
      <div style={{width: 200, height: 200}}>
=======
      <div style={{width: "45%", height: "45%"}}>
>>>>>>> 768ee39f4113a84e9034af7bf942f98e33ab90b4
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