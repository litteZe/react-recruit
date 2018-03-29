import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import Logo from '@/components/logo/logo';
import {login} from '@/redux/user.redux';
import ImoocForm from '@/components/imooc-form/imooc-form';

@connect(state => state.user, {login})
@ImoocForm
export default class Login extends Component {
    register() {
        this
            .props
            .history
            .push('/register');
    }
    handleLogin() {
        this
            .props
            .login(this.props.state);
    }
    render() {
        return (
            <div>
                {this.props.redirectTo&& this.props.redirectTo!=='/login'
                    ? <Redirect to={this.props.redirectTo}></Redirect>
                    : null}
                <Logo></Logo>
                {this.props.msg
                    ? <p className="error-msg">{this.props.msg}</p>
                    : null}
                <WingBlank>
                    <List>
                        <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
                        <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
                    </List>
                    <WhiteSpace size="lg"/>
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
