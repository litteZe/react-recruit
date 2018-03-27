import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import Logo from '@/components/logo/logo';
import {login} from '@/redux/user.redux';

@connect(state => state.user, {login})
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: ''
        };
    }
    handleChange(key, value) {
        this.setState({[key]: value});
    }
    register() {
        this
            .props
            .history
            .push('/register');
    }
    handleLogin() {
        this
            .props
            .login(this.state);
    }
    render() {
        return (
            <div>
                {this.props.redirectTo
                    ? <Redirect to={this.props.redirectTo}></Redirect>
                    : null}
                <Logo></Logo>
                <h2 style={{
                    "textAlign": "center"
                }}>我是登录页</h2>
                {this.props.msg
                    ? <p className="error-msg">{this.props.msg}</p>
                    : null}
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
                        <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button
                        onClick={this
                        .handleLogin
                        .bind(this)}
                        type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button
                        onClick={this
                        .register
                        .bind(this)}
                        type="primary">注册</Button>
                </WingBlank>
            </div>
        );
    }
}
