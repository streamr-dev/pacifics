
export const GET_ALL_PARCELS_REQUEST = 'GET_ALL_PARCELS_REQUEST'
export const GET_ALL_PARCELS_SUCCESS = 'GET_ALL_PARCELS_SUCCESS'
export const GET_ALL_PARCELS_FAILURE = 'GET_ALL_PARCELS_FAILURE'

export const GET_PARCEL_REQUEST = 'GET_PARCEL_REQUEST'
export const GET_PARCEL_SUCCESS = 'GET_PARCEL_SUCCESS'
export const GET_PARCEL_FAILURE = 'GET_PARCEL_FAILURE'

export const CREATE_PARCEL_REQUEST = 'CREATE_PARCEL_REQUEST'
export const CREATE_PARCEL_SUCCESS = 'CREATE_PARCEL_SUCCESS'
export const CREATE_PARCEL_FAILURE = 'CREATE_PARCEL_FAILURE'

// JUST TO REPRESENT ASYNC ACTIONS, REMOVE
const async = () => new Promise(resolve => {
    setTimeout(resolve, 500)
})

export const getAllParcels = () => dispatch => {
    dispatch(getAllParcelsRequest())
    async()
        .then(() => dispatch(getAllParcelsSuccess()))
        .catch(() => dispatch(getAllParcelsFailure()))
}

export const getParcel = id => dispatch => {
    dispatch(getParcelRequest())
    async(id)
        .then(() => dispatch(getParcelSuccess()))
        .catch(() => dispatch(getParcelFailure()))
}

export const createParcel = (name) => dispatch => {
    dispatch(createParcelRequest())
    async()
        .then(() =>  dispatch(createParcelSuccess()))
        .catch(() => dispatch(createParcelFailure()))
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

const createParcelFailure = () => ({
    type: CREATE_PARCEL_FAILURE
})
