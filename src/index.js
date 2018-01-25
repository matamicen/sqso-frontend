import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import {ConnectedRouter, routerMiddleware, routerReducer as router} from 'react-router-redux'
import * as defaultState from './reducers/defaultState'
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux'


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const reducer = combineReducers({
    ...defaultState,
    router
})
// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    reducer,
    applyMiddleware(middleware, thunk)
)

ReactDOM.render((
    <div>
        <Provider store={store}>
            {/* ConnectedRouter will use the store from Provider automatically */}
            <ConnectedRouter history={history}>
                <div>
                    <App/>
                </div>
            </ConnectedRouter>
        </Provider>
    </div>
), document.getElementById('root'))

