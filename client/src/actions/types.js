//= =====================
// Main Actions
//= =====================
export const FETCHING = 'fetching',
    NOT_FETCHING = 'not_fetching',
    REDIRECT = 'redirect',
    NOT_REDIRECT = 'not_redirect';

//= =====================
// Auth Actions
//= =====================
export const AUTH_USER = 'auth_user',
    UNAUTH_USER = 'unauth_user',
    FORGOT_PASSWORD_REQUEST = 'forgot_password_request',
    RESET_PASSWORD_REQUEST = 'reset_password_request',
    AUTH_ERROR = 'auth_error';

//= =====================
// Polling Actions
//= =====================
export const RECEIVE_POLLS = 'receive_polls',
    RECEIVE_MY_POLLS = 'receive_my_polls',
    RECEIVE_SINGLE_POLL= 'receive_single_poll',
    SUBMIT_VOTE = 'submit_vote',
    ADD_POLL = 'add_poll',
    DELETE_POLL = 'remove_poll',
    ADD_OPTION = 'add_option',
    POLL_ERROR = 'poll_error';