import React, {Component} from 'react';
import {connect} from 'react-redux';
import {InputItem, List, NavBar, Icon, Grid} from 'antd-mobile';
import {getMsgList, sendMsg, recvMsg} from '@/redux/chat.redux';
import {getChatId} from '@/util';
// const socket = io('ws://localhost:9093');
const {Item} = List;

const emojis = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 🙂 🤗 🤔 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 😬 😰 😱 😳 😵 😡 😠 😷 🤒 🤕 🤢 🤧 😇 🤠 🤡 🤥 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾'
const emojiArr = emojis
    .split(' ')
    .filter(v => v !== ' ')
    .map(v => ({text: v}));
@connect(state => state, {getMsgList, sendMsg, recvMsg})
export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: [],
            showEmoji: false
        };
    }
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this
                .props
                .getMsgList();
            this
                .props
                .recvMsg();
        }
    }
    fixCarouselBug() {
        setTimeout(() => {
            // 解决antd-mobile Grid跑马灯模式的bug
            window.dispatchEvent(new Event('resize'));
        }, 0);
    }
    handleSubmit() {
        if (!this.state.text) 
            return;
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this
            .props
            .sendMsg({from, to, msg});
        this.setState({text: ''});
    }
    render() {
        // userid指的是对方
        const userid = this.props.match.params.user;
        // 暴力拉取所有用户
        const users = this.props.chat.users;
        // 未发现对方用户则不渲染
        if (!users[userid]) {
            return null;
        }
        // 获得聊天标识id
        const chatid = getChatId(userid, this.props.user._id);
        // 过滤出聊天信息(否则会出现所有通信双方的聊天记录)
        const chatmsg = this
            .props
            .chat
            .chatmsg
            .filter(v => v.chatid === chatid);
        return (
            <div id="chat-page">
                <NavBar
                    mode="dark"
                    icon={< Icon type = "left" />}
                    onLeftClick={() => this.props.history.goBack()}>{users[userid].name}</NavBar>
                {chatmsg.map(v => {
                    const avatar = require(`../images/${users[v.from].avatar}.png`)
                    return v.from === userid
                        ? (
                            <List key={v._id}>
                                <Item wrap thumb={avatar}>{v.content}</Item>
                            </List>
                        )
                        : (
                            <List key={v._id}>
                                <Item
                                    wrap
                                    className="chat-me"
                                    extra={< img alt = "avatar" src = {
                                    avatar
                                } />}>{v.content}</Item>
                            </List>
                        );
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v => this.setState({text: v})}
                            onKeyPress={e => e.charCode === 13 && this.handleSubmit()}
                            extra={< div > <span
                            style={{
                            marginRight: 10
                        }}
                            role="img"
                            aria-label="emoji"
                            onClick={() => {
                            this.setState({
                                showEmoji: !this.state.showEmoji
                            });
                            this.fixCarouselBug();
                        }}>😀</span> < span onClick = {
                            this
                                .handleSubmit
                                .bind(this)
                        } > 发送 </span></div >}></InputItem>
                    </List>
                    {this.state.showEmoji && <Grid
                        data={emojiArr}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel
                        onClick={el => {
                        this.setState({
                            text: this.state.text + el.text
                        });
                    }}/>}
                </div>
            </div>
        );
    }
}
