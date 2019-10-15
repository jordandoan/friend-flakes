import axios from 'axios';

export const LOGGING_IN = "LOGGING_IN";
export const ERROR = "ERROR";
export const LOGIN_SUCCESS ="LOGIN_SUCCESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const NO_ERROR = "NO_ERROR";

export const logInUser = (user) => dispatch => {
  axios.post("http://localhost:5000/api/users/login", user)
    .then(res =>  dispatch({type: LOGIN_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: ERROR, payload:err.response.data.error}));
}

export const signUpUser = (user) => dispatch => {
  axios.post("http://localhost:5000/api/users/register", user)
  .then(res =>  dispatch({type: SIGNUP_SUCCESS}))
  .catch(err => dispatch({type: ERROR, payload:err.response.data.error}));
}

export const resetError = () => {
  return {type: NO_ERROR}
}