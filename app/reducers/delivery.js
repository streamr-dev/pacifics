
import {
    CREATE_DELIVERY_SUCCESS,
    CREATE_DELIVERY_FAILURE,
    GET_ALL_DELIVERIES_REQUEST,
    GET_ALL_DELIVERIES_SUCCESS,
    GET_ALL_DELIVERIES_FAILURE,
    GET_DELIVERY_REQUEST,
    GET_DELIVERY_SUCCESS,
    GET_DELIVERY_FAILURE
} from '../actions/delivery.js'

export default (state = {
    deliveries: [],
    fetching: false,
    error: undefined
}, action) => {
    switch (action.type) {
        case GET_ALL_DELIVERIES_REQUEST:
        case GET_DELIVERY_REQUEST:
            return {
                ...state,
                error: undefined,
                fetching: true
            }
        case GET_DELIVERY_SUCCESS:
        case CREATE_DELIVERY_SUCCESS:
            return {
                all: [...state.deliveries, action.delivery],
                error: undefined,
                fetching: false
            }
        case GET_ALL_DELIVERIES_SUCCESS:
            return {
                all: action.deliveries,
                error: undefined,
                fetching: false
            }
        case GET_ALL_DELIVERIES_FAILURE:
        case GET_DELIVERY_FAILURE:
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