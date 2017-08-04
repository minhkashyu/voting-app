import axios from 'axios';
import {
    FETCHING,
    NOT_FETCHING,
    REDIRECT,
    NOT_REDIRECT
    } from './types';

export const API_URL = process.env.REACT_APP_API_URL;
export const PUBLIC_URL = process.env.PUBLIC_URL;

export const errorHandler = (dispatch, error, type) => {
    let errorMessage = error.response ? (error.response.data.error || error.response.data ) : error;
    dispatch({
        type,
        payload: errorMessage
    });
    dispatch({ type: NOT_FETCHING });
};

const request = (axiosRequest, actionType, errorType, isAuthReq, isRedirect, url, dispatch, cookies, data) => {
    dispatch({ type: NOT_REDIRECT });
    dispatch({ type: FETCHING });
    let requestUrl = API_URL + url;
    let headers = {};

    if (isAuthReq) {
        headers = { headers: { Authorization: cookies.get('token') } };
    }

    axiosRequest(requestUrl, data, headers)
        .then((response) => {
            console.dir(response.data);
            dispatch({
                type: actionType,
                payload: response.data
            });
            dispatch({ type: NOT_FETCHING });
            if (isRedirect) {
                dispatch({ type: REDIRECT });
            }
        })
        .catch((error) => {
            errorHandler(dispatch, error, errorType);
        });
};

const axiosGet = (requestUrl, data, headers) => {
    return axios.get(requestUrl, headers);
};

const axiosPost = (requestUrl, data, headers) => {
    return axios.post(requestUrl, data, headers);
};

const axiosPut = (requestUrl, data, headers) => {
    return axios.put(requestUrl, data, headers);
};

const axiosDelete = (requestUrl, data, headers) => {
    return axios.delete(requestUrl, headers);
};

export const getRequest = (actionType, errorType, isAuthReq, isRedirect, url, dispatch, cookies) => request(axiosGet, actionType, errorType, isAuthReq, isRedirect, url, dispatch, cookies, null);

export const postRequest = (actionType, errorType, isAuthReq, isRedirect, url, dispatch, cookies, data) => request(axiosPost, actionType, errorType, isAuthReq, isRedirect, url, dispatch, cookies, data);

export const putRequest = (actionType, errorType, isAuthReq, isRedirect, url, dispatch, cookies, data) => request(axiosPut, actionType, errorType, isAuthReq, isRedirect, url, dispatch, cookies, data);

export const deleteRequest = (actionType, errorType, isAuthReq, isRedirect, url, dispatch, cookies) => request(axiosDelete, actionType, errorType, isAuthReq, isRedirect, url, dispatch, cookies, null);