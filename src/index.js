import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import reducers from '@/reducer';
import '@/config';
import registerServiceWorker from '@/registerServiceWorker';
import Login from '@/pages/login/login';
import Register from '@/pages/register/register';
import AuthRoute from '@/components/auth-route/auth-route';
import BossInfo from '@/pages/boss-info/boss-info';
import GeniusInfo from '@/pages/genius-info/genius-info'
import Dashboard from '@/components/dashboard/dashboard';
import Chat from '@/components/chat/chat';
import '@/index.css';
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/chat/:user" component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
