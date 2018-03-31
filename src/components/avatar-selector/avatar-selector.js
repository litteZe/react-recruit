import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, List } from 'antd-mobile';

export default class AvatarSelector extends Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const avatarList = [
            'boy',
            'bull',
            'chick',
            'crab',
            'girl',
            'hedgehog',
            'hippopotamus',
            'koala',
            'lemur',
            'man',
            'pig',
            'tiger',
            'whale',
            'woman',
            'zebra'
        ].map(v => ({
            icon: require(`../images/${v}.png`),
            text: v
        }));
        const gridHeader = this.state.text ? (
            <div>
                <span>已选择头像</span>
                <img
                    style={{
                        width: 20
                    }}
                    src={this.state.icon}
                    alt={'avatar-' + this.state.text}
                />
            </div>
        ) : (
            <div>请选择头像</div>
        );
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={el => {
                            this.setState(el);
                            this.props.selectAvatar(el.text);
                        }}
                    />
                </List>
            </div>
        );
    }
}
