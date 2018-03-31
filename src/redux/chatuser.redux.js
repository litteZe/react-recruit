import axios from 'axios';

const USER_LIST = 'USER_LIST';

const initState = {
    userlist: []
};
// 同步action
function userList(data) {
    return { type: USER_LIST, payload: data };
}

// 异步action
export function getUserList(type) {
    return async dispatch => {
        const res = await axios.get(`/user/list?type=${type}`);
        if (res.data.code === 0) {
            dispatch(userList(res.data.data));
        }
    };
}
//reducer
export function chatuser(state = initState, action) {
    switch (action.type) {
        case USER_LIST:
            return {
                ...state,
                userlist: action.payload
            };
        default:
            return state;
    }
}
