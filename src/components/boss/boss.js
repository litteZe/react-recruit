import React, { Component } from 'react';
import { getUserList } from '../../redux/chatuser.redux';
import { connect } from 'react-redux';
import UserCard from '../../components/user-card/user-card';

@connect(state => state.chatuser, { getUserList })
export default class BOSS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        this.props.getUserList('genius');
    }
    render() {
        //在BOSS组件内渲染求职的牛人的列表
        return <UserCard userlist={this.props.userlist} />;
    }
}
