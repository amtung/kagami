var React = require('react');
var axios = require('axios');
import * as firebase from 'firebase';
var DisplayWeatherInfo = require('./displayWeatherInfo');

var Weather = React.createClass({
  getInitialState() {
    return({
      location: null,
      apiWeather: null,
      fahrenheit: true,
      x: 0, 
      y: 0,
    })
  },
  componentDidMount() {
    // get all weather information from firebase once
    axios.get("https://kagami-b6130.firebaseio.com/weather.json")
    .then(({ data : { location, fahrenheit, x, y }}) => {
      this.setState({location, fahrenheit, x, y})
      return
    })
    // get weather infomation based on user's zipcode
    .then(() => this.fetchWeatherInfo())

    // listen for all changes in the weather object
    const weather = firebase.database().ref().child('weather');
    weather.on('child_changed', weather => {
      // when location changes get send out api to receive weather infomation
      if(weather.key !== "onMirror"){
        this.setState({[weather.key]: weather.val()})
      }
      if (weather.key === "location" || weather.key === "fahrenheit") {
        this.fetchWeatherInfo()
      }
    })
  },

  fetchWeatherInfo() {
    const {location, fahrenheit} = this.state;
    // imperial == fahrenheit, metric ==  Celsius
    const temp = fahrenheit ? 'imperial' : 'metric';
    axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${location}&units=${temp}&appid=bcb87e290ad9cf393375a6a5bf00bfb5`).then(({data}) => {
      this.setState({apiWeather: data})
    })
  },
  render() {
    return(
      <div>
        {this.state.apiWeather 
          ? <DisplayWeatherInfo weather={this.state.apiWeather}/> 
          : <div>loading</div>}
      </div>
    )
  }
})

module.exports = Weather
