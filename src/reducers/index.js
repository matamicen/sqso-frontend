import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as defaultState from './defaultState';

export default combineReducers({
        ...defaultState,
       router: routerReducer 
});
