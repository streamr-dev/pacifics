
import {
    GET_ALL_SERVICES_REQUEST,
    GET_ALL_SERVICES_SUCCESS,
    GET_ALL_SERVICES_FAILURE
} from '../actions/service.js'

export default (state = {
    services: [],
    fetching: false,
    error: undefined
}, action) => {
    switch (action.type) {
        case GET_ALL_SERVICES_REQUEST:
            return {
                ...state,
                error: undefined,
                fetching: true
            }
        case GET_ALL_SERVICES_SUCCESS:
            return {
                services: action.services,
                error: undefined,
                fetching: false
            }
        case GET_ALL_SERVICES_FAILURE:
            return {
                error: action.error,
                fetching: false
            }
        default:
            return state
    }
}