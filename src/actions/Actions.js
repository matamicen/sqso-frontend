export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REQUEST_FEED = 'REQUEST_FEED';
export const RECEIVE_FEED = 'RECEIVE_FEED';
export const REQUEST_USERINFO = 'REQUEST_USERINFO';
export const RECEIVE_USERINFO = 'RECEIVE_USERINFO';

export function doRequestUserInfo() {
    return {
        type: REQUEST_USERINFO

    }
}

export function doReceiveUserInfo(followers = null, following = null, profilepic = null) {
    return {
        type: RECEIVE_USERINFO,
        followers: followers,
        following: following,
        profilepic: profilepic
    }
}

export function doLogin(token, qra) {

    return {
        type: LOGIN,
        token: token,
        qra: qra
    }
}

export function doLogout() {

    return {
        type: LOGOUT
    }
}

export function doRequestFeed() {
    return {
        type: REQUEST_FEED
    }
}

export function doReceiveFeed(qsos) {
    return {
        type: RECEIVE_FEED,
        qsos: qsos
    }
}
