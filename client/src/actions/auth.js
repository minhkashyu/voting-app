import axios from 'axios';
import {
    API_URL,
    errorHandler
    } from './index';
import {
    FETCHING,
    NOT_FETCHING,
    AUTH_USER,
    UNAUTH_USER,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    AUTH_ERROR
    } from './types';

//= ===============================
// Authentication actions
//= ===============================

export function authenticatedTest() {
    return function (dispatch, getState, cookies) {
        const token = cookies.get('token');
        if (token) {
            dispatch({ type: AUTH_USER });
        }
        else {
            dispatch({ type: UNAUTH_USER, payload: '' });
        }
    }
}

const handleSuccess = (dispatch, cookies, response) => {
    cookies.set('token', response.data.token, {
        path: '/',
        maxAge: 10790 // expires in nearly 3 hours
    });
    cookies.set('user', response.data.user, {
        path: '/',
        maxAge: 10790 // expires in nearly 3 hours
    });
    dispatch({ type: NOT_FETCHING });
    dispatch({ type: AUTH_USER });
};

export function loginSuccess( media, jwt ) {
    return function (dispatch, getState, cookies) {
        dispatch({ type: FETCHING });
        console.log(`Authorization: ${jwt}, Media: ${media}`);
        const headers = { headers: { Authorization: jwt, Media: media} };
        axios.get(`${API_URL}/auth/loginSuccess`, headers)
            .then((response) => {
                handleSuccess(dispatch, cookies, response);
            })
            .catch((error) => {
                errorHandler(dispatch, error, AUTH_ERROR);
            });
    };
}

export function loginUser({ email, password }) {
    return function (dispatch, getState, cookies) {
        dispatch({ type: FETCHING });
        axios.post(`${API_URL}/auth/login`, { email, password })
            .then((response) => {
                handleSuccess(dispatch, cookies, response);
            })
            .catch((error) => {
                errorHandler(dispatch, error, AUTH_ERROR);
            });
    };
}

export function registerUser({ firstName, lastName, email, password }) {
    return function (dispatch, getState, cookies) {
        dispatch({ type: FETCHING });
        axios.post(`${API_URL}/auth/register`, { firstName, lastName, email, password })
            .then((response) => {
                handleSuccess(dispatch, cookies, response);
            })
            .catch((error) => {
                errorHandler(dispatch, error, AUTH_ERROR);
            });
    };
}

export function loginFacebook() {
    return function (dispatch, getState, cookies) {
        dispatch({ type: FETCHING });
        window.location = `${API_URL}/auth/facebook`;
        //dispatch({ type: FETCHING });
        //axios.get(`${API_URL}/auth/facebook`)
        //    .then((response) => {
        //        handleSuccess(dispatch, cookies, response);
        //    })
        //    .catch((error) => {
        //        errorHandler(dispatch, error, AUTH_ERROR);
        //    });
    };
}

export function loginGoogle() {
    return function (dispatch, getState, cookies) {
        dispatch({ type: FETCHING });
        window.location = `${API_URL}/auth/google`;
        //dispatch({ type: FETCHING });
        //axios.get(`${API_URL}/auth/google`)
        //    .then((response) => {
        //        handleSuccess(dispatch, cookies, response);
        //    })
        //    .catch((error) => {
        //        errorHandler(dispatch, error, AUTH_ERROR);
        //    });
    };
}

export function logoutUser(error) {
    return function (dispatch, getState, cookies) {
        cookies.remove('token', { path: '/' });
        cookies.remove('user', { path: '/' });
        dispatch({
            type: UNAUTH_USER,
            payload: error || ''
        });
    };
}

export function getForgotPasswordToken({ email }) {
    return function (dispatch) {
        dispatch({ type: FETCHING });
        axios.post(`${API_URL}/auth/forgot-password`, { email })
            .then((response) => {
                dispatch({
                    type: FORGOT_PASSWORD,
                    payload: response.data
                });
                dispatch({ type: NOT_FETCHING });
            })
            .catch((error) => {
                errorHandler(dispatch, error, AUTH_ERROR);
            });
    };
}

export function resetPassword(token, { password }) {
    return function (dispatch) {
        dispatch({ type: FETCHING });
        axios.post(`${API_URL}/auth/reset-password/${token}`, { password })
            .then((response) => {
                dispatch({
                    type: RESET_PASSWORD,
                    payload: response.data
                });
                dispatch({ type: NOT_FETCHING });
            })
            .catch((error) => {
                errorHandler(dispatch, error, AUTH_ERROR);
            });
    };
}