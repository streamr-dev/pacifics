
import {getAllPostboxContracts, getPostboxContract, createPostboxContract} from '../../src/postbox'
import {goBack} from 'react-router-redux'

export const GET_ALL_POSTBOXES_REQUEST = 'GET_ALL_POSTBOXES_REQUEST'
export const GET_ALL_POSTBOXES_SUCCESS = 'GET_ALL_POSTBOXES_SUCCESS'
export const GET_ALL_POSTBOXES_FAILURE = 'GET_ALL_POSTBOXES_FAILURE'

export const GET_POSTBOX_REQUEST = 'GET_POSTBOX_REQUEST'
export const GET_POSTBOX_SUCCESS = 'GET_POSTBOX_SUCCESS'
export const GET_POSTBOX_FAILURE = 'GET_POSTBOX_FAILURE'

export const CREATE_POSTBOX_REQUEST = 'CREATE_POSTBOX_REQUEST'
export const CREATE_POSTBOX_SUCCESS = 'CREATE_POSTBOX_SUCCESS'
export const CREATE_POSTBOX_FAILURE = 'CREATE_POSTBOX_FAILURE'

export const getAllPostboxes = () => dispatch => {
    dispatch(getAllPostboxesRequest())
    getAllPostboxContracts()
        .then(postboxes => dispatch(getAllPostboxesSuccess(postboxes)))
        .catch(err => dispatch(getAllPostboxesFailure(err)))
}

export const getPostbox = id => dispatch => {
    dispatch(getPostboxRequest())
    getPostboxContract(id)
        .then(postbox => dispatch(getPostboxSuccess(postbox)))
        .catch(err => dispatch(getPostboxFailure(err)))
}

export const createPostbox = postbox => dispatch => {
    dispatch(createPostboxRequest())
    createPostboxContract(postbox.name, postbox.description, postbox.location/*, postbox.minuteFee, postbox.minRent, postbox.maxDeposit*/)
        .then(postbox => {
            dispatch(goBack())
            dispatch(createPostboxSuccess(postbox))
        })
        .catch(err => dispatch(createPostboxFailure(err)))
}

const getAllPostboxesRequest = () => ({
    type: GET_ALL_POSTBOXES_REQUEST
})

const getAllPostboxesSuccess = list => ({
    type: GET_ALL_POSTBOXES_SUCCESS,
    list
})

const getAllPostboxesFailure = error => ({
    type: GET_ALL_POSTBOXES_FAILURE,
    error
})

const getPostboxRequest = () => ({
    type: GET_POSTBOX_REQUEST
})

const getPostboxSuccess = postbox => ({
    type: GET_POSTBOX_SUCCESS,
    postbox
})

const getPostboxFailure = error => ({
    type: GET_POSTBOX_FAILURE,
    error
})

const createPostboxRequest = () => ({
    type: CREATE_POSTBOX_REQUEST
})

const createPostboxSuccess = postbox => ({
    type: CREATE_POSTBOX_SUCCESS,
    postbox
})

const createPostboxFailure = error => ({
    type: CREATE_POSTBOX_FAILURE,
    error
})
