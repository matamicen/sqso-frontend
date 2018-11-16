import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/number';
import 'core-js/es6/array';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
// import { ConnectedRouter } from 'react-router-redux';
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store';
import 'semantic-ui-css/semantic.css'

import App from "./components/App";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-124438207-1')

render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route component={App} />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
  
  