import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import entitiesErrorsReducer from './entities_errors_reducer';

export default combineReducers({
  session: sessionErrorsReducer,
  entities: entitiesErrorsReducer
});
