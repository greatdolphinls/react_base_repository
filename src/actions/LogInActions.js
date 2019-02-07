import * as API from '../api';
import * as types from './types';

export const logIn = (email, password) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  const user = await API.auth(email, password);
  console.log("Login user", user);
  if (!user.error) {
    await localStorage.setItem('token', user.token);
    await localStorage.setItem('user', user.user);
    dispatch({ type: types.SET_USER, username: user.user.username, id: user.user.id });
    if(user.user.role === "Admin"){
      dispatch({ type: types.LOGIN_ADMIN_SUCCESS });
    }else{
      dispatch({ type: types.LOGIN_SUCCESS });
    }
  } else {
    dispatch({ type: types.LOGIN_FAILURE, message: user.error });
  }
};

export const logOut = () => async (dispatch) => {
  await localStorage.removeItem('token');
  await localStorage.removeItem('user');
  dispatch({ type: types.CLEAR_USER });
  dispatch({ type: types.LOGOUT_SUCCESS });
  console.log("logout");
};

export const checkAuthorization = () => async (dispatch) => {
  if (localStorage.getItem('token')){
    const user = await API.currentUser();
    if(user){
      dispatch({ type: types.SET_USER, username: user.username, id: user.id });
      if( user.role.name === "Admin" ){
        dispatch({ type: types.LOGIN_ADMIN_SUCCESS });
      }else{
        dispatch({ type: types.LOGIN_SUCCESS });
      }
    }
  }
};

export const authorized = user => (dispatch) => {
  dispatch({ type: types.SET_USER, username: user.username, id: user.id });
  dispatch({ type: types.LOGIN_SUCCESS });
};

export const addLogInMessage = message => (dispatch) => {
  dispatch({ type: types.ADD_LOGIN_MESSAGE, message });
};
export const clearLogInMessage = () => (dispatch) => {
  dispatch({ type: types.CLEAR_LOGIN_MESSAGE });
};

export const createUser = newUser => async (dispatch) => {
  dispatch({ type: types.CREATE_REQUEST });
  const user = await API.createUser(newUser);
  if (!user.error) {
    dispatch({ type: types.CREATE_SUCCESS });
  } else {
    dispatch({ type: types.CREATE_FAILURE, message: user.error });
  }
};

export const failedPasswordConfirm = () => (dispatch) => {
  dispatch({ type: types.CREATE_FAILURE, message: 'Passwords Do Not Match' });
};
export const addNewUserMessage = message => (dispatch) => {
  dispatch({ type: types.ADD_NEWUSER_MESSAGE, message });
};
export const clearNewUserMessage = () => (dispatch) => {
  dispatch({ type: types.CLEAR_NEWUSER_MESSAGE });
};

export const setActiveItem = name => (dispatch) => {
  dispatch({ type: types.SET_ACTIVE_ITEM, name });
};
