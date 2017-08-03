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
} from '../actions/types';

const INITIAL_STATE = {
    polls: [],
    poll: {},
    options: [],
    moreOptions: [1, 2],
    isFetching: false,
    message: '',
    error: ''
};

const pollReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line
    switch (action.type) {
        case FETCHING:
            return {...state, isFetching: true };
        case RECEIVE_POLLS:
            return {...state, polls: action.payload.polls, isFetching: false };
        case RECEIVE_MY_POLLS:
            return {...state, polls: action.payload.polls, isFetching: false };
        case RECEIVE_SINGLE_POLL:
            return {...state, poll: action.payload.poll, isFetching: false };
        case SUBMIT_VOTE:
            return {...state, message: action.payload.message, isFetching: false };
        case ADD_POLL:
            return {...state, message: action.payload.message, poll: action.payload.poll, isFetching: false };
        case DELETE_POLL:
            return {...state, message: action.payload.message, isFetching: false };
        case ADD_OPTION:
            return {...state, message: action.payload.message, isFetching: false };
        case POLL_ERROR:
            return {...state, error: action.payload, isFetching: false };
    }
    return state;
};

export default pollReducer;