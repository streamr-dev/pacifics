import {createDeliveryContract, getAllDeliveryContracts} from '../../src/deliveryContract'

export const GET_ALL_DELIVERIES_REQUEST = 'GET_ALL_DELIVERIES_REQUEST'
export const GET_ALL_DELIVERIES_SUCCESS = 'GET_ALL_DELIVERIES_SUCCESS'
export const GET_ALL_DELIVERIES_FAILURE = 'GET_ALL_DELIVERIES_FAILURE'

export const GET_DELIVERY_REQUEST = 'GET_DELIVERY_REQUEST'
export const GET_DELIVERY_SUCCESS = 'GET_DELIVERY_SUCCESS'
export const GET_DELIVERY_FAILURE = 'GET_DELIVERY_FAILURE'

export const CREATE_DELIVERY_REQUEST = 'CREATE_DELIVERY_REQUEST'
export const CREATE_DELIVERY_SUCCESS = 'CREATE_DELIVERY_SUCCESS'
export const CREATE_DELIVERY_FAILURE = 'CREATE_DELIVERY_FAILURE'


export const getAllDeliveries = () => dispatch => {
    dispatch(getAllDeliveriesRequest())
    return getAllDeliveryContracts()
        .then(d => dispatch(getAllDeliveriesSuccess(d)))
        .catch(e => dispatch(getAllDeliveriesFailure(e)))
}

/*
export const getDelivery = id => dispatch => {
    dispatch(getDeliveryRequest())
    async(id)
        .then(() => dispatch(getDeliverySuccess()))
        .catch(() => dispatch(getDeliveryFailure()))
}
*/

export const createDelivery = (delivery, parcelAddress) => dispatch => {
    /* TODO: fix date pickers in DeliveriesCreate/index.jsx
    const startDate = +delivery.canStartAfter
    const endDate = +delivery.depositUnlockedAfter
     const minutes = delivery.deliveryDeadline - startDate
    */
    const startDate = Date.now()
    const endDate = startDate + 10000
    const minutes = 5000
    const depositETH = delivery.deposit

    dispatch(createDeliveryRequest())
    return createDeliveryContract(parcelAddress, delivery.senderPostbox, delivery.receiverPostbox, delivery.receiverAddress, endDate, depositETH, startDate, minutes)
        .then(d => dispatch(createDeliverySuccess(d)))
        .catch(e => dispatch(createDeliveryFailure(e)))
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

/*
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
*/

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
