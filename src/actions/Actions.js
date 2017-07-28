export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

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

