import axios from 'axios';

export const LOGGING_IN = "LOGGING_IN";
export const ERROR = "ERROR";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const LOGIN_SUCCESS ="LOGIN_SUCCESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const NO_ERROR = "NO_ERROR";
export const LOGIN_PAGE_LOAD = "LOGIN_PAGE_LOAD";
export const LOG_OUT = "LOG_OUT";

export const logInUser = (user) => dispatch => {
  dispatch({type: NO_ERROR})
  axios.post("http://localhost:5000/api/auth/login", user)
    .then(res =>  dispatch({type: LOGIN_SUCCESS, payload: {username: user.username, token: res.data.token}}))
    .catch(err => dispatch({type: LOGIN_ERROR, payload:err.response.data.error}));
}

export const signUpUser = (user) => dispatch => {
  axios.post("http://localhost:5000/api/auth/register", user)
  .then(res =>  dispatch({type: SIGNUP_SUCCESS}))
  .catch(err => dispatch({type: SIGNUP_ERROR, payload:err.response.data.error}));
}

export const resetError = () => {
  return {type: NO_ERROR}
}

export const loginOnLoad = () => {
  return {type: LOGIN_PAGE_LOAD}
}

export const logOut = () => {
  return {type: LOG_OUT}
}