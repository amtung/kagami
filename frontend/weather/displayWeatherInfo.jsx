var React = require('react')
var DisplayWeatherInfo = ({ weather }) => (
  <div>
   <h3>{weather.name}</h3>
   <div>
     {/*icon function will go here*/}
     <div>
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

module.exports = DisplayWeatherInfo;