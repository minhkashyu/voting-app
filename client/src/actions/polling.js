import {
    API_URL,
    //PUBLIC_URL,
    //errorHandler,
    getData,
    postData,
    deleteData
    } from './index';
import {
    FETCH_POLLS,
    FETCH_MY_POLLS,
    FETCH_SINGLE_POLL,
    SUBMIT_VOTE,
    ADD_POLL,
    DELETE_POLL,
    ADD_OPTION,
    POLL_ERROR
} from './types';

//= ===============================
// Polling actions
//= ===============================

export function fetchPolls() {
    let url = '/polls';
    return (dispatch, getState, cookies) => getData(FETCH_POLLS, POLL_ERROR, false, url, dispatch, cookies);
}

export function fetchMyPolls() {
    return (dispatch, getState, cookies) => {
        let userId = cookies.get('user').id;
        let url = `/users/${userId}/polls`;
        getData(FETCH_MY_POLLS, POLL_ERROR, true, url, dispatch, cookies);
    };
}

export function fetchSinglePoll(pollId) {
    return (dispatch, getState, cookies) => {
        let url = `${API_URL}/polls/${pollId}`;
        getData(FETCH_SINGLE_POLL, POLL_ERROR, true, url, dispatch, cookies);
    };
}

export function addPoll(data) {
    return (dispatch, getState, cookies) => {
        let userId = cookies.get('user').id;
        let url = `/users/${userId}/polls`;
        postData(ADD_POLL, POLL_ERROR, true, url, dispatch, cookies, data);
    };
}

export function deletePoll(id) {
    let url = `/polls/${id}`;
    return (dispatch, getState, cookies) => deleteData(DELETE_POLL, POLL_ERROR, true, url, dispatch, cookies);
}

export function submitVote(pollId, optionId) {
    let url = `/polls/${pollId}/options/${optionId}/vote`;
    return (dispatch, getState, cookies) => postData(SUBMIT_VOTE, POLL_ERROR, true, url, dispatch, cookies);
}

export function addOption(data) {
    const url = `/options`;
    return (dispatch, getState, cookies) => postData(ADD_OPTION, POLL_ERROR, true, url, dispatch, cookies, data);
}