import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import {Home} from './components/Home'
import {SignUp} from './components/Auth/SignUp'
import './index.css';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Home} />
            <Route path='auth'>
                <Route path='signup' component={SignUp}></Route>
            </Route>
        </Route>
    </Router>

), document.getElementById('root'))
