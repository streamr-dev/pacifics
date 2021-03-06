import axios from 'axios'
import UrlBuilder from './util/urlBuilder.js'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const LOGOUT = 'LOGOUT'

const urlBuilder = new UrlBuilder()

const parseError = (res) => (res.data && res.data.error) || (res.response && res.response.data && res.response.data.error) || (res.message)

export const login = (email, password) => dispatch => {
    dispatch(loginRequest())
    return new Promise((resolve, reject) => {
        axios.post(urlBuilder.build('login'), {
            email,
            password
        })
            .then(res => {
                dispatch(loginSuccess(res.data))
                resolve(res.data)
            })
            .catch(res => {
                const e = parseError(res)
                dispatch(loginFailure(e))
                reject(e)
            })
    })
}

export const signup = (formData) => dispatch => {
    dispatch(signupRequest())
    return new Promise((resolve, reject) => {
        axios.post(urlBuilder.build('signup'), formData)
            .then(res => {
                dispatch(signupSuccess(res.data))
                resolve(res.data)
            })
            .catch(res => {
                const e = parseError(res)
                dispatch(signupFailure(e))
                reject(e)
            })
    })
}

export const logout = () => ({
    type: LOGOUT
})

const signupRequest = () => ({
    type: SIGNUP_REQUEST
})

const signupSuccess = user => ({
    type: SIGNUP_SUCCESS,
    user
})

const signupFailure = error => ({
    type: SIGNUP_FAILURE,
    error
})

const loginRequest = () => ({
    type: LOGIN_REQUEST
})

export const loginSuccess = user => ({
    type: LOGIN_SUCCESS,
    user
})

const loginFailure = error => ({
    type: LOGIN_ERROR,
    error
})