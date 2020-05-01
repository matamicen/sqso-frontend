import * as Sentry from "@sentry/browser";
import "core-js/es6/array";
import "core-js/es6/map";
import "core-js/es6/number";
import "core-js/es6/set";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
// import { googleAnalytics } from "../reactGAMiddlewares";
import "semantic-ui-css/semantic.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import packageJson from "../package.json";
import App from "./components/App";
import GA from "./GoogleAnalytics";
import "./ReactotronConfig";
import reducer from "./reducers";
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
    }
  });
}


const store =
  process.env.NODE_ENV !== "production"
    ? createStore(
        reducer,
        compose(
          applyMiddleware(thunk),
          console.tron.createEnhancer()
        )
      )
    : createStore(reducer, compose(applyMiddleware(thunk)));

render(
  <Provider store={store}>
    <BrowserRouter>
      <GA.RouteTracker />
      <Route component={App} />
      <ToastContainer autoClose={2000} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
