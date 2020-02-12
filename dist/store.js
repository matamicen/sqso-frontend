"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reactRouterRedux = require("react-router-redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _createMemoryHistory = _interopRequireDefault(require("history/createMemoryHistory"));

var _reducers = _interopRequireDefault(require("../src/reducers"));

// Create a store and history based on a path
const createServerStore = (path = '/') => {
  const initialState = {}; // We don't have a DOM, so let's create some fake history and push the current path

  const history = (0, _createMemoryHistory.default)({
    initialEntries: [path]
  }); // All the middlewares

  const middleware = [_reduxThunk.default, (0, _reactRouterRedux.routerMiddleware)(history)];
  const composedEnhancers = (0, _redux.compose)((0, _redux.applyMiddleware)(...middleware)); // Store it all

  const store = (0, _redux.createStore)(_reducers.default, initialState, composedEnhancers); // Return all that I need

  return {
    history,
    store
  };
};

var _default = createServerStore;
exports.default = _default;