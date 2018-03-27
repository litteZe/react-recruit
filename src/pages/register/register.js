import React, {Component} from 'react';
import Logo from '@/components/logo/logo';
import {List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '@/redux/user.redux';
import './register.css';
const {RadioItem} = Radio;

@connect(state => state.user, {register})
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        };
    }
    handleChange(key, value) {
        this.setState({[key]: value});
    }
    handleRegister() {
        this
            .props
            .register(this.state);
    }
    render() {
        return (
            <div>
                <Logo></Logo>
                {this.props.msg
                    ? <p className="error-msg">{this.props.msg}</p>
                    : null}
                <List>
                    <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
                    <InputItem type='password' onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
                    <InputItem type='password' onChange={v => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
                    <RadioItem
                        checked={this.state.type === 'genius'}
                        onChange={v => this.handleChange('type', 'genius')}>牛人</RadioItem>
                    <RadioItem
                        checked={this.state.type === 'boss'}
                        onChange={v => this.handleChange('type', 'boss')}>BOSS</RadioItem>
                    <WhiteSpace/>
                </List>
                <Button
                    type="primary"
                    onClick={this
                    .handleRegister
                    .bind(this)}>注册</Button>
            </div>
        );
    }
}

export default Register;
