import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import { connectRouter } from 'connected-react-router'
import * as defaultState from './defaultState';

export default (history) => combineReducers({
        ...defaultState,
        router: connectRouter(history) 
});
