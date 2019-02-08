import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import NewUserReducer from './NewUserReducer';
import JobReducer from './JobReducer';

export default combineReducers({
  form: formReducer,
  auth: AuthReducer,
  user: UserReducer,
  newUser: NewUserReducer,
  job: JobReducer
});
