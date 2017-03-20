var React = require('react');
var axios = require('axios');
var moment = require('moment');
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
      time: null,
    })
  },
  componentDidMount() {
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
    this.fetchLatLng();
    const time = firebase.database().ref().child('time');
    time.on('child_changed', time => {
      if (time.key === "location") {
        this.fetchLatLng()
      }
    })
  },
  fetchLatLng() {
    axios.get("https://kagami-b6130.firebaseio.com/time.json")
    .then(({ data: {location} }) => {
      return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyCRFcsIP8jJO4AGISrCI-Iou_en_j6rG08`)
    })
    .then(({data: {results}}) => {
      const pos = results[0].geometry.location
      this.fetchTime(pos.lat, pos.lng)
    })
  },
  fetchTime(lat, lng) {
    axios.get(`http://api.timezonedb.com/v2/get-time-zone?key=ETSK142NQ362&format=json&by=position&lat=${lat}&lng=${lng}`)
    .then((time) => {
      console.log("time")
      this.setState({time: time.data.formatted})
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
    const {apiWeather5Day: {list}, time} = this.state;
    return list.map((day, indx) => 
      <DisplayForecastInfo 
        key={indx} 
        day={moment().add(indx,'days').calendar().split(' ')[0]} 
        time={moment(time).format("h:mm:ss a")}
        weather={day}
      />
    )
  },
  render() {
    const { apiWeather5Day, x, y, time } = this.state;
    const fiveDayStyle = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'space-between',
      top: `${y*100}%`, 
      left: `${x*100}%`, 
      width: '70%',
      height: '30%',
      display: 'flex'
    };
    console.log("forecast")
    return (
      <div>
        {apiWeather5Day && time 
          ? <div style={fiveDayStyle}>{this.showFiveDayForcast()}</div>
          : <div>Loading</div>
        }
      </div>
    )
  }
})

module.exports = Forecast
