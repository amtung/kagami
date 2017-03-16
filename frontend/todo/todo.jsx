var React = require('react')
var axios = require('axios')
import * as firebase from 'firebase'

var ToDo = React.createClass({
  getInitialState: function() {
    return({todos: null, coords: [0, 0]})
  },
  fetchTodos: function() {
    var that = this
    axios.get("https://kagami-b6130.firebaseio.com/toDos.json").then(function(todos) {
      that.setState({todos: todos.data, coords: [todos.data.x, todos.data.y]})
    })
  },
  componentDidMount: function() {
    this.fetchTodos()
    const todos = firebase.database().ref().child('toDos');
    todos.on('child_changed', todo => {
      this.fetchTodos()
    })
  },
  displayTodos: function() {
    let display = [];
    let imgSrc
    const todos = this.state.todos.lastest;
    let containerStyle = {
      lineHeight: "25px",
      marginBottom: "5px"
    }
    let todoStyle = {
      verticalAlign: "bottom",
      fontSize: "20px",
      margin: "auto"
    }
    let checkboxStyle = {
      width: "25px",
      height: "25px",
      marginRight: "5px",
      verticalAlign: "top"
    }
    for(let x = 1; x < todos.length; x++) {
      if (todos[x].title) {
        if (todos[x].completed) {
          imgSrc = "./frontend/todo/checkbox.png"
        } else {
          imgSrc = "./frontend/todo/uncheckbox.png"
        }
        display.push(<div style={containerStyle} key={x}><img style={checkboxStyle} src={imgSrc}/><span style={todoStyle}>{todos[x].title}</span></div>)
      }
    }
    return display;
  },
  render: function() {
    let top = (this.state.coords[1] * 100) + "%"
    let left = (this.state.coords[0] * 100) + "%"
    let alltodoStyle = {
      display: "block",
      position: "absolute",
      top: top,
      left: left
    }
    const { todos } = this.state
    return(
      <div style={alltodoStyle}>
        {todos && this.displayTodos()}
      </div>
    )
  }
})

module.exports = ToDo
