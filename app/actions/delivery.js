
export const GET_ALL_DELIVERIES_REQUEST = 'GET_ALL_DELIVERIES_REQUEST'
export const GET_ALL_DELIVERIES_SUCCESS = 'GET_ALL_DELIVERIES_SUCCESS'
export const GET_ALL_DELIVERIES_FAILURE = 'GET_ALL_DELIVERIES_FAILURE'

export const GET_DELIVERY_REQUEST = 'GET_DELIVERY_REQUEST'
export const GET_DELIVERY_SUCCESS = 'GET_DELIVERY_SUCCESS'
export const GET_DELIVERY_FAILURE = 'GET_DELIVERY_FAILURE'

export const CREATE_DELIVERY_REQUEST = 'CREATE_DELIVERY_REQUEST'
export const CREATE_DELIVERY_SUCCESS = 'CREATE_DELIVERY_SUCCESS'
export const CREATE_DELIVERY_FAILURE = 'CREATE_DELIVERY_FAILURE'

// JUST TO REPRESENT ASYNC ACTIONS, REMOVE
const async = () => new Promise(resolve => {
    setTimeout(resolve, 500)
})

export const getAllDeliveries = () => dispatch => {
    dispatch(getAllDeliveriesRequest())
    async()
        .then(() => dispatch(getAllDeliveriesSuccess()))
        .catch(() => dispatch(getAllDeliveriesFailure()))
}

export const getDelivery = id => dispatch => {
    dispatch(getDeliveryRequest())
    async(id)
        .then(() => dispatch(getDeliverySuccess()))
        .catch(() => dispatch(getDeliveryFailure()))
}

export const createDelivery = () => dispatch => {
    dispatch(createDeliveryRequest())
    async()
        .then(() =>  dispatch(createDeliverySuccess()))
        .catch(() => dispatch(createDeliveryFailure()))
}

const getAllDeliveriesRequest = () => ({
    type: GET_ALL_DELIVERIES_REQUEST
})

const getAllDeliveriesSuccess = deliveries => ({
    type: GET_ALL_DELIVERIES_SUCCESS,
    deliveries
})

const getAllDeliveriesFailure = error => ({
    type: GET_ALL_DELIVERIES_FAILURE,
    error
})

const getDeliveryRequest = () => ({
    type: GET_DELIVERY_REQUEST
})

const getDeliverySuccess = delivery => ({
    type: GET_DELIVERY_SUCCESS,
    delivery
})

const getDeliveryFailure = error => ({
    type: GET_DELIVERY_FAILURE,
    error
})

const createDeliveryRequest = () => ({
    type: CREATE_DELIVERY_REQUEST
})

const createDeliverySuccess = delivery => ({
    type: CREATE_DELIVERY_SUCCESS,
    delivery
})

const createDeliveryFailure = error => ({
    type: CREATE_DELIVERY_FAILURE,
    error
})
