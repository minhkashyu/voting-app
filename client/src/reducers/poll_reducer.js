import {
    RECEIVE_POLLS,
    RECEIVE_MY_POLLS,
    RECEIVE_SINGLE_POLL,
    SUBMIT_VOTE,
    ADD_POLL,
    DELETE_POLL,
    ADD_OPTION,
    POLL_ERROR
} from './../actions/types';

const INITIAL_STATE = {
    polls: [],
    poll: {},
    options: [],
    moreOptions: [1, 2],
    message: '',
    error: ''
};

const pollReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line
    switch (action.type) {
        case RECEIVE_POLLS:
            return {...state, polls: action.payload.polls};
        case RECEIVE_MY_POLLS:
            return {...state, polls: action.payload.polls};
        case RECEIVE_SINGLE_POLL:
            return {...state, poll: action.payload.poll};
        case SUBMIT_VOTE:
            return {...state, message: action.payload.message};
        case ADD_POLL:
            return {...state, message: action.payload.message, poll: action.payload.poll};
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