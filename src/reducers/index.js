import { ERROR, NO_ERROR, LOGIN_SUCCESS,SIGNUP_SUCCESS, LOGIN_ERROR, SIGNUP_ERROR, LOGIN_PAGE_LOAD, LOG_OUT } from '../actions/index';

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', action.payload.username);
            return {...state, username: action.payload.username, error: false, error_message: "", signup_success: "", login_error: "" }
        case SIGNUP_SUCCESS:
            return {...state, error: "", signup_success: "You are registered!", signup_error: "" }
        case LOGIN_ERROR:
            return {...state, login_error: action.payload, signup_success: "" }
        case SIGNUP_ERROR:
            return {...state, signup_error: action.payload }
        case ERROR:
            return {...state, error: action.payload }
        case NO_ERROR:
            return {...state, error:"", login_error: "", signup_error:"" }
        case LOGIN_PAGE_LOAD: 
            return {...state, signup_success:"", signup_error: ""}
        case LOG_OUT:
            localStorage.clear();
            return {...initialState, username:""};
        default:
            return state
    }

}

const initialState = {
    title: "Friend Flakes",
    error: "",
    login_error: "",
    signup_error:"",
    signup_success: "",
    username: localStorage.getItem('user'),
    user_data: {
        id: 1,
        username: "jordowag",
        first_name: "Jordan",
        events: [{
                id: 1,
                created_by: 1,
                name: "Shebang",
                description: "An event!",
                date: new Date("09/29/1990"),
                people: 5,
                attended: true,
                points: 3
            },
            {
                id: 2,
                created_by: 2,
                name: "Dinner",
                description: "An event!",
                date: new Date("09/30/1990"),
                people: 6,
                attended: false,
                points: 5
            },
            {
                id: 3,
                created_by: 1,
                name: "Karaoke",
                description: "An event!",
                date: new Date("09/21/1990"),
                people: 4,
                attended:true,
                points: 5
            },
            {
                id: 4,
                created_by: 1,
                name: "Karaoke pt 2",
                description: "An event!",
                date: new Date("10/18/2019"),
                people: 4,
                attended:true,
                points: 5
            },
            {
                id: 4,
                created_by: 2,
                name: "Dinner pt 2",
                description: "An event!",
                date: new Date("10/25/2019"),
                people: 4,
                attended:true,
                points: 5
            }
        ]
    }
}