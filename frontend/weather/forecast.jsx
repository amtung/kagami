var React = require('react');
var axios = require('axios');
import * as firebase from 'firebase';
var DisplayForecastInfo = require('./displayForecastInfo');

var Forecast = React.createClass({
  getInitialState() {
    return({
      location: null,
      apiWeather5Day: null,
      isFiveDayForecast: false, 
      fahrenheit: true,
      x: 0,
      y: 0,
    })
  },
  componentDidMount() {
    console.log("data")
    // get all weather information from firebase once
    axios.get("https://kagami-b6130.firebaseio.com/forecast.json")
    .then(({ data : { location, fahrenheit, x, y}}) => {
      this.setState({location, fahrenheit, x, y})
    })
    // get forecast infomation based on user's zipcode
    .then(() => this.fetch5Day())

    // listen for all changes in the forecast object
    const forecast = firebase.database().ref().child('forecast');
    forecast.on('child_changed', forecast => {
      // when location changes get send out api to receive forecast infomation
      if(forecast.key !== "onMirror"){
        this.setState({[forecast.key]: forecast.val()})
      }
      if (forecast.key === "location" || forecast.key === "fahrenheit") {
        this.fetch5Day()
      }
    })
  },
  fetch5Day(){
    const {location, fahrenheit} = this.state;
    // imperial == fahrenheit, metric ==  Celsius
    const temp = fahrenheit ? 'imperial' : 'metric';
    axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?zip=${location}&units=${temp}&appid=93163a043d0bde0df1a79f0fdebc744f&cnt=5`).then(({data}) => {
      this.setState({apiWeather5Day: data})
    })
  },
  showFiveDayForcast(){
    const {apiWeather5Day: {list}} = this.state;
    console.log(list)
    return list.map((day, indx) => <DisplayForecastInfo key={indx} weather={day}/>)
  },
  render() {
    const { apiWeather5Day, x, y } = this.state;
    const fiveDayStyle = {
      position: 'absolute',
      top: `${y*100}%`, 
      left: `${y*100}%`, 
      width: '50%', 
      display: 'flex'
    };
    return (
      <div>
        {apiWeather5Day 
          ? <div style={fiveDayStyle}>{this.showFiveDayForcast()}</div>
          : <div>Loading</div>
        }
      </div>
    )
  }
})

module.exports = Forecast
