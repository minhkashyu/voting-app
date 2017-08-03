//= =====================
// Auth Actions
//= =====================
export const AUTH_USER = 'auth_user',
    UNAUTH_USER = 'unauth_user',
    FORGOT_PASSWORD_REQUEST = 'forgot_password_request',
    RESET_PASSWORD_REQUEST = 'reset_password_request',
    PROTECTED_TEST = 'protected_test',
    AUTH_ERROR = 'auth_error';

//= =====================
// Polling Actions
//= =====================
export const FETCHING = 'fetching',
    RECEIVE_POLLS = 'receive_polls',
    RECEIVE_MY_POLLS = 'receive_my_polls',
    RECEIVE_SINGLE_POLL= 'receive_single_poll',
    SUBMIT_VOTE = 'submit vote',
    ADD_POLL = 'add poll',
    DELETE_POLL = 'remove poll',
    ADD_OPTION = 'add option',
    POLL_ERROR = 'poll_error';