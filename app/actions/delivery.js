import {createDeliveryContract, getAllDeliveryContracts} from '../../src/deliveryContract'

export const GET_ALL_DELIVERIES_REQUEST = 'GET_ALL_DELIVERIES_REQUEST'
export const GET_ALL_DELIVERIES_SUCCESS = 'GET_ALL_DELIVERIES_SUCCESS'
export const GET_ALL_DELIVERIES_FAILURE = 'GET_ALL_DELIVERIES_FAILURE'

export const CREATE_DELIVERY_REQUEST = 'CREATE_DELIVERY_REQUEST'
export const CREATE_DELIVERY_SUCCESS = 'CREATE_DELIVERY_SUCCESS'
export const CREATE_DELIVERY_FAILURE = 'CREATE_DELIVERY_FAILURE'


export const getAllDeliveries = () => dispatch => {
    dispatch(getAllDeliveriesRequest())
    return getAllDeliveryContracts()
        .then(d => dispatch(getAllDeliveriesSuccess(d)))
        .catch(e => dispatch(getAllDeliveriesFailure(e)))
}

// js Date.getTime is ms, Solidity epoch is seconds
function dateToSeconds(date) {
    return Math.floor(new Date(date).getTime() / 1000)
}

export const createDelivery = (delivery, parcelAddress) => dispatch => {
    const startDate = dateToSeconds(delivery.canStartAfter)
    const deadline = dateToSeconds(delivery.deliveryDeadline)
    const minutes = Math.ceil((deadline - startDate) / 60)
    const depositETH = delivery.deposit

    dispatch(createDeliveryRequest())
    return createDeliveryContract(parcelAddress, delivery.senderPostbox, delivery.receiverPostbox, delivery.receiverAddress, 0, depositETH, startDate, minutes)
        .then(d => dispatch(createDeliverySuccess(d)))
        .catch(e => dispatch(createDeliveryFailure(e)))
}

const getAllDeliveriesRequest = () => ({
    type: GET_ALL_DELIVERIES_REQUEST
})

const getAllDeliveriesSuccess = list => ({
    type: GET_ALL_DELIVERIES_SUCCESS,
    list
})

const getAllDeliveriesFailure = error => ({
    type: GET_ALL_DELIVERIES_FAILURE,
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
