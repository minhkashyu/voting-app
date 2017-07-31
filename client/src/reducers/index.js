import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import pollReducer from './poll_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    poll: pollReducer
});

export default rootReducer; 