import React, { Component } from 'react';
import './App.css';
import {Home} from './components/Home'

class App extends Component {
    constructor(){
        super();
        this.state = {

                };
    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }
  render() {
    return (
      <div className="App">
        < Home />
      </div>
    );
  }
}

export default App;
