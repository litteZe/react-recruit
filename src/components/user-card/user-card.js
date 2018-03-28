import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';

export default class UserCard extends Component {
    static propTypes = {
        userlist: PropTypes.func.isRequired
    };
    render() {
        return (
            <WingBlank>
                <WhiteSpace/>
                {this
                    .props
                    .userlist && this
                    .props
                    .userlist
                    .map(v => (v.avatar
                        ? <div><WhiteSpace size={'sm'}/><Card key={v.user}>
                                <Card.Header
                                    title={v.user}
                                    thumb={require(`../images/${v.avatar}.png`)}
                                    extra={< span > {
                                    v.title
                                } </span>}></Card.Header>
                                <Card.Body>
                                    {v.type==='boss'?<div>公司:{v.company}</div>:null}
                                    {v
                                        .desc
                                        .split('\n')
                                        .map(d => (
                                            <div key={d}>{d}</div>
                                        ))}
                                    {v.type==='boss'?<div>薪资:{v.money}</div>:null}
                                </Card.Body>
                            </Card></div>
                        : null))}
            </WingBlank>
        );
    }
}
