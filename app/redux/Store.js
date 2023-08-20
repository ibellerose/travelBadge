import { combineReducers } from 'redux';
import { createStore } from 'redux';
import visitReducer from './reducers/visitReducer';
 
const rootReducer = combineReducers({
  visit: visitReducer,
});

export const store = createStore(rootReducer);
