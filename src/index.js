import "core-js/es6/map";
import "core-js/es6/set";
import "core-js/es6/number";
import "core-js/es6/array";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { Route, BrowserRouter } from "react-router-dom";

import { googleAnalytics } from "./reactGAMiddlewares";
import "semantic-ui-css/semantic.css";

import App from "./components/App";
import ReactGA from "react-ga";
ReactGA.initialize("UA-124438207-1");

const store = createStore(reducer, applyMiddleware(thunk, googleAnalytics));

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
