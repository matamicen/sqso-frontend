import React from 'react';
import { Route } from 'react-router';

export default (
  <Route>
    <Route path="/" />
    <Route path="/follow" />
    <Route path="/signup" />
    <Route path="/login" />
    <Route path="/terms" />
    <Route path="/privacy" />
    <Route path="/faq" />
    {/* <Route path="/tutorials" /> */}
    <Route path="/download" />
    <Route path="/changepassword" />
    <Route path="/notifications" />
    <Route path="/:qra" />    
  </Route>
);
