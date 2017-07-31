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
export const FETCH_POLLS = 'fetch_polls',
    FETCH_MY_POLLS = 'fetch_my_polls',
    FETCH_SINGLE_POLL = 'fetch_single_poll',
    SUBMIT_VOTE = 'submit vote',
    ADD_POLL = 'add poll',
    DELETE_POLL = 'remove poll',
    ADD_OPTION = 'add option',
    POLL_ERROR = 'poll_error';