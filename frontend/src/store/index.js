import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

import reducer from './rootReducer';

const logger = createLogger({
  collapsed: true
});


const store = createStore(reducer, undefined, composeWithDevTools(applyMiddleware(thunk, logger)));

export default store;