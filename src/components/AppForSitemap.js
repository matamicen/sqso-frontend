const React = require("react").default;

const Route = require("react-router").Route;

module.exports =  (
  <Route>
    <Route path="/" />
    <Route path="/follow" />
    <Route path="/signup" />
    <Route path="/:qra" />
    <Route path="/login" />
    <Route path="/terms" />
    <Route path="/privacy" />
    <Route path="/changepassword" />
    <Route path="/notifications" />
  </Route>
);
