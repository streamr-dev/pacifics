
import {
    LOGIN_REQUEST,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
} from '../actions/user.js'

const user = (state = {
    user: undefined,
    error: undefined,
    fetching: false
}, action) => {
    switch (action.type) {
        case SIGNUP_REQUEST:
        case LOGIN_REQUEST:
            return {
                ...state,
                error: undefined,
                fetching: true
            }
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                user: action.user,
                error: undefined,
                fetching: false
            }
        case SIGNUP_FAILURE:
        case LOGIN_ERROR:
            return {
                user: undefined,
                error: action.error,
                fetching: false
            }
        default:
            return state
    }
}

export default user