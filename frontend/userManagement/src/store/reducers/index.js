import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import TodoReducer from './TodoReducer';

const rootReducer = combineReducers({
  authReducer: AuthReducer,
  todoReducer: TodoReducer,
});
export default rootReducer;
