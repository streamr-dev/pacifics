
import store from '../store'
import {createParcel as createParcelContract} from '../../src/parcel'

export const GET_ALL_PARCELS_REQUEST = 'GET_ALL_PARCELS_REQUEST'
export const GET_ALL_PARCELS_SUCCESS = 'GET_ALL_PARCELS_SUCCESS'
export const GET_ALL_PARCELS_FAILURE = 'GET_ALL_PARCELS_FAILURE'

export const GET_PARCEL_REQUEST = 'GET_PARCEL_REQUEST'
export const GET_PARCEL_SUCCESS = 'GET_PARCEL_SUCCESS'
export const GET_PARCEL_FAILURE = 'GET_PARCEL_FAILURE'

export const CREATE_PARCEL_REQUEST = 'CREATE_PARCEL_REQUEST'
export const CREATE_PARCEL_SUCCESS = 'CREATE_PARCEL_SUCCESS'
export const CREATE_PARCEL_FAILURE = 'CREATE_PARCEL_FAILURE'

let parcels = [{
    id: 0,
    name: '0',
    owner: 'Aapeli'
},{
    id: 1,
    name: '1',
    owner: 'Henri'
},{
    id: 2,
    name: '2',
    owner: 'Risto'
}]

// JUST TO REPRESENT ASYNC ACTIONS, REMOVE
const async = (params) => new Promise(resolve => {
    setTimeout(() => resolve(params), 100)
})

export const getAllParcels = () => dispatch => {
    dispatch(getAllParcelsRequest())
    async(parcels)
        .then(p => dispatch(getAllParcelsSuccess(p)))
        .catch(() => dispatch(getAllParcelsFailure()))
}

export const getParcel = id => dispatch => {
    dispatch(getParcelRequest())
    async(parcels.find(item => item.id === id))
        .then(p => dispatch(getParcelSuccess(p)))
        .catch(() => dispatch(getParcelFailure()))
}

// TODO: check that this works
export const ensureParcelIsFetched = id => dispatch => {
    const state = store.getState()
    if (state.parcels.parcels && state.parcels.parcels.find((p) => p.id === id)) {
        dispatch(getParcel(id))
    }
}

export const createParcel = parcel => dispatch => {
    dispatch(createParcelRequest())
    createParcelContract(parcel.name, parcel.description, parcel.temperatureLimit)
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
