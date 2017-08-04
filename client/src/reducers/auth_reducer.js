import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FORGOT_PASSWORD_REQUEST,
    RESET_PASSWORD_REQUEST
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
            return {...state, isAuthenticated: false, error: action.payload};
        case AUTH_ERROR:
            return {...state, error: action.payload};
        case FORGOT_PASSWORD_REQUEST:
            return {...state, message: action.payload.message};
        case RESET_PASSWORD_REQUEST:
            return {...state, message: action.payload.message};
    }
    return state;
};

export default authReducer;