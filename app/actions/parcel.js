import store from '../store'
import { getAllParcelContracts, getParcelContractAt, createParcelContract } from '../../src/parcel'

export const GET_ALL_PARCELS_REQUEST = 'GET_ALL_PARCELS_REQUEST'
export const GET_ALL_PARCELS_SUCCESS = 'GET_ALL_PARCELS_SUCCESS'
export const GET_ALL_PARCELS_FAILURE = 'GET_ALL_PARCELS_FAILURE'

export const GET_PARCEL_REQUEST = 'GET_PARCEL_REQUEST'
export const GET_PARCEL_SUCCESS = 'GET_PARCEL_SUCCESS'
export const GET_PARCEL_FAILURE = 'GET_PARCEL_FAILURE'

export const CREATE_PARCEL_REQUEST = 'CREATE_PARCEL_REQUEST'
export const CREATE_PARCEL_SUCCESS = 'CREATE_PARCEL_SUCCESS'
export const CREATE_PARCEL_FAILURE = 'CREATE_PARCEL_FAILURE'

export const ADD_EVENTS = 'ADD_EVENTS'

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
    const parcelCreatorAddress = state.user.user.service.parcelCreatorAddress
    dispatch(createParcelRequest())
    return new Promise((resolve, reject) => {
        // Timeout is a hack for a bug, where if parcels are fetched right after creating a new one, the new one is not returned
        // Possible reason was that maybe INFURA backends are not in sync, so when one reports the NewParcel event, another maybe can't give the parcel when later requested; resolve for now by waiting for a while (extra 1s in addition to mining time isn't noticeable)
        createParcelContract(parcel.name, parcel.description, parcel.temperatureLimit, parcelCreatorAddress)
            .then(newParcelEvent => setTimeout(() => {
                dispatch(createParcelSuccess())
                resolve(newParcelEvent)
            }), 2000)// TODO: remove
            .catch(e => {
                dispatch(createParcelFailure(e))
                reject(e)
            })
    })
}

export const addEvents = (parcelAddress, events) => dispatch => {
    dispatch({
        type: ADD_EVENTS,
        events,
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