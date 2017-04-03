
export const GET_ALL_POSTBOXES_REQUEST = 'GET_ALL_POSTBOXES_REQUEST'
export const GET_ALL_POSTBOXES_SUCCESS = 'GET_ALL_POSTBOXES_SUCCESS'
export const GET_ALL_POSTBOXES_FAILURE = 'GET_ALL_POSTBOXES_FAILURE'

export const GET_POSTBOX_REQUEST = 'GET_POSTBOX_REQUEST'
export const GET_POSTBOX_SUCCESS = 'GET_POSTBOX_SUCCESS'
export const GET_POSTBOX_FAILURE = 'GET_POSTBOX_FAILURE'

export const CREATE_POSTBOX_REQUEST = 'CREATE_POSTBOX_REQUEST'
export const CREATE_POSTBOX_SUCCESS = 'CREATE_POSTBOX_SUCCESS'
export const CREATE_POSTBOX_FAILURE = 'CREATE_POSTBOX_FAILURE'

// JUST TO REPRESENT ASYNC ACTIONS, REMOVE
const async = () => new Promise(resolve => {
    setTimeout(resolve, 500)
})

export const getAllPostboxes = () => dispatch => {
    dispatch(getAllPostboxesRequest())
    async()
        .then(() => dispatch(getAllPostboxesSuccess()))
        .catch(() => dispatch(getAllPostboxesFailure()))
}

export const getPostbox = id => dispatch => {
    dispatch(getPostboxRequest())
    async(id)
        .then(() => dispatch(getPostboxSuccess()))
        .catch(() => dispatch(getPostboxFailure()))
}

export const createPostbox = (name) => dispatch => {
    dispatch(createPostboxRequest())
    async()
        .then(() =>  dispatch(createPostboxSuccess()))
        .catch(() => dispatch(createPostboxFailure()))
}

const getAllPostboxesRequest = () => ({
    type: GET_ALL_POSTBOXES_REQUEST
})

const getAllPostboxesSuccess = postboxes => ({
    type: GET_ALL_POSTBOXES_SUCCESS,
    postboxes
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

const createPostboxSuccess = () => ({
    type: CREATE_POSTBOX_SUCCESS
})

const createPostboxFailure = () => ({
    type: CREATE_POSTBOX_FAILURE
})
