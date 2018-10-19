import API from '@aws-amplify/api';
import ReactGA from 'react-ga';
export const PREPARE_LOGIN = 'PREPARE_LOGIN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REQUEST_FEED = 'REQUEST_FEED';
export const RECEIVE_FEED = 'RECEIVE_FEED';
export const REQUEST_USERINFO = 'REQUEST_USERINFO';
export const RECEIVE_USERINFO = 'RECEIVE_USERINFO';
export const REQUEST_QSO = 'REQUEST_QSO';
export const RECEIVE_QSO = 'RECEIVE_QSO';
export const CLEAR_QSO = 'CLEAR_QSO';
export const REQUEST_QRA = 'REQUEST_QRA';
export const RECEIVE_QRA = 'RECEIVE_QRA';
export const RECEIVE_FOLLOWERS = 'RECEIVE_FOLLOWERS';
export const DELETE_MEDIA = 'DELETE_MEDIA';
export const DELETE_QSO = 'DELETE_QSO';
export const DELETE_COMMENT = 'DELETE_COMMENT';



export function doDeleteComment(idcomment = null, idqso = null, token) {
    return (dispatch) => {
        let apiName = 'superqso';
        let path = '/qso-comment';
        let myInit = {
            body: {
                "idcomment": idcomment,
                "qso": idqso
            }, // replace this with attributes you need
            headers: {
                "Authorization": token
            } // OPTIONAL
        }
        API
            .del(apiName, path, myInit)
            .then(response => {
                response.error === 0  && dispatch(doDeleteCommentResponse(idcomment, idqso));
            })
            .catch(error => {
                console.log(error)
            });
    };

}
export function doDeleteCommentResponse(idcomment = null, idqso = null) {
    ReactGA.event({
        category: 'QSO',
        action: 'CommentDelete'
      });
    return {type: DELETE_COMMENT, idcomment: idcomment, idqso: idqso}
}
export function doDeleteQso(idqso = null, token) {
    return (dispatch) => {
        let apiName = 'superqso';
        let path = '/qsonew';
        let myInit = {
            body: {
                "qso": idqso
            }, // replace this with attributes you need
            headers: {
                "Authorization": token
            } // OPTIONAL
        }
        API
            .del(apiName, path, myInit)
            .then(response => {
              
                response.error === 0 && dispatch(doDeleteQsoResponse(idqso));
              
            })
            .catch(error => {
                console.log(error)
            });
    };
}

export function doDeleteQsoResponse(idqso = null) {
    console.log('doDeleteQsoResponse')
    ReactGA.event({
        category: 'QSO',
        action: 'Delete'
      });
    return {type: DELETE_QSO, idqso: idqso}
}

export function doDeleteMedia(idmedia = null, idqso = null, token) {
    return (dispatch) => {
        let apiName = 'superqso';
        let path = '/qsomediaadd';
        let myInit = {
            body: {
                "idmedia": idmedia,
                "qso": idqso
            }, // replace this with attributes you need
            headers: {
                "Authorization": token
            } // OPTIONAL
        }
        API
            .del(apiName, path, myInit)
            .then(response => {
                // console.log(response)
                response.error === 0 && dispatch(doDeleteMediaResponse(idmedia, idqso));

            })
            .catch(error => {
                console.log(error)
            });
    };

}
export function doDeleteMediaResponse(idmedia = null, idqso = null) {
    ReactGA.event({
        category: 'QSO',
        action: 'MediaDelete'
      });
    return {type: DELETE_MEDIA, idmedia: idmedia, idqso: idqso}
}
export function doRequestUserInfo() {
    return {type: REQUEST_USERINFO, fetchingUser: true, userFetched: false}
}

export function doReceiveUserInfo(followers = null, following = null, profilepic = null, avatarpic = null) {
    return {
        type: RECEIVE_USERINFO,
        followers: followers,
        following: following,
        profilepic: profilepic,
        avatarpic: avatarpic,
        fetchingUser: false,
        userFetched: true
    }
}
export function doStartingLogin(){
    return {
        type: PREPARE_LOGIN
    }
}
export function doLogin(token, qra) {
    ReactGA.set({ userId: qra })
    ReactGA.event({
        category: 'User',
        action: 'Login'
      });
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
    ReactGA.event({
        category: 'User',
        action: 'Logout'
      });
    return {
        type: LOGOUT,
        qsos: null,
        qso: null,
        qsosFetched: false,
        FetchingQSO: false,
        FetchingQSOS: false,
        token: null,
        qra: null,
        isAuthenticated: false,
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
    // console.log("doRequestFeed")
    return {type: REQUEST_FEED, FetchingQSOS: true, qsosFetched: false}
}

export function doReceiveFeed(qsos) {
    // console.log("doReceiveFeed")
    return {type: RECEIVE_FEED, qsos: qsos, FetchingQSOS: false, qsosFetched: true}
}

export function doFetchUserInfo(token) {
    return (dispatch) => {
        dispatch(doRequestUserInfo());
        let apiName = 'superqso';
        let path = '/user-info';
        let myInit = {
            body: {}, // replace this with attributes you need
            headers: {
                "Authorization": token
            } // OPTIONAL
        }
        API
            .get(apiName, path, myInit)
            .then(response => {
                console.log(response.body)
                if (response.body.error === 0) {
                    dispatch(doReceiveUserInfo(response.body.message.followers, response.body.message.following, response.body.message.qra.profilepic, response.body.message.qra.avatarpic));
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    }
}

export function doFetchUserFeed(token) {
    // console.log("doFetchUserFeed");

    return (dispatch) => {
        dispatch(doRequestFeed());
        let apiName = 'superqso';
        let path = '/qso-get-user-feed';
        let myInit = {
            body: {}, // replace this with attributes you need
            headers: {
                "Authorization": token
            } // OPTIONAL
        }
        API
            .get(apiName, path, myInit)
            .then(response => {
                // console.table(response)
                dispatch(doReceiveFeed(response));
                // Add your code here
            })
            .catch(error => {
                console.log(error.response)
            });
    };
}

export function doFetchPublicFeed() {
    // console.log("doFetchPublicFeed");
    return (dispatch) => {
        dispatch(doRequestFeed());
        let apiName = 'superqso';
        let path = '/qso-public-list';
        let myInit = {
            body: {}, // replace this with attributes you need
            headers: {} // OPTIONAL
        }
        API
            .get(apiName, path, myInit)
            .then(response => {

                dispatch(doReceiveFeed(response));
                // Add your code here
            })
            .catch(error => {
                console.log(error)
            });
    };
}

export function doRequestQSO() {
    return {type: REQUEST_QSO, FetchingQSO: true}
}

export function doReceiveQSO(qso) {
    return {type: RECEIVE_QSO, qso: qso, FetchingQSO: false}
}
export function doClearQSO() {
    return {type: CLEAR_QSO, qso: "", FetchingQSO: false}
}

export function doFetchQSO(idqso) {
    ReactGA.set({ qso: idqso })    
    ReactGA.event({
        category: 'QSO',
        action: 'getInfo'
      });
    return (dispatch) => {
        let apiName = 'superqso';
        let path = '/qso-detail';
        let myInit = {
            body: {
                "qso": idqso
            }, // replace this with attributes you need
            headers: {
                "Content-Type": "application/json"
            } // OPTIONAL
        }
        API
            .post(apiName, path, myInit)
            .then(response => {
                
                if (response.body.error === 0) {
                    dispatch(doReceiveQSO(response.body.message));
                }
            })
            .catch(error => {
                console.log(error)
            });
    };
}

export function doFetchQRA(qra) {
    ReactGA.set({ qra: qra })    
    ReactGA.event({
        category: 'QRA',
        action: 'getInfo'
      });
    return (dispatch) => {

        let apiName = 'superqso';
        let path = '/qra-info';
        let myInit = {
            body: {
                "qra": qra
            }, // replace this with attributes you need
            headers: {
                "Content-Type": "application/json"
            } // OPTIONAL
        }
        dispatch(doRequestQRA());
        API
            .post(apiName, path, myInit)
            .then(response => {

                dispatch(doReceiveQRA(response.body.message));
            })
            .catch(error => {
                console.log(error)
            });
    };
}

export function doFollowQRA(token, follower) {
    ReactGA.set({ follower: follower })    
    ReactGA.event({
        category: 'QRA',
        action: 'follow'
      });
    return (dispatch) => {
        let apiName = 'superqso';
        let path = '/qra-follower';
        let myInit = {
            body: {
                "qra": follower,
                "datetime": new Date()
            }, // replace this with attributes you need
            headers: {
                "Authorization": token
            } // OPTIONAL
        }
        API
            .post(apiName, path, myInit)
            .then(response => {
                if (response.body.error > 0) {
                    console.error(response.body.message);
                    alert(response.body.error);
                } else {
                    dispatch(doReceiveFollowers(response.body.message));
                }
            })
            .catch(error => {
                console.log(error)
            });
    };
}

export function doUnfollowQRA(token, follower) {
    ReactGA.set({ follower: follower })    
    ReactGA.event({
        category: 'QRA',
        action: 'unfollow'
      });
    return (dispatch) => {
        let apiName = 'superqso';
        let path = '/qra-follower';
        let myInit = {
            body: {
                "qra": follower
            }, // replace this with attributes you need
            headers: {
                "Authorization": token
            } // OPTIONAL
        }
        API
            .del(apiName, path, myInit)
            .then(response => {
                if (response.body.error > 0) {
                    console.error(response.body.message);
                    alert(response.body.error);
                } else {
                    dispatch(doReceiveFollowers(response.body.message));
                }
            })
            .catch(error => {
                console.log(error)
            });
    };
}

export function doRequestQRA() {
    return {type: REQUEST_QRA, FetchingQRA: true, QRAFetched: false}
}

export function doReceiveQRA(qra) {
    return {type: RECEIVE_QRA, qra: qra, FetchingQRA: false, QRAFetched: true}
}

export function doReceiveFollowers(following) {
    console.log("doReceiveFollowers");
    return {type: RECEIVE_FOLLOWERS, following: following}
}