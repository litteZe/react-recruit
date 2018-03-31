import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { NavBar } from 'antd-mobile';
import QueueAnim from 'rc-queue-anim';
import NavLinkBar from '../../components/nav-link-bar/nav-link-bar';
import BOSS from '../../components/boss/boss';
import Genius from '../../components/genius/genius';
import Msg from '../../components/msg/msg';
import Profile from '../../components/profile/profile';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';

@connect(state => state, { getMsgList, sendMsg, recvMsg })
export default class Dashboard extends Component {
    // constructor(props) {     super(props); }
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    render() {
        const { user } = this.props;
        const { pathname } = this.props.location;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: BOSS,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'BOSS',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/profile',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: Profile
            }
        ];
        const page = navList.find(v => v.path === pathname);
        return page ? (
            <div>
                <NavBar className="fixed-header" mode="dark">
                    {page.title}
                </NavBar>
                <div
                    style={{
                        marginTop: 45
                    }}>
                    <QueueAnim type="scaleX" duration={800}>
                        <Route key={page.path} path={page.path} component={page.component} />
                    </QueueAnim>
                </div>
                <NavLinkBar data={navList} />
            </div>
        ) : (
            <Redirect to={`/${this.props.user.type}`} />
        );
    }
}
