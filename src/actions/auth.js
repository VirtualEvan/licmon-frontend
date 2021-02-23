import {loadUser} from './user';

export const USER_LOGIN = 'User logged in';
export const USER_LOGOUT = 'User logged out';
export const TOKEN_EXPIRED = 'Expired token needs refresh';
export const TOKEN_NEEDED = 'Login required to send request';
export const ADD_ERROR = 'Error occurred';
export const LOGIN_WINDOW_OPENED = 'Login window opened';
export const LOGIN_WINDOW_CLOSED = 'Login window closed';
export const LOGIN_PROMPT_ABORTED = 'User refused to login';

export function userLogin(token) {
  return async dispatch => {
    dispatch({type: USER_LOGIN, token});
    dispatch(loadUser());
  };
}

export function userLogout() {
  return async dispatch => {
    dispatch({type: USER_LOGOUT});
    window.location.href = 'auth/logout';
  };
}

export function tokenExpired() {
  return {type: TOKEN_EXPIRED};
}

export function tokenNeeded() {
  return {type: TOKEN_NEEDED};
}

export function loginWindowOpened() {
  return {type: LOGIN_WINDOW_OPENED};
}

export function loginWindowClosed() {
  return {type: LOGIN_WINDOW_CLOSED};
}

export function loginPromptAborted() {
  return {type: LOGIN_PROMPT_ABORTED};
}
