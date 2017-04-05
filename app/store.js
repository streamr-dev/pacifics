import thunk from 'redux-thunk'
import {combineReducers} from 'redux'
import {loginSuccess} from './actions/user'

import {createStore, applyMiddleware, compose} from 'redux'
import createLogger from 'redux-logger'

import userReducer from './reducers/user.js'
import parcelReducer from './reducers/parcel.js'
import deliveryReducer from './reducers/delivery.js'
import userReducer from './reducers/user.js'

import { useRouterHistory } from 'react-router'
import { createHistory } from 'history'

import {syncHistoryWithStore, routerMiddleware, routerReducer} from 'react-router-redux'

export const browserHistory = useRouterHistory(createHistory)({
    basename: `/${baseUrl}`
})

const reducer = combineReducers({
    user: userReducer,
    delivery: deliveryReducer,
    parcel: parcelReducer,
    postbox: postboxReducer,
    routing: routerReducer
})

const middleware = [thunk, routerMiddleware(browserHistory)]
let toBeComposed = [applyMiddleware(...middleware)]

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
    
    if (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) {
        toBeComposed.push(window.__REDUX_DEVTOOLS_EXTENSION__())
    }
}


const store = createStore(
    reducer,
    compose.apply(null, toBeComposed)
)

// If user found, log in

/* global user */
if (user) {
    store.dispatch(loginSuccess(user))
}

export const history = syncHistoryWithStore(browserHistory, store)
export default store

