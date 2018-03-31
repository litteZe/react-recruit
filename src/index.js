import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import reducers from './reducer';
import './config';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
