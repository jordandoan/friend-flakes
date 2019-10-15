import axios from 'axios';

export const LOGGING_IN = "LOGGING_IN";
export const ERROR = "ERROR";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const LOGIN_SUCCESS ="LOGIN_SUCCESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const NO_ERROR = "NO_ERROR";
export const LOGIN_PAGE_LOAD = "LOGIN_PAGE_LOAD";

export const logInUser = (user) => dispatch => {
  axios.post("http://localhost:5000/api/users/login", user)
    .then(res =>  dispatch({type: LOGIN_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: LOGIN_ERROR, payload:err.response.data.error}));
}

export const signUpUser = (user) => dispatch => {
  axios.post("http://localhost:5000/api/users/register", user)
  .then(res =>  dispatch({type: SIGNUP_SUCCESS}))
  .catch(err => dispatch({type: SIGNUP_ERROR, payload:err.response.data.error}));
}

export const resetError = () => {
  return {type: NO_ERROR}
}

export const loginOnLoad = () => {
  return {type: LOGIN_PAGE_LOAD}
}