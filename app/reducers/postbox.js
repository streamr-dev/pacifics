
import {
    CREATE_POSTBOX_SUCCESS,
    CREATE_POSTBOX_FAILURE,
    GET_ALL_POSTBOXES_REQUEST,
    GET_ALL_POSTBOXES_SUCCESS,
    GET_ALL_POSTBOXES_FAILURE,
    GET_POSTBOX_REQUEST,
    GET_POSTBOX_SUCCESS,
    GET_POSTBOX_FAILURE
} from '../actions/postbox.js'

export default (state = {
    postboxes: [],
    fetching: false,
    error: undefined
}, action) => {
    switch (action.type) {
        case GET_ALL_POSTBOXES_REQUEST:
        case GET_POSTBOX_REQUEST:
            return {
                ...state,
                error: undefined,
                fetching: true
            }
        case GET_POSTBOX_SUCCESS:
        case CREATE_POSTBOX_SUCCESS:
            return {
                postboxes: [...state.postboxes, action.postboxes],
                error: undefined,
                fetching: false
            }
        case GET_ALL_POSTBOXES_SUCCESS:
            return {
                postboxes: action.postboxes,
                error: undefined,
                fetching: false
            }
        case GET_ALL_POSTBOXES_FAILURE:
        case GET_POSTBOX_FAILURE:
        case CREATE_POSTBOX_FAILURE:
            return {
                error: action.error,
                fetching: false
            }
        default:
            return state
    }
}