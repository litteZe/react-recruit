import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router';
import {NavBar} from 'antd-mobile';
import NavLinkBar from '@/components/nav-link-bar/nav-link-bar';
import BOSS from '@/components/boss/boss';
import Genius from '@/components/genius/genius';

function Msg() {
    return <h1>消息</h1>
}

function Profile() {
    return <h1>个人中心</h1>
}

@connect(state => state)
export default class Dashboard extends Component {
    // constructor(props) {     super(props); }
    render() {
        const {user} = this.props;
        const {pathname} = this.props.location;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: BOSS,
                hide: user.type === 'genius'
            }, {
                path: '/genius',
                text: 'BOSS',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === 'boss'
            }, {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            }, {
                path: '/profile',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: Profile
            }
        ];
        return (
            <div>
                <NavBar className="fixed-header" mode="dark">
                    {navList
                        .find(v => v.path === pathname)
                        .title}
                </NavBar>
                <div style={{
                    marginTop: 45
                }}>
                    <Switch>
                        {navList.map(v => (
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        );
    }
}
