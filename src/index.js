import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {BrowserRouter, Route} from 'react-router-dom';
import reducers from './reducer';
import './config';
import registerServiceWorker from './registerServiceWorker';
import Login from '@/pages/login/login';
import Register from '@/pages/register/register';
import AuthRoute from '@/components/auth-route/auth-route';
import './index.css';
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

function Boss() {
    return <h2>boss</h2>
}

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path="/boss" component={Boss}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
            </div>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
