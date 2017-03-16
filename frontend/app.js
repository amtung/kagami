var React = require('react')
var ReactDOM = require('react-dom')
var axios = require('axios')
import * as firebase from 'firebase'
var Time = require('./time.jsx')
var Weather = require('./weather/weather.jsx')
var Forecast = require('./weather/forecast.jsx')
var ToDo = require('./todo/todo.jsx');
console.log(Forecast)
require('../style.css')

var config = {
  apiKey: "AIzaSyD65RVK53H_bAllqyrrjuSg_t05v8OF5Wk",
  authDomain: "kagami-b6130.firebaseapp.com",
  databaseURL: "https://kagami-b6130.firebaseio.com",
  storageBucket: "kagami-b6130.appspot.com",
  messagingSenderId: "328675898219"
};

firebase.initializeApp(config);

var App = React.createClass({
  getInitialState: function() {
    return({
      width: window.innerWidth,
      height: window.innerHeight,
      isTimeVisible: false,
      isWeatherVisible: false,
      isForecastVisible: false,
      location: 11362})
  },
  componentDidMount: function() {
    // weather listener
    console.log("con")
    const weather = firebase.database().ref().child('weather');
    const onMirrorWeather = weather.child('onMirror');
    onMirrorWeather.on('value', snap => {
      this.setState({isWeatherVisible: snap.val()})
    })
    // forcast listener
    const forecast = firebase.database().ref().child('forecast');
    const onMirrorForecast = forecast.child('onMirror');
    onMirrorForecast.on('value', snap => {
      console.log(snap.val())
      this.setState({isForecastVisible: snap.val()})
    })

    // time listener
    const time = firebase.database().ref().child('time');
    const onMirrorTime = time.child('onMirror')
    onMirrorTime.on('value', snap => {
      this.setState({isTimeVisible: snap.val()})
    })

    // toDo listener
    const toDo = firebase.database().ref().child('toDos');
    const onMirrorToDo = toDo.child('onMirror')
    onMirrorToDo.on('value', snap => {
      this.setState({isToDoVisible: snap.val()})
    })
  },
  render: function() {
    var appStyle = {
      color: "white",
      position: "relative",
      width: "100%",
      height: "100vh",
      fontFamily: "Noto Sans"
    };
    return(
      <div style={appStyle}>
        {this.state.isWeatherVisible && <Weather />}
        {this.state.isForecastVisible && <Forecast />}
        {this.state.isTimeVisible && <Time />}
        {this.state.isToDoVisible && <ToDo />}
      </div>
    )
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
