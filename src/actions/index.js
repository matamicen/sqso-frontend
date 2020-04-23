import API from '@aws-amplify/api'
import Auth from '@aws-amplify/auth'
import * as Sentry from '@sentry/browser'
import ReactGA from 'react-ga'
export const PUBLIC_SESSION = 'PUBLIC_SESSION'
export const PREPARE_LOGIN = 'PREPARE_LOGIN'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const REQUEST_FEED = 'REQUEST_FEED'
export const RECEIVE_FEED = 'RECEIVE_FEED'
export const REPOST_QSO = 'REPOST_QSO'
export const REQUEST_USERINFO = 'REQUEST_USERINFO'
export const RECEIVE_USERINFO = 'RECEIVE_USERINFO'
export const RECEIVE_USER_BIO = 'RECEIVE_USER_BIO'
export const RECEIVE_USER_DATA_INFO = 'RECEIVE_USER_DATA_INFO'
export const REQUEST_QSO = 'REQUEST_QSO'
export const RECEIVE_QSO = 'RECEIVE_QSO'
export const RECEIVE_QSO_ERROR = 'RECEIVE_QSO_ERROR'
export const RECEIVE_QSO_LINK = 'RECEIVE_QSO_LINK'
export const CLEAR_QSO = 'CLEAR_QSO'
export const CLEAR_QSO_LINK = 'CLEAR_QSO_LINK'
export const REQUEST_QRA = 'REQUEST_QRA'
export const RECEIVE_QRA = 'RECEIVE_QRA'
export const RECEIVE_QRA_ERROR = 'RECEIVE_QRA_ERROR'
export const CLEAR_QRA = 'CLEAR_QRA'
export const RECEIVE_FOLLOWERS = 'RECEIVE_FOLLOWERS'
export const RECEIVE_QSO_MEDIA_COUNTER = 'RECEIVE_QSO_MEDIA_COUNTER'
export const DELETE_MEDIA = 'DELETE_MEDIA'
export const DELETE_QSO = 'DELETE_QSO'
export const COMMENT_DELETE = 'COMMENT_DELETE'
export const COMMENT_ADD = 'COMMENT_ADD'
export const NOTIFICATION_READ = 'NOTIFICATION_READ'
export const RECEIVE_NOTIFICATIONS = 'RECEIVE_NOTIFICATIONS'
export const FOLLOW_CLEAR = 'FOLLOW_CLEAR'
export const FOLLOW_FETCH = 'FOLLOW_FETCH'
export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_RECEIVE = 'FOLLOW_RECEIVE'

export function doNotificationRead (idnotif = null, token) {
  return dispatch => {
    const apiName = 'superqso'
    const path = '/qra-notification/set-read'
    const myInit = {
      body: {
        idqra_notifications: idnotif
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    }
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0) { dispatch(doNotificationReadResponse(idnotif)) } else console.log(response.body.message)
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Auth.currentSession()
            .then(session => {
              token = session.idToken.jwtToken
              dispatch(refreshToken(token))
              dispatch(doNotificationRead(idnotif, token))
            })
            .catch(error => {
              if (process.env.NODE_ENV !== 'production') {
                console.log(error)
              } else Sentry.captureException(error)
              dispatch(doLogout())
            })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error.message)
          } else Sentry.captureException(error)
        }
      })
  }
}
export function doCommentDelete (idcomment, idqso, token) {
  return dispatch => {
    const apiName = 'superqso'
    const path = '/qso-comment'
    const myInit = {
      body: {
        idcomment: idcomment,
        qso: idqso
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    }
    API.del(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0) { dispatch(doCommentDeleteResponse(idcomment, idqso)) } else console.log(response.body.message)
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Auth.currentSession()
            .then(session => {
              token = session.idToken.jwtToken
              dispatch(refreshToken(token))
              dispatch(doCommentDelete(idcomment, idqso, token))
            })
            .catch(error => {
              if (process.env.NODE_ENV !== 'production') {
                console.log(error)
              } else Sentry.captureException(error)
              dispatch(doLogout())
            })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error.message)
          } else Sentry.captureException(error)
        }
      })
  }
}
export function doCommentAdd (idqso, comment, token) {
  return dispatch => {
    const apiName = 'superqso'
    const path = '/qso-comment'
    const myInit = {
      body: {
        qso: idqso,
        comment: comment.comment,
        datetime: comment.datetime
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    }
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0) { dispatch(doCommentAddResponse(idqso, response.body.message)) } else console.log(response.body.message)
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Auth.currentSession()
            .then(session => {
              token = session.idToken.jwtToken
              dispatch(refreshToken(token))
              dispatch(doCommentAdd(idqso, comment, token))
            })
            .catch(error => {
              if (process.env.NODE_ENV !== 'production') {
                console.log(error)
              } else Sentry.captureException(error)
              dispatch(doLogout())
            })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error.message)
          } else Sentry.captureException(error)
        }
      })
  }
}
export function doCommentAddResponse (idqso = null, comments = []) {
  ReactGA.event({
    category: 'QSO',
    action: 'CommentAdd'
  })
  return {
    type: COMMENT_ADD,
    idqso: idqso,
    comments: comments
  }
}
export function refreshToken (token) {
  return {
    type: REFRESH_TOKEN,
    token: token
  }
}
export function doCommentDeleteResponse (idcomment = null, idqso = null) {
  ReactGA.event({
    category: 'QSO',
    action: 'CommentDelete'
  })
  return {
    type: COMMENT_DELETE,
    idcomment: idcomment,
    idqso: idqso
  }
}
export function doNotificationReadResponse (idnotif) {
  ReactGA.event({
    category: 'QRA',
    action: 'CommentRead'
  })
  return {
    type: NOTIFICATION_READ,
    idnotif: idnotif
  }
}
export function doDeleteQso (idqso, token) {
  return dispatch => {
    const apiName = 'superqso'
    const path = '/qsonew'
    const myInit = {
      body: {
        qso: idqso
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    }
    API.del(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0) dispatch(doDeleteQsoResponse(idqso))
        else console.log(response.body.message)
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Auth.currentSession()
            .then(session => {
              token = session.idToken.jwtToken
              dispatch(refreshToken(token))
              dispatch(doDeleteQso(idqso, token))
            })
            .catch(error => {
              if (process.env.NODE_ENV !== 'production') {
                console.log(error)
              } else Sentry.captureException(error)
              dispatch(doLogout())
            })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error.message)
          } else Sentry.captureException(error)
        }
      })
  }
}

export function doDeleteQsoResponse (idqso = null) {
  ReactGA.event({
    category: 'QSO',
    action: 'Delete'
  })
  return {
    type: DELETE_QSO,
    idqso: idqso
  }
}

export function doDeleteMedia (idmedia, idqso, token) {
  return dispatch => {
    const apiName = 'superqso'
    const path = '/qsomediaadd'
    const myInit = {
      body: {
        idmedia: idmedia,
        qso: idqso
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    }
    API.del(apiName, path, myInit)
      .then(response => {
        // console.log(response)
        if (response.body.error === 0) { dispatch(doDeleteMediaResponse(idmedia, idqso)) } else console.log(response.body.message)
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Auth.currentSession()
            .then(session => {
              token = session.idToken.jwtToken
              dispatch(refreshToken(token))
              dispatch(doDeleteMedia(idmedia, idqso, token))
            })
            .catch(error => {
              if (process.env.NODE_ENV !== 'production') {
                console.log(error)
              } else Sentry.captureException(error)
              dispatch(doLogout())
            })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error.message)
          } else Sentry.captureException(error)
        }
      })
  }
}
export function doDeleteMediaResponse (idmedia = null, idqso = null) {
  ReactGA.event({
    category: 'QSO',
    action: 'MediaDelete'
  })
  return {
    type: DELETE_MEDIA,
    idmedia: idmedia,
    idqso: idqso
  }
}
export function doRequestUserInfo () {
  return {
    type: REQUEST_USERINFO,
    fetchingUser: true,
    userFetched: false
  }
}

export function doReceiveUserInfo (
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
  }
}
export function doStartingLogin () {
  return {
    type: PREPARE_LOGIN
  }
}
export function doSetPublicSession () {
  return {
    type: PUBLIC_SESSION
  }
}
export function doLogin (token, qra, identityId) {
  window.gtag('config', 'G-H8G28LYKBY', {
    custom_map: { dimension1: 'userQRA' }
  })
  window.gtag('event', 'userLogin', {
    event_category: 'User',
    event_label: 'Login',
    userQRA: qra
  })

  return {
    type: LOGIN,
    token: token,
    qra: qra,
    identityId: identityId
  }
}

export function doLogout () {
  ReactGA.event({
    category: 'User',
    action: 'Logout'
  })
  return {
    type: LOGOUT
  }
}
export function doFollowRequest () {
  return {
    type: FOLLOW_REQUEST
  }
}
export function doRequestFeed () {
  return {
    type: REQUEST_FEED,
    FetchingQSOS: true,
    qsosFetched: false
  }
}
export function doFollowReceive (follow) {
  return {
    type: FOLLOW_RECEIVE,
    follow: follow
  }
}
export function doReceiveNotifications (notifications) {
  return {
    type: RECEIVE_NOTIFICATIONS,
    notifications: notifications
  }
}
export function doReceiveFeed (qsos) {
  return {
    type: RECEIVE_FEED,
    qsos: qsos,
    FetchingQSOS: false,
    qsosFetched: true
  }
}
export function doFetchUserInfo (token) {
  return dispatch => {
    dispatch(doRequestUserInfo())
    const apiName = 'superqso'
    const path = '/user-info'
    const myInit = {
      body: {}, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    }
    API.get(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0) {
          dispatch(
            doReceiveUserInfo(
              response.body.message.followers,
              response.body.message.following,
              response.body.message.qra,
              response.body.message.notifications
            )
          )
        } else console.log(response.body.message)
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Auth.currentSession()
            .then(session => {
              token = session.idToken.jwtToken
              dispatch(refreshToken(token))
              dispatch(doFetchUserInfo(token))
            })
            .catch(error => {
              if (process.env.NODE_ENV !== 'production') {
                console.log(error)
              } else Sentry.captureException(error)
              dispatch(doLogout())
            })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error.message)
          } else Sentry.captureException(error)
        }
      })
  }
}
export function doRepost (idqso, token, qso) {
  return dispatch => {
    dispatch(doRequestUserInfo())
    const apiName = 'superqso'
    const path = '/qso-share'
    var datetime = new Date()
    const myInit = {
      body: {
        qso: idqso,
        datetime: datetime,
        type: 'SHARE'
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    }
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error !== 0) console.log(response.body.message)
        else dispatch(doAddRepostToFeed(qso))
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Auth.currentSession()
            .then(session => {
              token = session.idToken.jwtToken
              dispatch(refreshToken(token))
              doRepost(idqso, token, qso)
            })
            .catch(error => {
              if (process.env.NODE_ENV !== 'production') {
                console.log(error)
              } else Sentry.captureException(error)
              dispatch(doLogout())
            })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error.message)
          } else Sentry.captureException(error)
        }
      })
  }
}
export function doAddRepostToFeed (qso) {
  return {
    type: REPOST_QSO,
    qso: qso
  }
}
export function doSaveUserInfo (token, qra) {
  return dispatch => {
    dispatch(doRequestUserInfo())
    const apiName = 'superqso'
    const path = '/qra-info/info'
    const myInit = {
      body: {
        qra: qra
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    }
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error !== 0) console.log(response.body.message)
        else dispatch(doReceiveUserDataInfo(response.body.message))
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Auth.currentSession()
            .then(session => {
              token = session.idToken.jwtToken
              dispatch(refreshToken(token))
              dispatch(doSaveUserInfo(token, qra))
            })
            .catch(error => {
              if (process.env.NODE_ENV !== 'production') {
                console.log(error)
              } else Sentry.captureException(error)
              dispatch(doLogout())
            })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error.message)
          } else Sentry.captureException(error)
        }
      })
  }
}
export function doReceiveUserDataInfo (qra) {
  return {
    type: RECEIVE_USER_DATA_INFO,
    qra: qra
  }
}
export function doSaveUserBio (token, bio, identityId) {
  return dispatch => {
    const apiName = 'superqso'
    const path = '/qra-info/bio'
    const myInit = {
      body: {
        bio: bio,
        identityId: identityId
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    }

    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error !== 0) console.log(response.body.message)
        else dispatch(doReceiveUserBio(response.body.message))
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Auth.currentSession()
            .then(session => {
              token = session.idToken.jwtToken
              dispatch(refreshToken(token))
              dispatch(doSaveUserBio(token, bio, identityId))
            })
            .catch(error => {
              if (process.env.NODE_ENV !== 'production') {
                console.log(error)
              } else Sentry.captureException(error)
              dispatch(doLogout())
            })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error.message)
          } else Sentry.captureException(error)
        }
      })
  }
}

export function doReceiveUserBio (qra) {
  return {
    type: RECEIVE_USER_BIO,
    qra: qra
  }
}
export function doFetchUserFeed (token) {
  return dispatch => {
    dispatch(doRequestFeed())
    const apiName = 'superqso'
    const path = '/qso-get-user-feed'
    const myInit = {
      body: {}, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    }
    API.get(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0) { dispatch(doReceiveFeed(response.body.message)) } else console.log(response.body.message)
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Auth.currentSession()
            .then(session => {
              token = session.idToken.jwtToken
              dispatch(refreshToken(token))
              dispatch(doFetchUserFeed(token))
            })
            .catch(error => {
              if (process.env.NODE_ENV !== 'production') {
                console.log(error)
              } else Sentry.captureException(error)
              dispatch(doLogout())
            })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error.message)
          } else Sentry.captureException(error)
        }
      })
  }
}
export function doFollowFetch (token) {
  return dispatch => {
    dispatch(doFollowRequest())
    const apiName = 'superqso'
    const path = '/qra/getRecFollowers'
    const myInit = {
      body: {}, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    }
    API.get(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0) { dispatch(doFollowReceive(response.body.message)) } else console.log(response.body.message)
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Auth.currentSession()
            .then(session => {
              token = session.idToken.jwtToken
              dispatch(refreshToken(token))
            // dispatch(doFollowFetch(token)); #
            })
            .catch(error => {
              if (process.env.NODE_ENV !== 'production') {
                console.log(error)
              } else Sentry.captureException(error)
              dispatch(doLogout())
            })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error.message)
          } else Sentry.captureException(error)
        }
      })
  }
}
export function doFetchNotifications (token) {
  return dispatch => {
    dispatch(doRequestFeed())
    const apiName = 'superqso'
    const path = '/qra-notification'
    const myInit = {
      body: {}, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    }
    API.get(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0) { dispatch(doReceiveNotifications(response.body.message)) } else console.log(response.body.message)
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Auth.currentSession()
            .then(session => {
              console.log(session)
              token = session.idToken.jwtToken
              dispatch(refreshToken(token))
              dispatch(doFetchNotifications(token))
            })
            .catch(error => {
              if (process.env.NODE_ENV !== 'production') {
                console.log(error)
              } else Sentry.captureException(error)
              dispatch(doLogout())
            })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error.message)
          } else Sentry.captureException(error)
        }
      })
  }
}

export function doFetchPublicFeed () {
  // console.log("doFetchPublicFeed");
  return dispatch => {
    dispatch(doRequestFeed())
    const apiName = 'superqso'
    const path = '/qso-public-list'
    const myInit = {
      body: {}, // replace this with attributes you need
      headers: {} // OPTIONAL
    }
    API.get(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0) { dispatch(doReceiveFeed(response.body.message)) } else console.log(response.body.message)
      })
      .catch(error => {
        if (process.env.NODE_ENV !== 'production') {
          console.log(error)
        } else Sentry.captureException(error)
      })
  }
}

export function doRequestQSO () {
  return {
    type: REQUEST_QSO
  }
}

export function doReceiveQSO (data, error) {
  // eslint-disable-next-line camelcase
  const { monthly_qso_views, ...qsoData } = data
  if (error === 0) {
    return {
      type: RECEIVE_QSO,
      qso: qsoData,
      monthly_qso_views: monthly_qso_views
    }
  } else {
    return {
      type: RECEIVE_QSO_ERROR,
      error: data
    }
  }
}
export function doReceiveQsoLink (qso) {
  return {
    type: RECEIVE_QSO_LINK,
    qso_link: qso,
    FetchingQSO: false
  }
}
export function doClearQsoLink () {
  return {
    type: CLEAR_QSO_LINK,
    qso_link: '',
    FetchingQSO: false
  }
}
export function doFetchQSO (idqso, token = null) {
  window.gtag('config', 'G-H8G28LYKBY', {
    custom_map: { dimension2: 'qso' }
  })
  window.gtag('event', 'qsoGetInfo', {
    event_category: 'QSO',
    event_label: 'Login',
    qso: idqso
  })

  if (token) {
    return dispatch => {
      const apiName = 'superqso'
      const path = '/qso-detail/secured'
      const myInit = {
        body: {
          guid: idqso
        }, // replace this with attributes you need
        headers: {
          Authorization: token
        } // OPTIONAL
      }
      API.post(apiName, path, myInit)
        .then(response => {
          dispatch(doReceiveQSO(response.body.message, response.body.error))
        })
        .catch(error => {
          if (error.message === 'Request failed with status code 401') {
            Auth.currentSession()
              .then(session => {
                token = session.idToken.jwtToken
                dispatch(refreshToken(token))
                dispatch(doFetchQSO(idqso, token))
              })
              .catch(error => {
                if (process.env.NODE_ENV !== 'production') {
                  console.log(error)
                } else Sentry.captureException(error)
                dispatch(doLogout())
              })
          } else {
            if (process.env.NODE_ENV !== 'production') {
              console.log(error.message)
            } else Sentry.captureException(error)
          }
        })
    }
  } else {
    return dispatch => {
      const apiName = 'superqso'
      const path = '/qso-detail'
      const myInit = {
        body: {
          guid: idqso
        }, // replace this with attributes you need
        headers: {
          'Content-Type': 'application/json'
        } // OPTIONAL
      }
      API.post(apiName, path, myInit)
        .then(response => {
          dispatch(doReceiveQSO(response.body.message, response.body.error))
        })
        .catch(error => {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error)
          } else Sentry.captureException(error)
        })
    }
  }
}
export function doFetchQsoLink (idqso) {
  window.gtag('config', 'G-H8G28LYKBY', {
    custom_map: { dimension2: 'qsoLink' }
  })
  window.gtag('event', 'qsoGetInfo', {
    event_category: 'QSO',

    qsoLink: idqso
  })

  return dispatch => {
    const apiName = 'superqso'
    const path = '/qso-detail'
    const myInit = {
      body: {
        guid: idqso
      }, // replace this with attributes you need
      headers: {
        'Content-Type': 'application/json'
      } // OPTIONAL
    }
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0) { dispatch(doReceiveQsoLink(response.body.message)) } else console.log(response.body.message)
      })
      .catch(error => {
        if (process.env.NODE_ENV !== 'production') {
          console.log(error)
        } else Sentry.captureException(error)
      })
  }
}

export function doFetchQRA (qra, token = null) {
  window.gtag('config', 'G-H8G28LYKBY', {
    custom_map: { dimension3: 'qra' }
  })
  window.gtag('event', 'qraGetInfo', {
    event_category: 'QRA',
    event_label: 'Login'
  })

  if (token) {
    return dispatch => {
      const apiName = 'superqso'
      const path = '/qra-info/secured'
      const myInit = {
        body: {
          qra: qra
        }, // replace this with attributes you need
        headers: {
          Authorization: token
        } // PTIONAL
      }
      dispatch(doRequestQRA())
      API.post(apiName, path, myInit)
        .then(response =>
          dispatch(doReceiveQRA(response.body.message, response.body.error))
        )
        .catch(error => {
          if (error.message === 'Request failed with status code 401') {
            Auth.currentSession()
              .then(session => {
                token = session.idToken.jwtToken
                dispatch(refreshToken(token))
                dispatch(doFetchQRA(qra, token))
              })
              .catch(error => {
                if (process.env.NODE_ENV !== 'production') {
                  console.log(error)
                } else Sentry.captureException(error)
                dispatch(doLogout())
              })
          } else {
            if (process.env.NODE_ENV !== 'production') {
              console.log(error.message)
            } else Sentry.captureException(error)
          }
        })
    }
  } else {
    return dispatch => {
      const apiName = 'superqso'
      const path = '/qra-info'
      const myInit = {
        body: {
          qra: qra
        }, // replace this with attributes you need
        headers: {
          // "Authorization": token
        } // PTIONAL
      }
      dispatch(doRequestQRA())
      API.post(apiName, path, myInit)
        .then(response => {
          dispatch(doReceiveQRA(response.body.message, response.body.error))
        })
        .catch(error => {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error)
          } else Sentry.captureException(error)
        })
    }
  }
}

export function doFollowQRA (token, follower) {
  window.gtag('event', 'qraFollow', {
    event_category: 'QRA'
  })

  return dispatch => {
    const apiName = 'superqso'
    const path = '/qra-follower'
    const myInit = {
      body: {
        qra: follower,
        datetime: new Date()
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    }
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error === 0) { dispatch(doReceiveFollowers(response.body.message)) } else if (process.env.NODE_ENV !== 'production') { console.log(response.body.message) }
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Auth.currentSession()
            .then(session => {
              token = session.idToken.jwtToken
              dispatch(refreshToken(token))
              dispatch(doFollowQRA(token, follower))
            })
            .catch(error => {
              if (process.env.NODE_ENV !== 'production') {
                console.log(error)
              } else Sentry.captureException(error)
              dispatch(doLogout())
            })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error.message)
          } else Sentry.captureException(error)
        }
      })
  }
}

export function doUnfollowQRA (token, follower) {
  window.gtag('event', 'qraUnfollow', {
    event_category: 'QRA'
  })

  return dispatch => {
    const apiName = 'superqso'
    const path = '/qra-follower'
    const myInit = {
      body: {
        qra: follower
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    }
    API.del(apiName, path, myInit)
      .then(response => {
        if (response.body.error > 0) console.error(response.body.message)
        else dispatch(doReceiveFollowers(response.body.message))
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Auth.currentSession()
            .then(session => {
              token = session.idToken.jwtToken
              dispatch(refreshToken(token))
              dispatch(doUnfollowQRA(token, follower))
            })
            .catch(error => {
              if (process.env.NODE_ENV !== 'production') {
                console.log(error)
              } else Sentry.captureException(error)
              dispatch(doLogout())
            })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error.message)
          } else Sentry.captureException(error)
        }
      })
  }
}

export function doRequestQRA () {
  return {
    type: REQUEST_QRA,
    FetchingQRA: true,
    QRAFetched: false
  }
}

export function doReceiveQRA (data, error) {
  const { monthly_qra_views, ...qraData } = data
  if (error === 0 && qraData.qra.disabled === 0) {
    return {
      type: RECEIVE_QRA,
      qra: qraData,
      FetchingQRA: false,
      monthly_qra_views: monthly_qra_views,
      QRAFetched: true
    }
  } else {
    if (error === 1) {
      return {
        type: RECEIVE_QRA_ERROR,
        error: data
      }
    } else {
      return {
        type: RECEIVE_QRA_ERROR,
        error: 'QRA is disabled temporarily'
      }
    }
  }
}
export function clearQRA () {
  return {
    type: CLEAR_QRA
  }
}
export function followClear () {
  return {
    type: FOLLOW_CLEAR
  }
}
export function clearQSO () {
  return {
    type: CLEAR_QSO
  }
}
export function doReceiveFollowers (following) {
  return {
    type: RECEIVE_FOLLOWERS,
    following: following
  }
}

export function doQsoMediaPlay (idMedia, token, idqso) {
  return dispatch => {
    const apiName = 'superqso'
    const path = '/qso/media-play'
    const myInit = {
      body: {
        idmedia: idMedia,
        idqso: idqso
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    }
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error > 0) console.error(response.body.message)
        else dispatch(doReceiveMediaCounter(response.body.message))
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Auth.currentSession()
            .then(session => {
              token = session.idToken.jwtToken
              dispatch(refreshToken(token))
              dispatch(doQsoMediaPlay(idMedia, token, idqso))
            })
            .catch(error => {
              if (process.env.NODE_ENV !== 'production') {
                console.log(error)
              } else Sentry.captureException(error)
              dispatch(doLogout())
            })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error.message)
          } else Sentry.captureException(error)
        }
      })
  }
}

export function doReceiveMediaCounter (data) {
  return {
    type: RECEIVE_QSO_MEDIA_COUNTER,
    monthly_audio_play: data
  }
}

export function doQslCardPrint (idqso, token) {
  return dispatch => {
    const apiName = 'superqso'
    const path = '/qso/qslcard-print'
    const myInit = {
      body: {
        idqso: idqso
      }, // replace this with attributes you need
      headers: {
        Authorization: token
      } // OPTIONAL
    }
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error > 0) console.error(response.body.message)
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Auth.currentSession()
            .then(session => {
              token = session.idToken.jwtToken
              dispatch(refreshToken(token))
              dispatch(doQslCardPrint(token, idqso))
            })
            .catch(error => {
              if (process.env.NODE_ENV !== 'production') {
                console.log(error)
              } else Sentry.captureException(error)
              dispatch(doLogout())
            })
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(error.message)
          } else Sentry.captureException(error)
        }
      })
  }
}
