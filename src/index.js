import "core-js/es6/map";
import "core-js/es6/set";
import "core-js/es6/number";
import "core-js/es6/array";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { Route, BrowserRouter } from "react-router-dom";

import { googleAnalytics } from "./reactGAMiddlewares";
import "semantic-ui-css/semantic.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./components/App";
import ReactGA from "react-ga";
import * as Sentry from "@sentry/browser";
import packageJson from "../package.json";

import "./ReactotronConfig";
import Reactotron from "./ReactotronConfig";

const RELEASE = packageJson.version;
if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://2f1b1ed20458466ab2c6c66716678605@sentry.io/1441458",
    release: RELEASE,
    environment: process.env.NODE_ENV,
    beforeSend(event, hint) {
      // Check if it is an exception, and if so, show the report dialog
      if (event.exception) {
        Sentry.showReportDialog({ eventId: event.event_id });
      }
      return event;
      // eslint-disable-next-line prettier/prettier
    }
  });
}
ReactGA.initialize("UA-124438207-1");

const store =
  process.env.NODE_ENV !== "production"
    ? createStore(
        reducer,
        compose(
          applyMiddleware(thunk, googleAnalytics),
          Reactotron.createEnhancer()
        )
      )
    : createStore(reducer, compose(applyMiddleware(thunk, googleAnalytics)));

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
