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
				error_message: '',
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
			return { ...state, signup_error: action.payload };
		case ERROR:
			return { ...state, error: action.payload };
		case NO_ERROR:
			return { ...state, error: '', login_error: '', signup_error: '' };
		case LOGIN_PAGE_LOAD:
			return { ...state, signup_success: '', signup_error: '' };
		case LOG_OUT:
			localStorage.clear();
      return { ...initialState, username: '' };
    case LOADING:
      return {...state, user_data:null, event_data: null}
    case FETCH_USER_SUCCESS:
      localStorage.setItem('user_data', JSON.stringify(action.payload));
      return {...initialState, user_data: action.payload}
    case FETCH_EVENT_SUCCESS:
      localStorage.setItem('event_data', JSON.stringify(action.payload));
      return {...initialState, event_data: action.payload}
    case FETCH_FAILURE:
      localStorage.removeItem('event_data');
      console.log(action.type);
      return {...state, error: action.payload, called: true}
		default:
			return state;
	}
};

const initialState = {
	title: 'Friend Flakes',
	error: '',
	login_error: '',
	signup_error: '',
  signup_success: '',
  called: '',
	username: localStorage.getItem('user'),
  user_data: JSON.parse(localStorage.getItem('user_data')),
  event_data: JSON.parse(localStorage.getItem('event_data'))
};
