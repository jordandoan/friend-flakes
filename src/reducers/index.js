import { ERROR, LOGIN_SUCCESS, NO_ERROR, SIGNUP_SUCCESS } from '../actions/index';

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {...state, username: action.payload.username, error: false, error_message: "" }
        case SIGNUP_SUCCESS:
            return {...state, error: false, error_message: ""}
        case ERROR:
            return {...state, error: true, error_message: action.payload }
        case NO_ERROR:
            return {...state, error: false }
        default:
            return state
    }

}

const initialState = {
    title: "Friend Flakes",
    error: null,
    error_message: "",
    username: "",
    user_data: {
        id: 1,
        username: "jordowag",
        first_name: "Jordan",
        events: [{
                id: 1,
                created_by: 1,
                name: "Shebang",
                date: "09/29/1990",
                people: 5,
                attended: true,
                points: 3
            },
            {
                id: 2,
                created_by: 2,
                name: "Dinner",
                date: "09/30/1990",
                people: 6,
                attended: false,
                points: 5
            },
            {
                id: 3,
                created_by: 1,
                name: "Karaoke",
                date: "09/21/1990",
                people: 4,
                attended:true,
                points: 5
            }
        ]
    }
}