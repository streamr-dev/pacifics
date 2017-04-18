
import store from '../store'
import {getAllPostboxContracts, getPostboxContract, createPostboxContract} from '../../src/postbox'

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
    const state = store.getState()
    const postboxCreatorAddress = state.user.user.service.postboxCreatorAddress
    dispatch(getAllPostboxesRequest())
    return new Promise((resolve, reject) => {
        getAllPostboxContracts(postboxCreatorAddress)
            .then(postboxes => {
                dispatch(getAllPostboxesSuccess(postboxes))
                resolve(postboxes)
            })
            .catch(err => {
                dispatch(getAllPostboxesFailure(err))
                reject(err)
            })
    })
}

export const getPostbox = id => dispatch => {
    dispatch(getPostboxRequest())
    return new Promise((resolve, reject) => {
        getPostboxContract(id)
            .then(p => {
                dispatch(getPostboxSuccess(p))
                resolve(p)
            })
            .catch(e => {
                dispatch(getPostboxFailure(e))
                reject(e)
            })
    })
}

export const createPostbox = postbox => dispatch => {
    const state = store.getState()
    const postboxCreatorAddress = state.user.user.service.postboxCreatorAddress
    dispatch(createPostboxRequest())
    return new Promise((resolve, reject) => {
        createPostboxContract(postbox.name, postbox.description, postbox.location, postboxCreatorAddress)
            .then(p => {
                dispatch(createPostboxSuccess(p))
                resolve(p)
            })
            .catch(e => {
                dispatch(createPostboxFailure(e))
                reject(e)
            })
    })
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
