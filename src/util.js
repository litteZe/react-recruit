export function getRedirectPath({ type, avatar }) {
    //根据类型决定跳转路径
    let url = type === 'boss' ? '/boss' : '/genius';
    //如果没有头像就去完善信息
    if (!avatar) {
        url += 'info';
    }
    return url;
}

export function getChatId(userId, targetId) {
    return [userId, targetId].sort().join('_');
}
