var React = require('react')

var Time = React.createClass({
  getInitialState: function() {
    let time = this.generateTime()
    return(time)
  },
  generateTime: function() {
    let now = new Date()
    let offset = now.getTimezoneOffset() / 60
    let hours = (now.getUTCHours() - offset) % 12
    let minutes = now.getUTCMinutes()
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    return {time: hours + ":" + minutes}
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
