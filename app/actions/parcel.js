
import store from '../store'
import {getAllParcelContracts, getParcelContractAt, createParcelContract} from '../../src/parcel'

export const GET_ALL_PARCELS_REQUEST = 'GET_ALL_PARCELS_REQUEST'
export const GET_ALL_PARCELS_SUCCESS = 'GET_ALL_PARCELS_SUCCESS'
export const GET_ALL_PARCELS_FAILURE = 'GET_ALL_PARCELS_FAILURE'

export const GET_PARCEL_REQUEST = 'GET_PARCEL_REQUEST'
export const GET_PARCEL_SUCCESS = 'GET_PARCEL_SUCCESS'
export const GET_PARCEL_FAILURE = 'GET_PARCEL_FAILURE'

export const CREATE_PARCEL_REQUEST = 'CREATE_PARCEL_REQUEST'
export const CREATE_PARCEL_SUCCESS = 'CREATE_PARCEL_SUCCESS'
export const CREATE_PARCEL_FAILURE = 'CREATE_PARCEL_FAILURE'

export const getAllParcels = () => dispatch => {
    dispatch(getAllParcelsRequest())
    return getAllParcelContracts()
        .then(p => dispatch(getAllParcelsSuccess(p)))
        .catch(e => dispatch(getAllParcelsFailure(e)))
}

// TODO: name probably should be selectParcel (plus same changes everywhere)
export const getParcel = address => dispatch => {
    const state = store.getState()
    if (state.parcels && state.parcels.current && state.parcels.current.address === address) {
        return Promise.resolve(state.parcels.current)
    }
    // TODO(later): check state.parcels if already fetched? (use state.parcel.parcels as a cache)

    dispatch(getParcelRequest())
    return getParcelContractAt(address)
        .then(p => dispatch(getParcelSuccess(Object.assign(p, {address})))) //eslint-disable-line object-curly-newline
        .catch(e => dispatch(getParcelFailure(e)))
}

export const createParcel = parcel => dispatch => {
    dispatch(createParcelRequest())
    return createParcelContract(parcel.name, parcel.description, parcel.temperatureLimit)
        .then(p => dispatch(createParcelSuccess(p)))
        .catch(error => dispatch(createParcelFailure(error)))
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

const createParcelSuccess = parcel => ({
    type: CREATE_PARCEL_SUCCESS,
    parcel
})

const createParcelFailure = error => ({
    type: CREATE_PARCEL_FAILURE,
    error
})
