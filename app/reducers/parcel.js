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
    ADD_EVENT,
    ADD_PHOTOS
} from '../actions/parcel.js'

import {reject} from 'lodash'

export default (state = {
    list: [],
    fetching: false,
    error: undefined,
    events: [],
    photos: []
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
        case CREATE_PARCEL_SUCCESS:
            return {
                ...state,
                error: undefined,
                fetching: false
            }
        case GET_PARCEL_SUCCESS: {
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
            const list = reject(state.list, item => item.address === action.parcelAddress)
            return {
                ...state,
                list: [
                    list,
                    {
                        address: action.parcelAddress,
                        ...(parcel || {}),
                        events: [
                            ...(parcel && parcel.events || []),
                            action.event
                        ]
                    }
                ]
            }
        }
        case ADD_PHOTOS: {
            const parcel = state.list.find(p => p.address === action.parcelAddress)
            const list = reject(state.list, item => item.address === action.parcelAddress)
            return {
                ...state,
                list: [
                    list,
                    {
                        address: action.parcelAddress,
                        ...(parcel || {}),
                        photos: [
                            ...(parcel && parcel.photos || []),
                            ...action.photos
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