import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import sqsoApp from './reducers/sqsoApp'
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk';

//initialize store
let store = createStore(sqsoApp, applyMiddleware(thunk));

ReactDOM.render((
          <App store={store} />
), document.getElementById('root'))
