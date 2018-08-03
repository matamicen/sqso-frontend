import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/number';
import 'core-js/es6/array';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import 'semantic-ui-css/semantic.css'
// import registerServiceWorker from './registerServiceWorker';
import App from "./components/App";

render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route component={App} />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
  
  // registerServiceWorker();