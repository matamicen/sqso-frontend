export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REQUEST_FEED = 'REQUEST_FEED';
export const RECEIVE_FEED = 'RECEIVE_FEED';
export const REQUEST_USERINFO = 'REQUEST_USERINFO';
export const RECEIVE_USERINFO = 'RECEIVE_USERINFO';
export const REQUEST_QSO = 'REQUEST_QSO';
export const RECEIVE_QSO = 'RECEIVE_QSO';
export const REQUEST_QRA = 'REQUEST_QRA';
export const RECEIVE_QRA = 'RECEIVE_QRA';
export const RECEIVE_FOLLOWERS = 'RECEIVE_FOLLOWERS';

export function doRequestUserInfo() {
    return {
        type: REQUEST_USERINFO,
        fetchingUser: true,
        userFetched: false
    }
}


export function doReceiveUserInfo(followers = null, following = null, profilepic = null) {
    return {
        type: RECEIVE_USERINFO,
        followers: followers,
        following: following,
        profilepic: profilepic,
        fetchingUser: false,
        userFetched: true
    }
}

export function doLogin(token, qra) {
    // console.log("doLogin")
    return {
        type: LOGIN,
        token: token,
        qsosFetched: false,
        FetchingQSO: false,
        FetchingQSOS: false,
        qsos: null,
        qso: null,
        qra: qra,
        followers: null,
        following: null,
        profilepic: null,
        FetchingUser: false,
        userFetched: false
    }
}

export function doLogout() {
    // console.log("doLogout")
    return {
        type: LOGOUT,
        qsos: null,
        qso: null,
        qsosFetched: false,
        FetchingQSO: false,
        FetchingQSOS: false,
        token: null,
        qra: null,
        followers: null,
        following: null,
        profilepic: null,
        FetchingUser: false,
        userFetched: false,
        QRAFetched: false,
        FetchingQRA: false
    }
}

export function doRequestFeed() {
    //   console.log("doRequestFeed")
    return {
        type: REQUEST_FEED,
        FetchingQSOS: true,
        qsosFetched: false
    }
}

export function doReceiveFeed(qsos) {
    return {
        type: RECEIVE_FEED,
        qsos: qsos,
        FetchingQSOS: false,
        qsosFetched: true

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
            //alert(error);
        });
    }
}

export function doFetchUserFeed(token) {
    //  console.log("doFetchUserFeed");
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
         //   alert(error);
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
        qso: qso,
        FetchingQSO: false


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

export function doFetchQRA(qra) {

    return (dispatch) => {
        var apigClient = window.apigClientFactory.newClient({});
        var params = {};
        var body = {"qra": qra};
        var additionalParams = {};

        dispatch(doRequestQRA());
        apigClient.qraInfoPost(params, body, additionalParams)
            .then(function (result) {
                dispatch(doReceiveQRA(result.data.body.message));

            }).catch(function (error) {
            console.log("error");
            console.log(error);
            alert(error);
        });
    };
}

export function doFollowQRA(token, follower) {
    return (dispatch) => {
        var apigClient = window.apigClientFactory.newClient({});

        var params = {
            "Authorization": token
        };
        var body = {
            "qra": follower,
            "datetime": new Date()
        };
        var additionalParams = {};
        apigClient.qraFollowerPost(params, body, additionalParams)
            .then(function (result) {
                if (result.data.body.error > 0) {
                    console.error(result.data.body.message);
                    alert(result.data.body.error);
                } else {
                    dispatch(doReceiveFollowers(result.data.body.message));
                }
            })
            .catch(function (error) {
                console.log("error");
                console.error(error);
            });
    };
}

export function doUnfollowQRA(token, follower) {
    return (dispatch) => {
        var apigClient = window.apigClientFactory.newClient({});

        var params = {
            "Authorization": token
        };
        var body = {
            "qra": follower
        };
        var additionalParams = {};
        apigClient.qraFollowerDelete(params, body, additionalParams)
            .then(function (result) {
                if (result.data.body.error > 0) {
                    console.error(result.data.body.message);
                    alert(result.data.body.error);
                } else {
                    dispatch(doReceiveFollowers(result.data.body.message));
                }
            })
            .catch(function (error) {
                console.log("error");
                console.error(error);
            });
    };
}

export function doRequestQRA() {
    return {
        type: REQUEST_QRA,
        FetchingQRA: true,
        QRAFetched: false

    }
}

export function doReceiveQRA(qra) {
    return {
        type: RECEIVE_QRA,
        qra: qra,
        FetchingQRA: false,
        QRAFetched: true
    }
}

export function doReceiveFollowers(following) {
    console.log("doReceiveFollowers");
    return {
        type: RECEIVE_FOLLOWERS,
        following: following
    }
}