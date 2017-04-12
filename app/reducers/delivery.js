
import {
    CREATE_DELIVERY_REQUEST,
    CREATE_DELIVERY_SUCCESS,
    CREATE_DELIVERY_FAILURE,
    GET_ALL_DELIVERIES_REQUEST,
    GET_ALL_DELIVERIES_SUCCESS,
    GET_ALL_DELIVERIES_FAILURE
} from '../actions/delivery.js'

export default (state = {
    list: [],
    fetching: false,
    error: undefined
}, action) => {
    switch (action.type) {
        case GET_ALL_DELIVERIES_REQUEST:
        case CREATE_DELIVERY_REQUEST:
            return {
                ...state,
                error: undefined,
                fetching: true
            }
        case CREATE_DELIVERY_SUCCESS:
            return {
                list: [...state.list, action.list],
                error: undefined,
                fetching: false
            }
        case GET_ALL_DELIVERIES_SUCCESS:
            return {
                list: action.list,
                error: undefined,
                fetching: false
            }
        case GET_ALL_DELIVERIES_FAILURE:
        case CREATE_DELIVERY_FAILURE:
            return {
                ...state,
                error: action.error.toString(),
                fetching: false
            }
        default:
            return state
    }
}