var React = require('react')
var ReactDOM = require('react-dom')
var axios = require('axios')
import * as firebase from 'firebase'
var Time = require('./time.jsx')
var Weather = require('./weather.jsx')

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
      isTimeVisible: true,
      isWeatherVisible: true,
      location: 11362})
  },
  componentDidMount: function() {
    let weather = firebase.database().ref().child('weather');
    const onMirrorWeather = weather.child('onMirror');
    const onMirrorTime = weather.child('onMirror')
    const onMirrorToDo = weather.child('onMirror')
    onMirrorWeather.on('value', snap => {
      console.log("weather", snap.val())
      this.setState({isWeatherVisible: snap.val()})
    })
    onMirrorTime.on('value', snap => {
      console.log("time", snap.val())
      this.setState({isTimeVisible: snap.val()})
    })
    onMirrorToDo.on('value', snap => {
      console.log("todos", snap.val())
      this.setState({isToDoVisible: snap.val()})
    })
  },
  render: function() {
    var appStyle = {
     color: "black",
     width: "100%",
     height: "100%",
     fontFamily: "Noto Sans",
     textAlign: "center"
   };

    return(
      <div style={appStyle}>
        {(this.state.isWeatherVisible) && (<Weather />)}
        {(this.state.isTimeVisible) && (<Time />)}
      </div>
    )
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)
