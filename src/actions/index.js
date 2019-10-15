import axios from 'axios';

export const LOGGING_IN = "LOGGING_IN";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS ="LOGIN_SUCCESS";
export const NO_ERROR = "NO_ERROR";

export const logInUser = (user) => dispatch => {
  axios.post("http://localhost:5000/api/users/login", user)
    .then(res =>  dispatch({type: LOGIN_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: LOGIN_FAILURE, payload:err.response.data.error}));
}

export const resetError = () => {
  return {type: NO_ERROR}
}