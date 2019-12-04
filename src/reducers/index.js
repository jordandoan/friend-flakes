import {
	ERROR,
	NO_ERROR,
	LOGIN_SUCCESS,
	SIGNUP_SUCCESS,
	LOGIN_ERROR,
	SIGNUP_ERROR,
	LOGIN_PAGE_LOAD,
	LOG_OUT,
	LOADING,
	FETCH_USER_SUCCESS,
	FETCH_EVENT_SUCCESS,
	FETCH_FAILURE,
	POST_EVENT_FAILURE,
  POST_EVENT_SUCCESS,
  EDIT_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
  POST_GUESTS_SUCCESS,
  POST_GUESTS_FAILURE,
  EDIT_GUEST_SUCCESS,
  DELETE_GUEST_SUCCESS,
  DELETE_GUEST_FAILURE
} from '../actions/';

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			localStorage.setItem('user', action.payload.username);
			return {
				...state,
				username: action.payload.username,
        error: false,
        called: true,
				signup_success: '',
				login_error: '',
			};
		case SIGNUP_SUCCESS:
			return {
				...state,
				error: '',
				signup_success: 'You are registered!',
				signup_error: '',
			};
		case LOGIN_ERROR:
			return { ...state, login_error: action.payload, signup_success: '' };
		case SIGNUP_ERROR:
			return { ...state, signup_error: action.payload, signup_success: '', };
		case ERROR:
			return { ...state, error: action.payload };
		case NO_ERROR:
			return { ...state, error: '', login_error: '', signup_error: '' };
		case LOGIN_PAGE_LOAD:
			return { ...state, signup_success: '', signup_error: '' };
		case LOG_OUT:
			localStorage.clear();
			return {...initialState, event_data: null, user_data: null, username: null}
		case LOADING:
			return {...state, called: false, error: '', loading: true};
		case FETCH_USER_SUCCESS:
			localStorage.setItem('user_data', JSON.stringify(action.payload));
			return { ...state, user_data: action.payload, loading: false, called: true };
		case FETCH_EVENT_SUCCESS:
      localStorage.setItem('event_data', JSON.stringify(action.payload));
			return { ...state, event_data: action.payload, loading: false, called: true };
		case FETCH_FAILURE:
			localStorage.removeItem('event_data');
      return { ...state, error: action.payload, called: true, loading: false };
    case POST_EVENT_SUCCESS:
      action.payload.people = action.payload.guests.length;
      let first_name = action.payload.full_name.split(" ");
      action.payload.first_name = first_name[0]
      state.user_data.events.push(action.payload);
      localStorage.setItem('user_data', JSON.stringify(state.user_data));
      return {...state, error: '', signup_error: '', login_error: '', signup_success: '', called: true, loading: false};
    case POST_EVENT_FAILURE:
      return {...state, error: action.payload, called: true, loading: false};
    case EDIT_EVENT_SUCCESS: 
      localStorage.setItem('event_data', JSON.stringify(action.payload));
      return {...state, called: true, error: '', loading: false, event_data: action.payload}
    case DELETE_EVENT_SUCCESS:
      let newEvents = state.user_data.events.filter(event => event.id !== action.payload)
      localStorage.removeItem('event_data');
      return {...state, called: true, error: '', loading: false, event_data: null, user_data: {...state.user_data, events: newEvents}}
    case POST_GUESTS_SUCCESS:
      let newEvent = {...state.event_data, guests: action.payload.guests}
      localStorage.setItem('event_data', JSON.stringify(newEvent));
      return {...state, called: true, error: '', loading: false, event_data: newEvent }
    case POST_GUESTS_FAILURE:
      return {...state, called: true, error: action.payload, loading: false}
    case EDIT_GUEST_SUCCESS:
      const updatedGuests = state.event_data.guests.filter(guest => {
        if (guest.username === action.payload.username) {
          guest.attended = action.payload.attended;
        }
        return guest
      })
      let newState = {...state.event_data, guests: updatedGuests}
      localStorage.setItem('event_data', JSON.stringify(newState));
      return {...state, error:'', called: true, loading: false, event_data: {...state.event_data, guests: updatedGuests}}
    case DELETE_GUEST_SUCCESS:
      let filteredGuests = state.event_data.guests.filter(guest => guest.username !== action.payload)
      localStorage.setItem('event_data', JSON.stringify({...state.event_data, guests: filteredGuests}));
      return {...state, loading: false, called: true, event_data: {...state.event_data, guests: filteredGuests}}
    case DELETE_GUEST_FAILURE:
      return {...state, called: true, loading: false, error: action.payload}
		default:
			return state;
	}
};

const initialState = {
	error: '',
	login_error: '',
	signup_error: '',
	signup_success: '',
  called: false,
  loading: false,
	username: localStorage.getItem('user'),
	user_data: JSON.parse(localStorage.getItem('user_data')),
	event_data: JSON.parse(localStorage.getItem('event_data')),
};
