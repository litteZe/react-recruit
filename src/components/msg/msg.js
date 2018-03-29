import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Badge,List} from 'antd-mobile';

const {Item} = List;
const {Brief} = Item;

@connect(state => state)
export default class Msg extends Component {
    getLast(arr) {
        return arr[arr.length - 1];
    }
    render() {
        // 当前登录用户
        const userid = this.props.user._id;
        // 所有用户列表
        const userinfo = this.props.chat.users;
        const msgGroup = {};
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || [];
            msgGroup[v.chatid].push(v);
        });
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            return this.getLast(b).create_time - this.getLast(a).create_time;
        });
        return (
            <div>
                <List>
                    {chatList.map(v => {
                        // 最后一条聊天记录
                        const lastItem = this.getLast(v);
                        // 对方
                        const targetId = v[0].from===userid?v[0].to:v[0].from;
                        const unreadNum = v.filter(e=>!e.read&&e.to===userid).length;
                        const name = userinfo[targetId] ? userinfo[targetId].name:'';
                        const avatar = userinfo[targetId] ? userinfo[targetId].avatar:'';
                        return (
                        <Item
                            extra={<Badge text={unreadNum}></Badge>}
                            key={lastItem._id}
                            arrow="horizontal"
                            onClick={()=>this.props.history.push(`/chat/${targetId}`)}
                            thumb={avatar && require(`../images/${avatar}.png`)}>
                            {lastItem.content}
                            <Brief>{name}</Brief>
                        </Item>);
                    }) }
                </List>
            </div>
        );
    }
}
