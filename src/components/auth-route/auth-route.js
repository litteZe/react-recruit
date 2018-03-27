import {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

@withRouter
export default class AuthRoute extends Component {
    componentDidMount() {
        const publicList = ['/login', 'register'];
        const {pathname} = this.props.location;
        if (publicList.includes(pathname)) {
            return null;
        }
        axios
            .get('/user/info')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        //有登录信息
                    } else {
                        this
                            .props
                            .history
                            .push('/login');
                    }
                }
            });
    }
    render() {
        return null;
    }
}
