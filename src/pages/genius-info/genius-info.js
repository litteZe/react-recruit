import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Button, NavBar, InputItem, TextareaItem } from 'antd-mobile';
import { update } from '../../redux/user.redux';
import AvatarSelector from '../../components/avatar-selector/avatar-selector';

@withRouter
@connect(state => state.user, { update })
export default class GeniusInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            title: '',
            desc: ''
        };
    }
    handleChange(key, value) {
        this.setState({ [key]: value });
    }
    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect && path !== redirect ? <Redirect to={redirect} /> : null}
                <NavBar mode="dark">牛人完善信息页</NavBar>
                <AvatarSelector
                    selectAvatar={avatar => {
                        this.setState({ avatar });
                    }}
                />
                <InputItem onChange={v => this.handleChange('title', v)}>求职岗位</InputItem>
                <TextareaItem
                    onChange={v => this.handleChange('desc', v)}
                    rows={3}
                    autoHeight
                    title="个人简介"
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
