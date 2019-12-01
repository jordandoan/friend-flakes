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
export const EDIT_EVENT_SUCCESS = "EDIT_EVENT_SUCCESS";
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
export const POST_GUESTS_SUCCESS = "POST_GUESTS_SUCCESS";
export const POST_GUESTS_FAILURE = "POST_GUESTS_FAILURE";
export const EDIT_GUEST_SUCCESS = "EDIT_GUEST_SUCCESS";
export const EDIT_GUEST_FAILURE = "EDIT_GUEST_FAILURE";
export const DELETE_GUEST_SUCCESS = "DELETE_GUEST_SUCCESS";
export const DELETE_GUEST_FAILURE = "DELETE_GUEST_FAILURE";

export const logInUser = (user) => dispatch => {
  dispatch({type: LOADING})
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
            .catch(err => Promise.reject(err.response.data.error))
        })
        return Promise.all(guest_res)
          .then(res => 
            axiosWithAuth().get(`api/events/${event.id}`)
              .then(res => dispatch({type: POST_EVENT_SUCCESS, payload: res.data}))
          )
          .catch(err => {console.log(err)})
      }
      return axiosWithAuth().get(`api/events/${event.id}`)
        .then(res => dispatch({type: POST_EVENT_SUCCESS, payload: res.data}))
    })
    .catch(err => dispatch({type: POST_EVENT_FAILURE, payload: err.response.data.error}))
}

export const editEventInfo = (event) => dispatch => {
  dispatch({type: LOADING})
  let { guests, user_id, created_by, id, full_name, ...update } = event;
  axiosWithAuth().put(`/api/events/${id}`, update)
    .then(res => dispatch({type: EDIT_EVENT_SUCCESS, payload: event}))
}

export const deleteEvent = (eventId) => dispatch => {
  dispatch({type: LOADING})
  axiosWithAuth().delete(`/api/events/${eventId}`)
    .then(res => dispatch({type: DELETE_EVENT_SUCCESS, payload: eventId}))
}

export const inviteGuests = (eventId, guests) => dispatch => {
  dispatch({type: LOADING})
  guests.forEach((guest, idx) => {
    guests[idx] = {username: guest, attended: true}
  });
  let invites = guests.map(guest =>
    axiosWithAuth().post(`api/guests/${eventId}`, guest)
      .then(res => guest)
      .catch(err => Promise.reject(err.response.data.error))
  )
  Promise.all(invites)
    .then(res => axiosWithAuth().get(`api/guests/${eventId}`)
      .then(res => dispatch({type: POST_GUESTS_SUCCESS, payload: res.data}))
    )
    .catch(err => dispatch({type: POST_GUESTS_FAILURE, payload: err}))
}

export const editGuestStatus = (eventId, username, status) => dispatch => {
  axiosWithAuth().put(`api/guests/${eventId}/${username}`, status)
    .then(res => dispatch({type: EDIT_GUEST_SUCCESS, payload: {...status, username: username}}))
}

export const deleteGuest = (eventId, username) => dispatch => {
  axiosWithAuth().delete(`api/guests/${eventId}/${username}`)
    .then(res => dispatch({type: DELETE_GUEST_SUCCESS,  payload: username}))
    .catch(err => dispatch({type: DELETE_GUEST_FAILURE, payload: `Could not delete ${username}`}))
}
export const logOut = () => {
  return {type: LOG_OUT}
}