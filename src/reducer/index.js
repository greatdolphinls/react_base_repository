import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import NewUserReducer from './NewUserReducer';

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  newUser: NewUserReducer
});
