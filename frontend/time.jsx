var React = require('react')
var axios = require('axios')
import * as firebase from 'firebase'

var Time = React.createClass({
  getInitialState: function() {
    return({time: null})
  },
  fetchTime: function(lat, lng) {
    var that = this
    axios.get("http://api.timezonedb.com/v2/get-time-zone?key=6XTYES98NFZD&format=json&by=position&lat=" + lat + "&lng=" + lng).then(
      function(time) {
        console.log('fetchTime')
        that.setState({time: time.data.formatted})
      }
    )
  },
  componentDidMount: function() {
    this.fetchLatLng()
    const time = firebase.database().ref().child('time');
    time.on('child_changed', time => {
      if (time.key === "location") {
        this.fetchLatLng()
      }
    })
  },
  fetchLatLng: function() {
    var that = this
    axios.get("https://kagami-b6130.firebaseio.com/time.json").then(function(time) {
      axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + time.data.location + "&key=AIzaSyCRFcsIP8jJO4AGISrCI-Iou_en_j6rG08").then(function(location){
        let pos = location.data.results[0].geometry.location
        that.fetchTime(pos.lat, pos.lng)
      })
    })
  },
  render: function() {
    let timeStyle = {
      color: "black",
      width: "100px",
      height: "100px",
      fontFamily: "Noto Sans",
      textAlign: "center"
    }
    return(
      <div>
        {this.state.time}
      </div>
    )
  }
})

module.exports = Time
