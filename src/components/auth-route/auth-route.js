import {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {loadData} from '../../redux/user.redux';

@withRouter
@connect(null, {loadData})
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
                        this
                            .props
                            .loadData(res.data.data);
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
