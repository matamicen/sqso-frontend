export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REQUEST_FEED = 'REQUEST_FEED';
export const RECEIVE_FEED = 'RECEIVE_FEED';

export function doLogin(token,qra) {

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

export function doRequestFeed(){
    return{
        type: REQUEST_FEED
    }
}

export function doReceiveFeed(qsos) {
    return {
        type: RECEIVE_FEED,
        qsos: qsos
    }
}
