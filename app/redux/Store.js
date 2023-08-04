import { configureStore, combineReducers} from 'redux';
import VisitReducer from './reducers/visitReducer';
 
const rootReducer = combineReducers({
  visited: VisitReducer,
});
 
export const store = configureStore(rootReducer);