import axios from 'axios';
import { logoutUser } from './auth';
export const API_URL = process.env.REACT_APP_API_URL;
export const PUBLIC_URL = process.env.PUBLIC_URL;

export function errorHandler(dispatch, error, type) {
    let errorMessage = error.response ? error.response.data : error;

    // NOT AUTHENTICATED ERROR
    if (error.status === 401 || error.response.status === 401) {
        errorMessage = 'You are not authorized to do this.';
        return dispatch(logoutUser(errorMessage));
    }

    dispatch({
        type,
        payload: errorMessage
    });
}

// Post Request
export function postData(action, errorType, isAuthReq, url, dispatch, cookies, data) {
    const requestUrl = API_URL + url;
    let headers = {};

    if (isAuthReq) {
        headers = { headers: { Authorization: cookies.get('token') } };
    }

    axios.post(requestUrl, data, headers)
        .then((response) => {
            dispatch({
                type: action,
                payload: response.data
            });
        })
        .catch((error) => {
            errorHandler(dispatch, error, errorType);
        });
}

// Get Request
export function getData(action, errorType, isAuthReq, url, dispatch, cookies) {
    const requestUrl = API_URL + url;
    let headers = {};

    if (isAuthReq) {
        headers = { headers: { Authorization: cookies.get('token') } };
    }

    axios.get(requestUrl, headers)
        .then((response) => {
            dispatch({
                type: action,
                payload: response.data
            });
        })
        .catch((error) => {
            errorHandler(dispatch, error, errorType);
        });
}

// Put Request
export function putData(action, errorType, isAuthReq, url, dispatch, cookies, data) {
    const requestUrl = API_URL + url;
    let headers = {};

    if (isAuthReq) {
        headers = { headers: { Authorization: cookies.get('token') } };
    }

    axios.put(requestUrl, data, headers)
        .then((response) => {
            dispatch({
                type: action,
                payload: response.data
            });
        })
        .catch((error) => {
            errorHandler(dispatch, error, errorType);
        });
}

// Delete Request
export function deleteData(action, errorType, isAuthReq, url, dispatch, cookies) {
    const requestUrl = API_URL + url;
    let headers = {};

    if (isAuthReq) {
        headers = { headers: { Authorization: cookies.get('token') } };
    }

    axios.delete(requestUrl, headers)
        .then((response) => {
            dispatch({
                type: action,
                payload: response.data
            });
        })
        .catch((error) => {
            errorHandler(dispatch, error, errorType);
        });
}