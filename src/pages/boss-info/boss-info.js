import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, NavBar, InputItem, TextareaItem } from 'antd-mobile';
import { update } from '../../redux/user.redux';
import AvatarSelector from '../../components/avatar-selector/avatar-selector';

@connect(state => state.user, { update })
export default class BossInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            title: '',
            company: '',
            money: '',
            desc: ''
        };
    }
    handleChange(key, value) {
        this.setState({ [key]: value });
    }
    render() {
        const path = this.props.location.pathname;
        //redirect在reducer里控制
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect && path !== redirect ? <Redirect to={redirect} /> : null}
                <NavBar mode="dark">BOSS完善信息页</NavBar>
                <AvatarSelector
                    selectAvatar={avatar => {
                        this.setState({ avatar });
                    }}
                />
                <InputItem onChange={v => this.handleChange('title', v)}>招聘职位</InputItem>
                <InputItem onChange={v => this.handleChange('company', v)}>公司名称</InputItem>
                <InputItem onChange={v => this.handleChange('money', v)}>职位薪资</InputItem>
                <TextareaItem
                    onChange={v => this.handleChange('desc', v)}
                    rows={3}
                    autoHeight
                    title="职位要求"
                />
                <Button
                    onClick={() => {
                        this.props.update(this.state);
                    }}
                    type="primary">
                    保存
                </Button>
            </div>
        );
    }
}
