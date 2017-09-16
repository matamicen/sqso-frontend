export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REQUEST_FEED = 'REQUEST_FEED';
export const RECEIVE_FEED = 'RECEIVE_FEED';
export const REQUEST_USERINFO = 'REQUEST_USERINFO';
export const RECEIVE_USERINFO = 'RECEIVE_USERINFO';
export const REQUEST_QSO = 'REQUEST_QSO';
export const RECEIVE_QSO = 'RECEIVE_QSO';


export function doRequestUserInfo() {
    return {
        type: REQUEST_USERINFO,
        FetchingUser: true

    }
}


export function doReceiveUserInfo(followers = null, following = null, profilepic = null) {
    return {
        type: RECEIVE_USERINFO,
        followers: followers,
        following: following,
        profilepic: profilepic,
        FetchingUser: false
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
        type: REQUEST_FEED,
        FetchingQSOS: true
    }
}

export function doReceiveFeed(qsos) {
    return {
        type: RECEIVE_FEED,
        qsos: qsos,
        FetchingQSOS: false

    }
}
export function doFetchUserInfo(token) {
    return (dispatch) => {
        var apigClient = window.apigClientFactory.newClient({});
        var params;
        var body = {};
        var additionalParams = {};


        params = {
            "Authorization": token
        };
        dispatch(doRequestUserInfo());
        apigClient.userInfoGet(params, body, additionalParams)
            .then(function (result) {
                if (result.data.body.error === 0) {
                    dispatch(doReceiveUserInfo(result.data.body.message.followers, result.data.body.message.following, result.data.body.message.profilepic));
                }


            }).catch(function (error) {
            console.log("error");
            console.log(error);
            alert(error);
        });
    }
}
export function doFetchUserFeed(token) {
    return (dispatch) => {
        var apigClient = window.apigClientFactory.newClient({});
        var params;
        var body = {};
        var additionalParams = {};


        params = {
            "Authorization": token
        };

        dispatch(doRequestFeed());
        apigClient.qsoGetUserFeedGet(params, body, additionalParams)
            .then(function (result) {
                dispatch(doReceiveFeed(result.data));

            }).catch(function (error) {
            console.log("error");
            console.log(error);
            alert(error);
        });
    };
}

export function doFetchPublicFeed() {
    return (dispatch) => {
        var apigClient = window.apigClientFactory.newClient({});
        var params = {};
        var body = {};
        var additionalParams = {};


        dispatch(doRequestFeed());
        apigClient.qsoPublicListGet(params, body, additionalParams)
            .then(function (result) {
                dispatch(doReceiveFeed(result.data));

            }).catch(function (error) {
            console.log("error");
            console.log(error);
            alert(error);
        });
    };
}

export function doRequestQSO() {
    return {
        type: REQUEST_QSO,
        FetchingQSO: true

    }
}
export function doReceiveQSO(qso) {
    return {
        type: RECEIVE_QSO,
        qso: qso


    }
}

export function doFetchQSO(idqso) {
    console.log("doFetchQSO");
    return (dispatch) => {
        var apigClient = window.apigClientFactory.newClient({});
        var params = {};
        var body = {"qso": idqso};
        var additionalParams = {};


        dispatch(doRequestQSO());
        apigClient.qsoDetailPost(params, body, additionalParams)
            .then(function (result) {
                dispatch(doReceiveQSO(result.data));

            }).catch(function (error) {
            console.log("error");
            console.log(error);
            alert(error);
        });
    };
}