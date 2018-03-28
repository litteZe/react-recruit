import axios from 'axios';
import {getRedirectPath} from '@/util';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const ERROR_MSG = 'ERROR_MSG';

const initeState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: 'genius'
};

export function user(state = initeState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                msg: '',
                redirectTo: getRedirectPath(action.payload),
                ...action.payload
            };
        case LOAD_DATA:
            return {
                ...state,
                ...action.payload
            };
        case ERROR_MSG:
            return {
                ...state,
                isAuth: false,
                msg: action.msg
            };
        default:
            return state;
    }
}
function authSucess(obj) {
    const {
        pwd,
        ...data
    } = obj;
    return {type: AUTH_SUCCESS, payload: data};
}
function errorMsg(msg) {
    return {msg, type: ERROR_MSG};
}
export function loadData(userInfo) {
    return {type: LOAD_DATA, payload: userInfo};
}

export function update(data) {
    return dispath => {
        axios
            .post('/user/update', data)
            .then(res => {
                if (res.status === 200 & res.data.code === 0) {
                    dispath(authSucess(res.data.data));
                } else {
                    dispath(errorMsg(res.data.msg));
                }
            });
    }
}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名或者密码必须输入');
    }
    return dispath => {
        axios
            .post('/user/login', {user, pwd})
            .then(res => {
                if (res.status === 200 & res.data.code === 0) {
                    dispath(authSucess(res.data.data));
                } else {
                    dispath(errorMsg(res.data.msg));
                }
            });
    }
}

export function register({user, pwd, repeatpwd, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名或者密码必须输入');
    }
    if (pwd !== repeatpwd) {
        return errorMsg('两次输入密码不一致');
    }
    return dispath => {
        axios
            .post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 & res.data.code === 0) {
                    dispath(authSucess({user, pwd, type}));
                } else {
                    dispath(errorMsg(res.data.msg));
                }
            });
    }
}
