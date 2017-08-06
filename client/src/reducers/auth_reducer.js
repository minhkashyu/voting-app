import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FORGOT_PASSWORD,
    RESET_PASSWORD
} from './../actions/types';

const INITIAL_STATE = {
    error: '',
    message: '',
    content: '',
    isAuthenticated: false
};

const authReducer = (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line
    switch (action.type) {
        case AUTH_USER:
            return {...state, error: '', message: '',
                isAuthenticated: true
            };
        case UNAUTH_USER:
            return {...state, isAuthenticated: false, error: action.payload, message: ''};
        case AUTH_ERROR:
            return {...state, error: action.payload, message: ''};
        case FORGOT_PASSWORD:
            return {...state, message: action.payload.message, error: ''};
        case RESET_PASSWORD:
            return {...state, message: action.payload.message, error: ''};
    }
    return state;
};

export default authReducer;