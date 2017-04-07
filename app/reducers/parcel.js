
import {
    CREATE_PARCEL_SUCCESS,
    CREATE_PARCEL_FAILURE,
    GET_ALL_PARCELS_REQUEST,
    GET_ALL_PARCELS_SUCCESS,
    GET_ALL_PARCELS_FAILURE,
    GET_PARCEL_REQUEST,
    GET_PARCEL_SUCCESS,
    GET_PARCEL_FAILURE
} from '../actions/parcel.js'

export default (state = {
    parcels: [],
    fetching: false,
    error: undefined
}, action) => {
    switch (action.type) {
        case GET_ALL_PARCELS_REQUEST:
        case GET_PARCEL_REQUEST:
            return {
                ...state,
                error: undefined,
                fetching: true
            }
        case GET_PARCEL_SUCCESS:
            return {
                ...state,
                current: action.parcel,
                error: undefined,
                fetching: false
            }
        case CREATE_PARCEL_SUCCESS:
            return {
                parcels: [...state.parcels, action.parcel],
                error: undefined,
                fetching: false
            }
        case GET_ALL_PARCELS_SUCCESS:
            return {
                parcels: action.parcels || state.parcels,
                error: undefined,
                fetching: false
            }
        case GET_ALL_PARCELS_FAILURE:
        case GET_PARCEL_FAILURE:
        case CREATE_PARCEL_FAILURE:
            return {
                error: action.error,
                fetching: false
            }
        default:
            return state
    }
}