import store from '../store'
import axios from 'axios'
import UrlBuilder from './util/urlBuilder.js'
import path from 'path'
import { getAllParcelContracts, getParcelContractAt, createParcelContract } from '../src/parcel'
import {getParcelEvents, unCamelCase} from '../src/eventLog'
import {getBlockDate} from '../src/block'

export const GET_ALL_PARCELS_REQUEST = 'GET_ALL_PARCELS_REQUEST'
export const GET_ALL_PARCELS_SUCCESS = 'GET_ALL_PARCELS_SUCCESS'
export const GET_ALL_PARCELS_FAILURE = 'GET_ALL_PARCELS_FAILURE'

export const GET_PARCEL_REQUEST = 'GET_PARCEL_REQUEST'
export const GET_PARCEL_SUCCESS = 'GET_PARCEL_SUCCESS'
export const GET_PARCEL_FAILURE = 'GET_PARCEL_FAILURE'

export const CREATE_PARCEL_REQUEST = 'CREATE_PARCEL_REQUEST'
export const CREATE_PARCEL_SUCCESS = 'CREATE_PARCEL_SUCCESS'
export const CREATE_PARCEL_FAILURE = 'CREATE_PARCEL_FAILURE'

export const ADD_EVENT = 'ADD_EVENT'
export const ADD_PHOTOS = 'ADD_PHOTOS'

const urlBuilder = new UrlBuilder()

export const getAllParcels = () => dispatch => {
    const state = store.getState()
    const parcelCreatorAddress = state.user.user.service.parcelCreatorAddress
    dispatch(getAllParcelsRequest())
    return new Promise((resolve, reject) => {
        getAllParcelContracts(parcelCreatorAddress)
            .then(p => {
                dispatch(getAllParcelsSuccess(p))
                resolve(p)
            })
            .catch(e => {
                dispatch(getAllParcelsFailure(e))
                reject(e)
            })
    })
}

// TODO: name probably should be selectParcel (plus same changes everywhere)
export const getParcel = address => dispatch => {
    const state = store.getState()
    const foundParcel = state.parcels.list.find(i => i.address === address)
    if (foundParcel) {
        return Promise.resolve(dispatch(getParcelSuccess(foundParcel)))
    }
    
    dispatch(getParcelRequest())
    return getParcelContractAt(address)
        .then(p => {
            p.address = address
            dispatch(getParcelSuccess(p))
            return p
        })
        .catch(e => {
            dispatch(getParcelFailure(e))
            throw e
        })
}

export const createParcel = parcel => dispatch => {
    const state = store.getState()
    const {parcelCreatorAddress, trackingStreamId, trackingStreamKey, photoStreamId, photoStreamKey} = state.user.user.service
    if (!parcelCreatorAddress || !trackingStreamId || !trackingStreamKey || !photoStreamId || !photoStreamKey) {
        return Promise.reject('Service not configured')
    }
    dispatch(createParcelRequest())
    return new Promise((resolve, reject) => {
        createParcelContract(parcel.name, parcel.description, parcel.temperatureLimit, parcelCreatorAddress, trackingStreamId, trackingStreamKey, photoStreamId, photoStreamKey)
            .then(newParcelEvent => {
                dispatch(createParcelSuccess())
                resolve(newParcelEvent)
            })
            .catch(e => {
                dispatch(createParcelFailure(e))
                reject(e)
            })
    })
}

export const getEvents = parcelAddress => dispatch => {
    // pick event properties that are used
    getParcelEvents(parcelAddress).then(events => {
        events.forEach(e => {
            getBlockDate(parseInt(e.blockNumber))
                .then(blockDate => {
                    dispatch(addEvent(parcelAddress, {
                        id: e.transactionHash + e.transactionIndex + e.event,
                        time: new Date(blockDate * 1000),
                        event: unCamelCase(e.event)
                    }))
                })
        })
    })
}

export const getPhotos = (parcelAddress, dontTryAgain) => dispatch => {
    axios.get(urlBuilder.build(path.resolve('parcel', parcelAddress, 'photos')))
        .then(res => dispatch(addPhotos(parcelAddress, res.data)))
        .catch(e => {
            if (e.response.status === 403 && !dontTryAgain) {
                setTimeout(() => getPhotos(parcelAddress, true), 1000)
            } else {
                throw e
            }
        })
}

export const addPhotos = (parcelAddress, photos) => dispatch => {
    dispatch({
        type: ADD_PHOTOS,
        parcelAddress,
        photos
    })
}

export const addEvent = (parcelAddress, event) => dispatch => {
    dispatch({
        type: ADD_EVENT,
        event,
        parcelAddress
    })
}

const getAllParcelsRequest = () => ({
    type: GET_ALL_PARCELS_REQUEST
})

const getAllParcelsSuccess = parcels => ({
    type: GET_ALL_PARCELS_SUCCESS,
    parcels
})

const getAllParcelsFailure = error => ({
    type: GET_ALL_PARCELS_FAILURE,
    error
})

const getParcelRequest = () => ({
    type: GET_PARCEL_REQUEST
})

const getParcelSuccess = parcel => ({
    type: GET_PARCEL_SUCCESS,
    parcel
})

const getParcelFailure = error => ({
    type: GET_PARCEL_FAILURE,
    error
})

const createParcelRequest = () => ({
    type: CREATE_PARCEL_REQUEST
})

const createParcelSuccess = () => ({
    type: CREATE_PARCEL_SUCCESS
})

const createParcelFailure = error => ({
    type: CREATE_PARCEL_FAILURE,
    error
})
