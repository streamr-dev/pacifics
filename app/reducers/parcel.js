import {
    CREATE_PARCEL_REQUEST,
    CREATE_PARCEL_SUCCESS,
    CREATE_PARCEL_FAILURE,
    GET_ALL_PARCELS_REQUEST,
    GET_ALL_PARCELS_SUCCESS,
    GET_ALL_PARCELS_FAILURE,
    GET_PARCEL_REQUEST,
    GET_PARCEL_SUCCESS,
    GET_PARCEL_FAILURE,
    ADD_EVENT
} from '../actions/parcel.js'

import _ from 'lodash'

export default (state = {
    list: [],
    fetching: false,
    error: undefined
}, action) => {
    switch (action.type) {
        case GET_ALL_PARCELS_REQUEST:
        case GET_PARCEL_REQUEST:
        case CREATE_PARCEL_REQUEST: {
            return {
                ...state,
                error: undefined,
                fetching: true
            }
        }
        case GET_PARCEL_SUCCESS:
        case CREATE_PARCEL_SUCCESS: {
            return {
                list: [...state.list, action.parcel],
                error: undefined,
                fetching: false
            }
        }
        case GET_ALL_PARCELS_SUCCESS: {
            return {
                list: action.parcels,
                error: undefined,
                fetching: false
            }
        }
        case GET_ALL_PARCELS_FAILURE:
        case GET_PARCEL_FAILURE:
        case CREATE_PARCEL_FAILURE: {
            return {
                ...state,
                error: action.error,
                fetching: false
            }
        }
        case ADD_EVENT: {
            const parcel = state.list.find(p => p.address === action.parcelAddress)
            const error = !parcel ? `No parcel found with parcelAddress ${action.parcelAddress}!` : undefined
            return {
                ...state,
                error,
                list: [
                    ...(_.reject(state.list, p => p.address === action.parcelAddress)),
                    {
                        ...parcel,
                        events: [
                            ...(parcel.events || []),
                            action.event
                        ]
                    }
                ]
            }
        }
        default: {
            return state
        }
    }
}