import axios from 'axios';
import {
        API_URL,
        PUBLIC_URL ,
        errorHandler
    } from './index';
import {
        AUTH_USER,
        UNAUTH_USER,
        FORGOT_PASSWORD_REQUEST,
        RESET_PASSWORD_REQUEST,
        PROTECTED_TEST,
        AUTH_ERROR
    } from './types';

//= ===============================
// Authentication actions
//= ===============================

const loginSuccess = (dispatch, cookies, response) => {
    cookies.set('token', response.data.token, { path: '/' });
    cookies.set('user', response.data.user, { path: '/' });
    dispatch({ type: AUTH_USER });
};

const loginError = (dispatch, error) => {
    let errorMessage = error.response ? error.response.data : error;
    dispatch({
        type: AUTH_ERROR,
        payload: errorMessage
    })
};

export function authenticatedTest() {
    return function (dispatch, getState, cookies) {
        const token = cookies.get('token');
        if (token) {
            // User has token and is probably authenticated
            dispatch({ type: AUTH_USER });
        }
        else {
            dispatch({ type: UNAUTH_USER, payload: '' });
        }
    }
}

// TO-DO: Add expiration to cookie
export function loginUser({ email, password }) {
    return function (dispatch, getState, cookies) {
        axios.post(`${API_URL}/auth/login`, { email, password })
            .then((response) => {
                loginSuccess(dispatch, cookies, response);
            })
            .catch((error) => {
                loginError(dispatch, error);
            });
    };
}

export function registerUser({ firstName, lastName, email, password }) {
    return function (dispatch, getState, cookies) {
        axios.post(`${API_URL}/auth/register`, { firstName, lastName, email, password })
            .then((response) => {
                loginSuccess(dispatch, cookies, response);
            })
            .catch((error) => {
                loginError(dispatch, error);
            });
    };
}

export function loginFacebook() {
    return function (dispatch, getState, cookies) {
        axios.get(`${API_URL}/auth/facebook`)
            .then((response) => {
                loginSuccess(dispatch, cookies, response);
            })
            .catch((error) => {
                loginError(dispatch, error);
            });
    };
}

export function loginGoogle() {
    return function (dispatch, getState, cookies) {
        axios.get(`${API_URL}/auth/google`)
            .then((response) => {
                loginSuccess(dispatch, cookies, response);
            })
            .catch((error) => {
                loginError(dispatch, error);
            });
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
        window.location.href = `${PUBLIC_URL}/login`;
    };
}

export function getForgotPasswordToken({ email }) {
    return function (dispatch) {
        axios.post(`${API_URL}/auth/forgot-password`, { email })
            .then((response) => {
                dispatch({
                    type: FORGOT_PASSWORD_REQUEST,
                    payload: response.data.message
                });
            })
            .catch((error) => {
                errorHandler(dispatch, error, AUTH_ERROR);
            });
    };
}

export function resetPassword(token, { password }) {
    return function (dispatch) {
        axios.post(`${API_URL}/auth/reset-password/${token}`, { password })
            .then((response) => {
                dispatch({
                    type: RESET_PASSWORD_REQUEST,
                    payload: response.data.message
                });
                window.location.href = `${PUBLIC_URL}/login`;
            })
            .catch((error) => {
                errorHandler(dispatch, error, AUTH_ERROR);
            });
    };
}

export function protectedTest() {
    return function (dispatch, getState, cookies) {
        axios.get(`${API_URL}/protected`, {
            headers: { Authorization: cookies.get('token') }
        })
            .then((response) => {
                dispatch({
                    type: PROTECTED_TEST,
                    payload: response.data.content
                });
            })
            .catch((error) => {
                errorHandler(dispatch, error, AUTH_ERROR);
            });
    };
}