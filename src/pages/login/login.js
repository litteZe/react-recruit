import React, {Component} from 'react';
import Logo from '@/components/logo/logo';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    register() {
        this
            .props
            .history
            .push('/register');
    }
    render() {
        return (
            <div>
                <Logo></Logo>
                <h2 style={{
                    "textAlign": "center"
                }}>我是登录页</h2>
                <WingBlank>
                    <List>
                        <InputItem>用户名</InputItem>
                        <InputItem>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary">登录</Button>
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
