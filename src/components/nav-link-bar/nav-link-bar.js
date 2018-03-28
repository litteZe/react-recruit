import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { TabBar} from 'antd-mobile';

@withRouter
export default class NavLinkBar extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    };
    render() {
        const navList = this.props.data.filter(v=>!v.hide);
        const {pathname} = this.props.location;
        return (  
            <TabBar>
                {navList.map(v=>(
                    <TabBar.Item
                        key={v.path}
                        title={v.text}
                        icon={{uri:require(`./images/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`./images/${v.icon}-active.png`)}}
                        selected={pathname===v.path}
                        onPress={()=>{
                            this.props.history.push(v.path);
                        }}
                    ></TabBar.Item>
                ))}
            </TabBar>
        );
    }
}
