import API from "@aws-amplify/api";
import Auth from "@aws-amplify/auth";
import ReactGA from "react-ga";
import * as Sentry from "@sentry/browser";
export const PUBLIC_SESSION = "PUBLIC_SESSION";
export const PREPARE_LOGIN = "PREPARE_LOGIN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REQUEST_FEED = "REQUEST_FEED";
export const RECEIVE_FEED = "RECEIVE_FEED";
export const REQUEST_USERINFO = "REQUEST_USERINFO";
export const RECEIVE_USERINFO = "RECEIVE_USERINFO";
export const RECEIVE_USER_BIO = "RECEIVE_USER_BIO";
export const RECEIVE_USER_DATA_INFO = "RECEIVE_USER_DATA_INFO";
export const REQUEST_QSO = "REQUEST_QSO";
export const RECEIVE_QSO = "RECEIVE_QSO";
export const RECEIVE_QSO_ERROR = "RECEIVE_QSO_ERROR";
export const RECEIVE_QSO_LINK = "RECEIVE_QSO_LINK";
export const CLEAR_QSO = "CLEAR_QSO";
export const CLEAR_QSO_LINK = "CLEAR_QSO_LINK";
export const REQUEST_QRA = "REQUEST_QRA";
export const RECEIVE_QRA = "RECEIVE_QRA";
export const CLEAR_QRA = "CLEAR_QRA";
export const RECEIVE_FOLLOWERS = "RECEIVE_FOLLOWERS";
export const RECEIVE_QSO_MEDIA_COUNTER = "RECEIVE_QSO_MEDIA_COUNTER";
export const DELETE_MEDIA = "DELETE_MEDIA";
export const DELETE_QSO = "DELETE_QSO";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const NOTIFICATION_READ = "NOTIFICATION_READ";
export const RECEIVE_NOTIFICATIONS = "RECEIVE_NOTIFICATIONS";

export function doNotificationRead(idnotif = null, token) {
  return dispatch => {
    let apiName = "superqso";
    let path = "/qra-notification/set-read";
    let myInit = {
      body: {
        idqra_notifications: idnotif
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    };
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0)
          dispatch(doNotificationReadResponse(idnotif));
        else console.log(response.body.message);
      })
      .catch(error => {
        Auth.currentSession()
          .then(session => {
            token = session.idToken.jwtToken;
            dispatch(refreshToken(token));
            dispatch(doNotificationRead(idnotif, token));
          })
          .catch(error => {
            if (process.env.NODE_ENV !== "production") {
              console.log(error);
            }
            Sentry.captureException(error);
            dispatch(doLogout());
          });
      });
  };
}
export function doDeleteComment(idcomment, idqso, token) {
  return dispatch => {
    let apiName = "superqso";
    let path = "/qso-comment";
    let myInit = {
      body: {
        idcomment: idcomment,
        qso: idqso
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    };
    API.del(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0)
          dispatch(doDeleteCommentResponse(idcomment, idqso));
        else console.log(response.body.message);
      })
      .catch(error => {
        Auth.currentSession()
          .then(session => {
            token = session.idToken.jwtToken;
            dispatch(refreshToken(token));
            dispatch(doDeleteComment(idcomment, idqso, token));
          })
          .catch(error => {
            if (process.env.NODE_ENV !== "production") {
              console.log(error);
            }
            Sentry.captureException(error);
            dispatch(doLogout());
          });
      });
  };
}
export function refreshToken(token) {
  return {
    type: REFRESH_TOKEN,
    token: token
  };
}
export function doDeleteCommentResponse(idcomment = null, idqso = null) {
  ReactGA.event({
    category: "QSO",
    action: "CommentDelete"
  });
  return {
    type: DELETE_COMMENT,
    idcomment: idcomment,
    idqso: idqso
  };
}
export function doNotificationReadResponse(idnotif) {
  ReactGA.event({
    category: "QRA",
    action: "CommentRead"
  });
  return {
    type: NOTIFICATION_READ,
    idnotif: idnotif
  };
}
export function doDeleteQso(idqso, token) {
  return dispatch => {
    let apiName = "superqso";
    let path = "/qsonew";
    let myInit = {
      body: {
        qso: idqso
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    };
    API.del(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0) dispatch(doDeleteQsoResponse(idqso));
        else console.log(response.body.message);
      })
      .catch(error => {
        Auth.currentSession()
          .then(session => {
            token = session.idToken.jwtToken;
            dispatch(refreshToken(token));
            dispatch(doDeleteQso(idqso, token));
          })
          .catch(error => {
            if (process.env.NODE_ENV !== "production") {
              console.log(error);
            }
            Sentry.captureException(error);
            dispatch(doLogout());
          });
      });
  };
}

export function doDeleteQsoResponse(idqso = null) {
  ReactGA.event({
    category: "QSO",
    action: "Delete"
  });
  return {
    type: DELETE_QSO,
    idqso: idqso
  };
}

export function doDeleteMedia(idmedia, idqso, token) {
  return dispatch => {
    let apiName = "superqso";
    let path = "/qsomediaadd";
    let myInit = {
      body: {
        idmedia: idmedia,
        qso: idqso
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    };
    API.del(apiName, path, myInit)
      .then(response => {
        // console.log(response)
        if (response.body.error === 0)
          dispatch(doDeleteMediaResponse(idmedia, idqso));
        else console.log(response.body.message);
      })
      .catch(error => {
        Auth.currentSession()
          .then(session => {
            token = session.idToken.jwtToken;
            dispatch(refreshToken(token));
            dispatch(doDeleteMedia(idmedia, idqso, token));
          })
          .catch(error => {
            if (process.env.NODE_ENV !== "production") {
              console.log(error);
            }
            Sentry.captureException(error);
            dispatch(doLogout());
          });
      });
  };
}
export function doDeleteMediaResponse(idmedia = null, idqso = null) {
  ReactGA.event({
    category: "QSO",
    action: "MediaDelete"
  });
  return {
    type: DELETE_MEDIA,
    idmedia: idmedia,
    idqso: idqso
  };
}
export function doRequestUserInfo() {
  return {
    type: REQUEST_USERINFO,
    fetchingUser: true,
    userFetched: false
  };
}

export function doReceiveUserInfo(
  followers = null,
  following = null,
  qra = null,
  notifications = null
) {
  return {
    type: RECEIVE_USERINFO,
    followers: followers,
    following: following,
    notifications: notifications,
    qra: qra,
    fetchingUser: false,
    userFetched: true
  };
}
export function doStartingLogin() {
  return {
    type: PREPARE_LOGIN
  };
}
export function doSetPublicSession() {
  return {
    type: PUBLIC_SESSION
  };
}
export function doLogin(token, qra, identityId) {
  ReactGA.set({
    userId: qra
  });
  ReactGA.event({
    category: "User",
    action: "Login"
  });

  return {
    type: LOGIN,
    token: token,
    qra: qra,
    identityId: identityId
  };
}

export function doLogout() {
  ReactGA.event({
    category: "User",
    action: "Logout"
  });
  return {
    type: LOGOUT
  };
}

export function doRequestFeed() {
  return {
    type: REQUEST_FEED,
    FetchingQSOS: true,
    qsosFetched: false
  };
}

export function doReceiveNotifications(notifications) {
  return {
    type: RECEIVE_NOTIFICATIONS,
    notifications: notifications
  };
}
export function doReceiveFeed(qsos) {
  return {
    type: RECEIVE_FEED,
    qsos: qsos,
    FetchingQSOS: false,
    qsosFetched: true
  };
}
export function doFetchUserInfo(token) {
  return dispatch => {
    dispatch(doRequestUserInfo());
    let apiName = "superqso";
    let path = "/user-info";
    let myInit = {
      body: {}, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    };
    API.get(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0)
          dispatch(
            doReceiveUserInfo(
              response.body.message.followers,
              response.body.message.following,
              response.body.message.qra,
              response.body.message.notifications
            )
          );
        else console.log(response.body.message);
      })
      .catch(error => {
        console.log(error);
        Auth.currentSession()
          .then(session => {
            token = session.idToken.jwtToken;
            dispatch(refreshToken(token));
            dispatch(doFetchUserInfo(token));
          })
          .catch(error => {
            if (process.env.NODE_ENV !== "production") {
              console.log(error);
            }
            Sentry.captureException(error);
            dispatch(doLogout());
          });
      });
  };
}
export function doSaveUserInfo(token, qra) {
  return dispatch => {
    dispatch(doRequestUserInfo());
    let apiName = "superqso";
    let path = "/qra-info/info";
    let myInit = {
      body: {
        qra: qra
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    };
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error !== 0) console.log(response.body.message);
        else dispatch(doReceiveUserDataInfo(response.body.message));
      })
      .catch(error => {
        Auth.currentSession()
          .then(session => {
            token = session.idToken.jwtToken;
            dispatch(refreshToken(token));
            dispatch(doSaveUserInfo(token, qra));
          })
          .catch(error => {
            if (process.env.NODE_ENV !== "production") {
              console.log(error);
            }
            Sentry.captureException(error);
            dispatch(doLogout());
          });
      });
  };
}
export function doReceiveUserDataInfo(qra) {
  return {
    type: RECEIVE_USER_DATA_INFO,
    qra: qra
  };
}
export function doSaveUserBio(token, bio, identityId) {
  return dispatch => {
    let apiName = "superqso";
    let path = "/qra-info/bio";
    let myInit = {
      body: {
        bio: bio,
        identityId: identityId
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    };

    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error !== 0) console.log(response.body.message);
        else dispatch(doReceiveUserBio(response.body.message));
      })
      .catch(error => {
        Auth.currentSession()
          .then(session => {
            token = session.idToken.jwtToken;
            dispatch(refreshToken(token));
            dispatch(doSaveUserBio(token, bio, identityId));
          })
          .catch(error => {
            if (process.env.NODE_ENV !== "production") {
              console.log(error);
            }
            Sentry.captureException(error);
            dispatch(doLogout());
          });
      });
  };
}

export function doReceiveUserBio(qra) {
  return {
    type: RECEIVE_USER_BIO,
    qra: qra
  };
}
export function doFetchUserFeed(token) {
  return dispatch => {
    dispatch(doRequestFeed());
    let apiName = "superqso";
    let path = "/qso-get-user-feed";
    let myInit = {
      body: {}, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    };
    API.get(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0)
          dispatch(doReceiveFeed(response.body.message));
        else console.log(response.body.message);
      })
      .catch(error => {
        Auth.currentSession()
          .then(session => {
            token = session.idToken.jwtToken;
            dispatch(refreshToken(token));
            dispatch(doFetchUserFeed(token));
          })
          .catch(error => {
            if (process.env.NODE_ENV !== "production") {
              console.log(error);
            }
            Sentry.captureException(error);
            dispatch(doLogout());
          });
      });
  };
}

export function doFetchNotifications(token) {
  return dispatch => {
    dispatch(doRequestFeed());
    let apiName = "superqso";
    let path = "/qra-notification";
    let myInit = {
      body: {}, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    };
    API.get(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0)
          dispatch(doReceiveNotifications(response.body.message));
        else console.log(response.body.message);
      })
      .catch(error => {
        Auth.currentSession()
          .then(session => {
            console.log(session);
            token = session.idToken.jwtToken;
            dispatch(refreshToken(token));
            dispatch(doFetchNotifications(token));
          })
          .catch(error => {
            if (process.env.NODE_ENV !== "production") {
              console.log(error);
            }
            Sentry.captureException(error);
            dispatch(doLogout());
          });
      });
  };
}

export function doFetchPublicFeed() {
  // console.log("doFetchPublicFeed");
  return dispatch => {
    dispatch(doRequestFeed());
    let apiName = "superqso";
    let path = "/qso-public-list";
    let myInit = {
      body: {}, // replace this with attributes you need
      headers: {} // OPTIONAL
    };
    API.get(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0)
          dispatch(doReceiveFeed(response.body.message));
        else console.log(response.body.message);
      })
      .catch(error => {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        Sentry.captureException(error);
      });
  };
}

export function doRequestQSO() {
  return {
    type: REQUEST_QSO
  };
}

export function doReceiveQSO(data, error) {
  let { monthly_qso_views, ...qsoData } = data;
  if (error === 0)
    return {
      type: RECEIVE_QSO,
      qso: qsoData,
      monthly_qso_views: monthly_qso_views
    };
  else {
    return {
      type: RECEIVE_QSO_ERROR,
      error: data
    };
  }
}
export function doReceiveQsoLink(qso) {
  return {
    type: RECEIVE_QSO_LINK,
    qso_link: qso,
    FetchingQSO: false
  };
}
export function doClearQsoLink() {
  return {
    type: CLEAR_QSO_LINK,
    qso_link: "",
    FetchingQSO: false
  };
}
export function doFetchQSO(idqso, token = null) {
  ReactGA.set({
    qso: idqso
  });
  ReactGA.event({
    category: "QSO",
    action: "getInfo"
  });
  if (token) {
    return dispatch => {
      let apiName = "superqso";
      let path = "/qso-detail/secured";
      let myInit = {
        body: {
          guid: idqso
        }, // replace this with attributes you need
        headers: {
          Authorization: token
        } // OPTIONAL
      };
      API.post(apiName, path, myInit)
        .then(response => {
          dispatch(doReceiveQSO(response.body.message, response.body.error));
        })
        .catch(error => {
          if (process.env.NODE_ENV !== "production") {
            console.log(error);
          }
          Sentry.captureException(error);
        });
    };
  } else {
    return dispatch => {
      let apiName = "superqso";
      let path = "/qso-detail";
      let myInit = {
        body: {
          guid: idqso
        }, // replace this with attributes you need
        headers: {
          "Content-Type": "application/json"
        } // OPTIONAL
      };
      API.post(apiName, path, myInit)
        .then(response => {
          dispatch(doReceiveQSO(response.body.message, response.body.error));
        })
        .catch(error => {
          if (process.env.NODE_ENV !== "production") {
            console.log(error);
          }
          Sentry.captureException(error);
        });
    };
  }
}
export function doFetchQsoLink(idqso) {
  ReactGA.set({
    qso: idqso
  });
  ReactGA.event({
    category: "QSO",
    action: "getInfo"
  });
  return dispatch => {
    let apiName = "superqso";
    let path = "/qso-detail";
    let myInit = {
      body: {
        guid: idqso
      }, // replace this with attributes you need
      headers: {
        "Content-Type": "application/json"
      } // OPTIONAL
    };
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0)
          dispatch(doReceiveQsoLink(response.body.message));
        else console.log(response.body.message);
      })
      .catch(error => {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        Sentry.captureException(error);
      });
  };
}

export function doFetchQRA(qra, token = null) {
  ReactGA.set({
    qra: qra
  });
  ReactGA.event({
    category: "QRA",
    action: "getInfo"
  });
  if (token) {
    return dispatch => {
      let apiName = "superqso";
      let path = "/qra-info/secured";
      let myInit = {
        body: {
          qra: qra
        }, // replace this with attributes you need
        headers: {
          Authorization: token
        } // PTIONAL
      };
      dispatch(doRequestQRA());
      API.post(apiName, path, myInit)
        .then(response => {
          if (response.body.error === 0)
            dispatch(doReceiveQRA(response.body.message));
          else console.log(response.body.message);
        })
        .catch(error => {
          if (process.env.NODE_ENV !== "production") {
            console.log(error);
          }
          Sentry.captureException(error);
        });
    };
  } else {
    return dispatch => {
      let apiName = "superqso";
      let path = "/qra-info";
      let myInit = {
        body: {
          qra: qra
        }, // replace this with attributes you need
        headers: {
          // "Authorization": token
        } // PTIONAL
      };
      dispatch(doRequestQRA());
      API.post(apiName, path, myInit)
        .then(response => {
          if (response.body.error === 0)
            dispatch(doReceiveQRA(response.body.message));
          else console.log(response.body.message);
        })
        .catch(error => {
          if (process.env.NODE_ENV !== "production") {
            console.log(error);
          }
          Sentry.captureException(error);
        });
    };
  }
}

export function doFollowQRA(token, follower) {
  ReactGA.set({
    follower: follower
  });
  ReactGA.event({
    category: "QRA",
    action: "follow"
  });
  return dispatch => {
    let apiName = "superqso";
    let path = "/qra-follower";
    let myInit = {
      body: {
        qra: follower,
        datetime: new Date()
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    };
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0)
          dispatch(doReceiveFollowers(response.body.message));
        else console.log(response.body.message);
      })
      .catch(error => {
        Auth.currentSession()
          .then(session => {
            token = session.idToken.jwtToken;
            dispatch(refreshToken(token));
            dispatch(doFollowQRA(token, follower));
          })
          .catch(error => {
            if (process.env.NODE_ENV !== "production") {
              console.log(error);
            }
            Sentry.captureException(error);
            dispatch(doLogout());
          });
      });
  };
}

export function doUnfollowQRA(token, follower) {
  ReactGA.set({
    follower: follower
  });
  ReactGA.event({
    category: "QRA",
    action: "unfollow"
  });
  return dispatch => {
    let apiName = "superqso";
    let path = "/qra-follower";
    let myInit = {
      body: {
        qra: follower
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    };
    API.del(apiName, path, myInit)
      .then(response => {
        if (response.body.error > 0) console.error(response.body.message);
        else dispatch(doReceiveFollowers(response.body.message));
      })
      .catch(error => {
        Auth.currentSession()
          .then(session => {
            token = session.idToken.jwtToken;
            dispatch(refreshToken(token));
            dispatch(doUnfollowQRA(token, follower));
          })
          .catch(error => {
            if (process.env.NODE_ENV !== "production") {
              console.log(error);
            }
            Sentry.captureException(error);
            dispatch(doLogout());
          });
      });
  };
}

export function doRequestQRA() {
  return {
    type: REQUEST_QRA,
    FetchingQRA: true,
    QRAFetched: false
  };
}

export function doReceiveQRA(data) {
  let { monthly_qra_views, ...qraData } = data;
  return {
    type: RECEIVE_QRA,
    qra: qraData,
    FetchingQRA: false,
    monthly_qra_views: monthly_qra_views,
    QRAFetched: true
  };
}
export function clearQRA() {
  return {
    type: CLEAR_QRA
  };
}
export function clearQSO() {
  return {
    type: CLEAR_QSO
  };
}
export function doReceiveFollowers(following) {
  return {
    type: RECEIVE_FOLLOWERS,
    following: following
  };
}

export function doQsoMediaPlay(idMedia, token, idqso) {
  return dispatch => {
    let apiName = "superqso";
    let path = "/qso/media-play";
    let myInit = {
      body: {
        idmedia: idMedia,
        idqso: idqso
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    };
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error > 0) console.error(response.body.message);
        else dispatch(doReceiveMediaCounter(response.body.message));
      })
      .catch(error => {
        Auth.currentSession()
          .then(session => {
            token = session.idToken.jwtToken;
            dispatch(refreshToken(token));
            dispatch(doQsoMediaPlay(idMedia, token, idqso));
          })
          .catch(error => {
            if (process.env.NODE_ENV !== "production") {
              console.log(error);
            }
            Sentry.captureException(error);
            dispatch(doLogout());
          });
      });
  };
}

export function doReceiveMediaCounter(data) {
  return {
    type: RECEIVE_QSO_MEDIA_COUNTER,
    monthly_audio_play: data
  };
}

export function doQslCardPrint(idqso, token) {
  return dispatch => {
    let apiName = "superqso";
    let path = "/qso/qslcard-print";
    let myInit = {
      body: {
        idqso: idqso
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    };
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error > 0) console.error(response.body.message);
      })
      .catch(error => {
        Auth.currentSession()
          .then(session => {
            token = session.idToken.jwtToken;
            dispatch(refreshToken(token));
            dispatch(doQslCardPrint(token, idqso));
          })
          .catch(error => {
            if (process.env.NODE_ENV !== "production") {
              console.log(error);
            }
            Sentry.captureException(error);
            dispatch(doLogout());
          });
      });
  };
}
