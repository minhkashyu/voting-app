import {
    FETCHING,
    NOT_FETCHING,
    REDIRECT,
    NOT_REDIRECT
    } from './../actions/types';

const INITIAL_STATE = {
    isFetching: false,
    isRedirected: false
};

const mainReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line
    switch (action.type) {
        case FETCHING:
            return {...state, isFetching: true };
        case NOT_FETCHING:
            return {...state, isFetching: false };
        case REDIRECT:
            return {...state, isRedirected: true };
        case NOT_REDIRECT:
            return {...state, isRedirected: false };
    }
    return state;
};

export default mainReducer;