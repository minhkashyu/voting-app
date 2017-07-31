import {
    FETCH_POLLS,
    FETCH_MY_POLLS,
    FETCH_SINGLE_POLL,
    SUBMIT_VOTE,
    ADD_POLL,
    DELETE_POLL,
    ADD_OPTION,
    POLL_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    polls: [],
    poll: '',
    message: '',
    error: ''
};

const pollReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line
    switch (action.type) {
        case FETCH_POLLS:
            return {...state, polls: action.payload.polls, error: '', message: ''};
        case FETCH_MY_POLLS:
            return {...state, polls: action.payload.polls, error: '', message: ''};
        case FETCH_SINGLE_POLL:
            return {...state, poll: action.payload.poll, error: '', message: ''};
        case SUBMIT_VOTE:
            return {...state, message: action.payload.message};
        case ADD_POLL:
            return {...state, message: action.payload.message};
        case DELETE_POLL:
            return {...state, message: action.payload.message};
        case ADD_OPTION:
            return {...state, message: action.payload.message};
        case POLL_ERROR:
            return {...state, error: action.payload};
    }
    return state;
};

export default pollReducer;