import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router'
import './App.css';
import {Header} from './components/Header'

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
              <div>
                  <nav><Header/></nav>
                {this.props.children}
      </div>
    );
  }
}

export default App;
