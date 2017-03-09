var React = require('react')
var axios = require('axios')
import * as firebase from 'firebase'

var Weather = React.createClass({
  getInitialState: function() {
    return({
      location: null,
      apiWeather: null,
      fahrenheit: true,
      x: 0, y: 0
    })
  },
  componentDidMount: function() {
    axios.get("https://kagami-b6130.firebaseio.com/.json").then(function(res){
      console.log(res)
    })
    this.fetchWeatherInfo(11362)
    let weather = firebase.database().ref().child('weather');
    weather.on('child_changed', weather => {
      if (weather.key === "location") {
        this.fetchWeatherInfo(weather.val())
      }
      this.setState({[weather.key]: weather.val()})
    }, function(errorObject) {
      console.log(errorObject)
    })
  },
  fetchWeatherInfo: function(location) {
    var that = this
    axios.get("http://api.openweathermap.org/data/2.5/weather?zip=" + location + "&appid=bcb87e290ad9cf393375a6a5bf00bfb5").then(function(weather){
      that.setState({apiWeather: weather})
    })
  },
  render: function() {
    let weather = this.state.apiWeather ? this.state.apiWeather.data.weather[0].description : "loading"
    return(
      <div>
        {weather}
      </div>
    )
  }
})

module.exports = Weather
