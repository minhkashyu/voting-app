import React from 'react';
import { render } from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk.withExtraArgument(cookies))
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
