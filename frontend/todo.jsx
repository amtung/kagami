var React = require('react')
var axios = require('axios')
import * as firebase from 'firebase'

var ToDo = React.createClass({
  getInitialState: function() {
    return({todos: null})
  },
  fetchTodos: function() {
    var that = this
    axios.get("https://kagami-b6130.firebaseio.com/toDos.json").then(function(todos) {
      that.setState({todos: todos.data})
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
    const todos = this.state.todos.lastest;
    for(let x = 1; x < todos.length; x++) {
      display.push(<div key={x}>{todos[x].title}</div>)
    }
    return display;
  },
  render: function() {
    const { todos } = this.state
    return(
      <div>
        {todos && this.displayTodos()}
      </div>
    )
  }
})

module.exports = ToDo
