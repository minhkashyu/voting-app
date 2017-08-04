import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import mainReducer from './main_reducer';
import authReducer from './auth_reducer';
import pollReducer from './poll_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    main: mainReducer,
    auth: authReducer,
    polling: pollReducer
});

export default rootReducer; 