import axios from 'axios';
import { logoutUser } from './auth';
export const API_URL = process.env.REACT_APP_API_URL;
export const PUBLIC_URL = process.env.PUBLIC_URL;

export const errorHandler = (dispatch, error, type) => {
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
};

const request = (axiosRequest, fetchingType, actionType, errorType, isAuthReq, url, dispatch, cookies, data) => {
    dispatch({ type: fetchingType });
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

export const getRequest = (fetchingType, actionType, errorType, isAuthReq, url, dispatch, cookies) => request(axiosGet, fetchingType, actionType, errorType, isAuthReq, url, dispatch, cookies, null);

export const postRequest = (fetchingType, actionType, errorType, isAuthReq, url, dispatch, cookies, data) => request(axiosPost, fetchingType, actionType, errorType, isAuthReq, url, dispatch, cookies, data);

export const putRequest = (fetchingType, actionType, errorType, isAuthReq, url, dispatch, cookies, data) => request(axiosPut, fetchingType, actionType, errorType, isAuthReq, url, dispatch, cookies, data);

export const deleteRequest = (fetchingType, actionType, errorType, isAuthReq, url, dispatch, cookies) => request(axiosDelete, fetchingType, actionType, errorType, isAuthReq, url, dispatch, cookies, null);