/**
 * 个人中心页
 */
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    Button,
    Result,
    List,
    WhiteSpace,
    WingBlank,
    Modal
} from 'antd-mobile';
import browserCookies from 'browser-cookies';
import {logoutSubmit} from '@/redux/user.redux';

const {Item} = List;
const {Brief} = Item;
const {alert} = Modal;

@connect(state => state.user, {logoutSubmit})
export default class Profile extends Component {
    logout() {
        alert('注销', '确认退出吗?', [
            {
                text: '取消',
                onPress: () => {
                    console.log('cancel')
                }
            }, {
                text: '退出',
                onPress: () => {
                    browserCookies.erase('userid');
                    this
                        .props
                        .logoutSubmit();
                }
            }
        ])

    }
    render() {
        const props = this.props;
        return props.user
            ? (
                <div>
                    <Result
                        img={< img src = {
                        require(`../images/${props.avatar}.png`)
                    }
                    style = {{width: 50}}alt = "avatar" />}
                        title={props.user}
                        message={props.type === 'boss'
                        ? props.company
                        : null}/>
                    <List renderHeader={() => '简介'}>
                        <Item wrap>{props.title} {props
                                .desc
                                .split('\n')
                                .map(v => <Brief key={v}>{v}</Brief>)}
                            {props.moeny && <Brief>薪资:{props.moeny}</Brief>}
                        </Item>
                    </List>
                    <WhiteSpace size="xl"></WhiteSpace>
                    <WingBlank>
                        <Button
                            type="warning"
                            onClick={this
                            .logout
                            .bind(this)}>退出登录</Button>
                    </WingBlank>
                </div>
            )
            : <Redirect to={props.redirectTo}></Redirect>;
    }
}
