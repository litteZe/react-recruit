import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';

@withRouter
export default class UserCard extends Component {
    static propTypes = {
        userlist: PropTypes.func.isRequired
    };
    handleClick(v) {
        this
            .props
            .history
            .push(`/chat/${v._id}`);
    }
    render() {
        return (
            <WingBlank>
                <WhiteSpace/> {this.props.userlist && this
                    .props
                    .userlist
                    .map(v => (v.avatar
                        ? <div key={v.user}><WhiteSpace size={'sm'}/>
                                <Card onClick={() => this.handleClick(v)}>
                                    <Card.Header
                                        title={v.user}
                                        thumb={require(`../images/${v.avatar}.png`)}
                                        extra={< span > {
                                        v.title
                                    } </span>}></Card.Header>
                                    <Card.Body>
                                        {v.type === 'boss'
                                            ? <div>公司:{v.company}</div>
                                            : null}
                                        {v
                                            .desc
                                            .split('\n')
                                            .map(d => (
                                                <div key={d}>{d}</div>
                                            ))}
                                        {v.type === 'boss'
                                            ? <div>薪资:{v.money}</div>
                                            : null}
                                    </Card.Body>
                                </Card>
                            </div>
                        : null))}
            </WingBlank>
        );
    }
}
