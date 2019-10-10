import { LOGIN_FAILURE, LOGIN_SUCCESS, NO_ERROR } from '../actions/index';

export const reducer = (state = initialState, action) => {
  switch(action.type) {
  case LOGIN_SUCCESS:
    return {...state, error: false, error_message: ""}
  case LOGIN_FAILURE:
    return {...state, error: true, error_message: action.payload}
  case NO_ERROR:
    return {...state, error: false}
  default: 
    return state
  }

}

const initialState = {
  title: "Friend Flakes",
  error: false,
  error_message: ""
}