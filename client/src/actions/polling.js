import {
    API_URL,
    //PUBLIC_URL,
    //errorHandler,
    getRequest,
    postRequest,
    deleteRequest
    } from './index';
import {
    FETCHING,
    RECEIVE_POLLS,
    RECEIVE_MY_POLLS,
    RECEIVE_SINGLE_POLL,
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
    return (dispatch, getState, cookies) => getRequest(FETCHING, RECEIVE_POLLS, POLL_ERROR, false, url, dispatch, cookies);
}

export function fetchMyPolls() {
    return (dispatch, getState, cookies) => {
        let url = '/polls/my';
        getRequest(FETCHING, RECEIVE_MY_POLLS, POLL_ERROR, true, url, dispatch, cookies);
    };
}

export function fetchSinglePoll(pollId) {
    return (dispatch, getState, cookies) => {
        let url = `/polls/${pollId}`;
        getRequest(FETCHING, RECEIVE_SINGLE_POLL, POLL_ERROR, false, url, dispatch, cookies);
    };
}

export function addPoll(data) {
    return (dispatch, getState, cookies) => {
        let url = `/polls`;
        postRequest(FETCHING, ADD_POLL, POLL_ERROR, true, url, dispatch, cookies, data);
    };
}

export function deletePoll(id) {
    let url = `/polls/${id}`;
    return (dispatch, getState, cookies) => deleteRequest(FETCHING, DELETE_POLL, POLL_ERROR, true, url, dispatch, cookies);
}

export function submitVote(pollId, optionId) {
    let url = `/polls/${pollId}/options/${optionId}/vote`;
    return (dispatch, getState, cookies) => postRequest(FETCHING, SUBMIT_VOTE, POLL_ERROR, true, url, dispatch, cookies);
}

export function addOption(data) {
    const url = `/options`;
    return (dispatch, getState, cookies) => postRequest(FETCHING, ADD_OPTION, POLL_ERROR, true, url, dispatch, cookies, data);
}