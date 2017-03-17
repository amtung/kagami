var React = require('react')
var axios = require('axios')
import * as firebase from 'firebase'

var Time = React.createClass({
  getInitialState: function() {
    return({author: null, fullQuote: null, coords: [0, 0]})
  },
  componentDidMount: function() {
    this.fetchQuote()
    const quote = firebase.database().ref().child('quote');
    quote.on('child_changed', quote => {
      this.fetchQuote()
    })
  },
  fetchQuote: function() {
    var that = this
    axios.get("https://kagami-b6130.firebaseio.com/quote.json").then(function(quote) {
      that.setState({
        author: quote.data.author,
        fullQuote: quote.data.fullQuote,
        coords: [quote.data.x, quote.data.y]
      })
    })
  },
  render: function() {
    let containerStyle = {
      display: "block",
      position: "absolute",
      top: (this.state.coords[1] * 100) + "%",
      left: (this.state.coords[0] * 100) + "%"
    }
    let quoteStyle = {
      color: "white",
      fontSize: "30px",
      fontFamily: "Noto Sans",
      fontStyle: "italic"
    }
    let authorStyle = {
      color: "white",
      fontSize: "30px",
      textAlign: "right",
      fontWeight: "bold"
    }

    if (this.state.author && this.state.fullQuote) {
      return(
        <div style={containerStyle}>
          <div style={quoteStyle}><q>{this.state.fullQuote}</q></div>
          <div style={authorStyle}>-{this.state.author}</div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }


  }
})

module.exports = Time
