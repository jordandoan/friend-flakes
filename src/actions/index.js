import { axiosWithAuth } from '../utils';

export const LOGGING_IN = "LOGGING_IN";
export const ERROR = "ERROR";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const LOGIN_SUCCESS ="LOGIN_SUCCESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const NO_ERROR = "NO_ERROR";
export const LOGIN_PAGE_LOAD = "LOGIN_PAGE_LOAD";
export const LOG_OUT = "LOG_OUT";
export const LOADING = "LOADING";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_EVENT_SUCCESS = "FETCH_EVENT_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const POST_EVENT_SUCCESS = "POST_EVENT_SUCCESS";
export const POST_EVENT_FAILURE = "POST_EVENT_FAILURE";

export const logInUser = (user) => dispatch => {
  dispatch({type: NO_ERROR})
  axiosWithAuth().post("/api/auth/login", user)
    .then(res =>  dispatch({type: LOGIN_SUCCESS, payload: {username: user.username, token: res.data.token}}))
    .catch(err => dispatch({type: LOGIN_ERROR, payload:err.response.data.error}));
}

export const signUpUser = (user) => dispatch => {
  axiosWithAuth().post("/api/auth/register", user)
  .then(res =>  dispatch({type: SIGNUP_SUCCESS}))
  .catch(err => dispatch({type: SIGNUP_ERROR, payload:err.response.data.error}));
}

export const resetError = () => {
  return {type: NO_ERROR}
}

export const loginOnLoad = () => {
  return {type: LOGIN_PAGE_LOAD}
}

export const getUserInfo = (username) => dispatch => {
  dispatch({type: LOADING});
  axiosWithAuth().get(`/api/users/info/${username}`)
    .then(res => dispatch({type: FETCH_USER_SUCCESS, payload: res.data}))
}

export const getEventInfo = (id) => dispatch => {
  dispatch({type: LOADING});
  axiosWithAuth().get(`/api/events/${id}`)
    .then(res => dispatch({type: FETCH_EVENT_SUCCESS, payload: res.data}))
    .catch(err => dispatch({type: FETCH_FAILURE, payload: err.response.data.error}))
}

export const postEventInfo = (event, guests) => dispatch => {
  dispatch({type: LOADING});
  guests.forEach((guest, idx) => {
    guests[idx] = {username: guest, attended: true}
  });
  axiosWithAuth().post('/api/events/', event)
    .then(res => {
      let event = res.data;
      if (guests.length) {
        let guest_res = guests.map(guest => {
          return axiosWithAuth().post(`/api/guests/${event.id}`, guest)
            .then(res => res)
            .catch(err => {
              console.log(err)
              return err
            })
        })
        return Promise.all(guest_res)
          .then(res => ({type: POST_EVENT_SUCCESS}))
          .catch(err => {console.log(err)})
      }
      return dispatch({type: POST_EVENT_SUCCESS, payload: event})
    })
    .catch(err => dispatch({type: POST_EVENT_FAILURE, payload: err.response.data.error}))
}

export const logOut = () => {
  return {type: LOG_OUT}
}