var React = require('react')
var axios = require('axios')
import * as firebase from 'firebase'

var Time = React.createClass({
  getInitialState: function() {
    return({time: null, militaryTime: false})
  },
  fetchTime: function(lat, lng) {
    var that = this
    axios.get("http://api.timezonedb.com/v2/get-time-zone?key=6XTYES98NFZD&format=json&by=position&lat=" + lat + "&lng=" + lng).then(
      function(time) {
        that.setState({time: time.data.formatted})
      }
    )
  },
  componentDidMount: function() {
    this.fetchLatLng()
    const time = firebase.database().ref().child('time');
    time.on('child_changed', time => {
      if (time.key === "location" || time.key === "x" || time.key === "y" || time.key === "militaryTime") {
        this.fetchLatLng()
      }
    })
  },
  fetchLatLng: function() {
    var that = this
    axios.get("https://kagami-b6130.firebaseio.com/time.json").then(function(time) {
      that.setState({militaryTime: time.data.militaryTime, coords: [time.data.x, time.data.y]})
      axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + time.data.location + "&key=AIzaSyCRFcsIP8jJO4AGISrCI-Iou_en_j6rG08").then(function(location){
        let pos = location.data.results[0].geometry.location
        that.fetchTime(pos.lat, pos.lng)
      })
    })
  },
  parseDate: function(date) {
    let month, day, year
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    date = date.split("-")
    month = months[parseInt(date[1]) - 1]
    day = parseInt(date[2])
    year = date[0]
    return month + " " + day + ", " + year
  },
  render: function() {
    let timeStyle = {
      color: "white",
      fontSize: "72px",
      fontFamily: "Noto Sans",
      fontWeight: "bold",
      textAlign: "center"
    }
    let dateStyle = {
      color: "white",
      fontSize: "30px",
      textAlign: "center"
    }
    let date, time, hour, datetimeStyle
    if (this.state.time) {
      let dateTime = this.state.time.split(" ")
      date = dateTime[0]
      date = this.parseDate(date)
      time = dateTime[1].split(":")
      hour = this.state.militaryTime ? time[0] : parseInt(time[0]) % 12
      time = hour + ":" + time[1]
      let top = (this.state.coords[1] * 100) + "%"
      let left = (this.state.coords[0] * 100) + "%"
      datetimeStyle = {
        display: "block",
        position: "absolute",
        top: top,
        left: left
      }
    } else {
      date = <div />
      time = <div />
    }

    return(
      <div style={datetimeStyle}>
        <div style={timeStyle}>{time}</div>
        <div style={dateStyle}>{date}</div>
      </div>
    )
  }
})

module.exports = Time
