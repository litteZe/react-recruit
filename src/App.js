import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/register/register';
import AuthRoute from './components/auth-route/auth-route';
import BossInfo from './pages/boss-info/boss-info';
import GeniusInfo from './pages/genius-info/genius-info';
import Dashboard from './components/dashboard/dashboard';
import Chat from './components/chat/chat';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
    componentDidCatch(err, info) {
        this.setState({
            hasError: true
        });
    }
    render() {
        return this.state.hasError?<h2>页面出错了</h2>:(
            <div>
                <AuthRoute />
                <Switch>
                    <Route path="/bossinfo" component={BossInfo} />
                    <Route path="/geniusinfo" component={GeniusInfo} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/chat/:user" component={Chat} />
                    <Route component={Dashboard} />
                </Switch>
            </div>
        );
    }
}
