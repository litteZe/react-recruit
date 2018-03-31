import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux';
import UserCard from '../../components/user-card/user-card';

@connect(state => state.chatuser, { getUserList })
export default class Genius extends Component {
    componentDidMount() {
        this.props.getUserList('boss');
    }
    render() {
        //在BOSS组件内渲染求职的牛人的列表
        return <UserCard userlist={this.props.userlist} />;
    }
}
