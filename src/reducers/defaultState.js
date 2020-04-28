import { CLEAR_QRA, CLEAR_QSO, CLEAR_QSO_LINK, COMMENT_ADD, COMMENT_DELETE, DELETE_MEDIA, DELETE_QSO, FOLLOW_CLEAR, FOLLOW_RECEIVE, FOLLOW_REQUEST, LOGIN, LOGOUT, NOTIFICATION_READ, PREPARE_LOGIN, PUBLIC_SESSION, RECEIVE_FEED, RECEIVE_FOLLOWERS, RECEIVE_NOTIFICATIONS, RECEIVE_QRA, RECEIVE_QRA_ERROR, RECEIVE_QSO, RECEIVE_QSO_ERROR, RECEIVE_QSO_LINK, RECEIVE_QSO_MEDIA_COUNTER, RECEIVE_USERINFO, RECEIVE_USER_BIO, RECEIVE_USER_DATA_INFO, REFRESH_TOKEN, REPOST_QSO, REQUEST_FEED, REQUEST_QRA, REQUEST_QSO, REQUEST_USERINFO } from '../actions';

const initialState = {
  userData: {
    currentQRA: null,
    token: null,
    qra: {
      accountType: null,
      profilepic: null,
      avatarpic: null
    },
    identityId: null,
    authenticating: false,
    isAuthenticated: false,
    following: [],
    followers: [],
    notifications: [],

    fetchingUser: false,
    userFetched: false
  },
  qsos: [],
  FetchingQSOS: false,
  qsosFetched: false,
  qso: null,
  qso_link: null,
  FetchingQSO: false,
  QSOFetched: false,
  qsoError: null,
  qra: null,
  FetchingQRA: false,
  QRAFetched: false,
  qraError: null,
  followFetched: false,
  followFetching: false,
  follow: {}
};

// define a reducer with an initialized state action
function generalReducers(state = initialState, action) {
  let newStore;
  let userInfo;

  switch (action.type) {
    case NOTIFICATION_READ:
      userInfo = {
        ...state.userData,
        notifications: state.userData.notifications.filter(
          n => n.idqra_notifications !== action.idnotif
        )
      };
      newStore = Object.assign({}, state, {
        ...state,
        userData: userInfo
      });
      return newStore;
    case DELETE_QSO:
      newStore = Object.assign({}, state, {
        ...state,
        qsos: state.qsos.filter(qso => qso.idqsos !== action.idqso),
        qra: state.qra
          ? {
              ...state.qra,
              qsos: state.qra.qsos.filter(qso => {
                return qso.idqsos !== action.idqso;
              })
            }
          : state.qra
      });

      return newStore;
    case REPOST_QSO:
      newStore = Object.assign({}, state, {
        ...state,
        qsos: [action.qso, ...state.qsos],
        qra: state.qra
          ? {
              ...state.qra,
              qsos:
                state.qra &&
                state.userData.qra.idqras === action.qso.idqra_owner
                  ? [action.qso, ...state.qra.qsos]
                  : state.qra.qsos
            }
          : null
      });

      return newStore;
    case COMMENT_ADD:
      newStore = Object.assign({}, state, {
        ...state,
        qsos: state.qsos.map(qso => {
          if (qso.idqsos === action.idqso) {
            qso.comments = action.comments;
          }
          return qso;
        }),
        qso_link:
          state.qso_link && state.qso_link.idqsos === action.idqso
            ? { ...state.qso_link, comments: action.comments }
            : { ...state.qso_link },
        qra: state.qra
          ? {
              ...state.qra,
              qsos:
                state.qra && state.qra.qsos
                  ? state.qra.qsos.map(qso => {
                      if (qso.idqsos === action.idqso) {
                        qso.comments = action.comments;
                      }
                      return qso;
                    })
                  : []
            }
          : null,

        qso:
          state.qso && state.qso.idqsos
            ? {
                ...state.qso,
                comments: action.comments
              }
            : {}
      });

      return newStore;
    case COMMENT_DELETE:
      newStore = Object.assign({}, state, {
        ...state,
        qsos: state.qsos.map(qso => {
          if (qso.idqsos === action.idqso) {
            qso.comments = qso.comments.filter(
              comment => comment.idqsos_comments !== action.idcomment
            );
          }

          return qso;
        }),
        qso_link: {
          ...state.qso_link,
          comments: state.qso_link.comments
            ? state.qso_link.comments.filter(
                comment => comment.idqsos_comments !== action.idcomment
              )
            : []
        },
        qra: state.qra
          ? {
              ...state.qra,
              qsos:
                state.qra && state.qra.qsos
                  ? state.qra.qsos.map(qso => {
                      if (qso.idqsos === action.idqso) {
                        qso.comments = qso.comments.filter(
                          comment =>
                            comment.idqsos_comments !== action.idcomment
                        );
                      }
                      return qso;
                    })
                  : []
            }
          : null,
        qso:
          state.qso && state.qso.idqsos
            ? {
                ...state.qso,
                comments: state.qso.comments.filter(
                  comment => comment.idqsos_comments !== action.idcomment
                )
              }
            : {}
      });

      return newStore;

    case DELETE_MEDIA:
      newStore = Object.assign({}, state, {
        ...state,
        qsos: state.qsos.map(qso => {
          if (qso.idqsos === action.idqso) {
            qso.media = qso.media.filter(
              media => media.idqsos_media !== action.idmedia
            );
          }
          return qso;
        })
      });

      return newStore;
    case REQUEST_USERINFO:
      userInfo = {
        ...state.userData,
        fetchingUser: action.fetchingUser,
        userFetched: action.userFetched
      };
      newStore = Object.assign({}, state, {
        ...state,
        userData: userInfo
      });
      return newStore;

    case RECEIVE_USERINFO:
      userInfo = {
        ...state.userData,
        following: action.following,
        followers: action.followers,
        notifications: action.notifications,
        qra: action.qra,
        fetchingUser: action.fetchingUser,
        userFetched: action.userFetched
      };
      newStore = Object.assign({}, state, {
        ...state,
        userData: userInfo
      });
      return newStore;
    case RECEIVE_NOTIFICATIONS:
      userInfo = {
        ...state.userData,
        notifications: action.notifications
      };
      newStore = Object.assign({}, state, {
        ...state,
        userData: userInfo,
        qso: null
      });
      return newStore;
    case RECEIVE_FOLLOWERS:
      userInfo = {
        ...state.userData,
        following: action.following
      };
      newStore = Object.assign({}, state, {
        ...state,
        userData: userInfo,
        qra: state.qra
          ? {
              ...state.qra,
              following:
                state.qra.qra.idqras === state.userData.qra.idqras
                  ? action.following
                  : state.qra.following
            }
          : null
      });
      return newStore;
    case REQUEST_FEED:
      newStore = Object.assign({}, state, {
        ...state,
        FetchingQSOS: true,
        qsosFetched: false
      });
      return newStore;
    case RECEIVE_FEED:
      newStore = Object.assign({}, state, {
        ...state,
        qsos: action.qsos,
        FetchingQSOS: false,
        qsosFetched: true
      });
      return newStore;
    case REQUEST_QRA:
      newStore = Object.assign({}, state, {
        ...state,
        FetchingQRA: action.FetchingQRA,
        QRAFetched: action.QRAFetched,
        qraError: null
      });
      return newStore;
    case CLEAR_QRA:
      newStore = Object.assign({}, state, {
        ...state,
        qra: null,
        FetchingQRA: false,
        QRAFetched: false
      });
      return newStore;
    case FOLLOW_CLEAR:
      newStore = Object.assign({}, state, {
        ...state,
        follow: {}
      });
      return newStore;
    case FOLLOW_RECEIVE:
      newStore = Object.assign({}, state, {
        ...state,
        follow: action.follow,
        followFetched: true,
        followFetching: false
      });
      return newStore;
    case FOLLOW_REQUEST:
      newStore = Object.assign({}, state, {
        ...state,
        followFetching: true
      });
      return newStore;
    case RECEIVE_QRA:
      newStore = Object.assign({}, state, {
        ...state,
        qra: action.qra,
        FetchingQRA: action.FetchingQRA,
        QRAFetched: action.QRAFetched,
        userData: {
          ...state.userData,
          qra: {
            ...state.userData.qra,
            monthly_qra_views: action.monthly_qra_views
          }
        }
      });

      return newStore;
    case RECEIVE_QRA_ERROR:
      newStore = Object.assign({}, state, {
        ...state,

        FetchingQRA: false,
        QRAFetched: true,
        qraError: action.error
      });
      return newStore;
    case RECEIVE_USER_DATA_INFO: {
      const qra = {
        ...state.qra,
        qra: action.qra
      };
      newStore = Object.assign({}, state, {
        ...state,
        qra: qra
      });
      return newStore;
    }
    case RECEIVE_USER_BIO: {
      const qra = {
        ...state.qra,
        qra: action.qra
      };
      newStore = Object.assign({}, state, {
        ...state,
        qra: qra
      });
      return newStore;
    }
    case REQUEST_QSO:
      newStore = Object.assign({}, state, {
        ...state,
        qso: null,
        FetchingQSO: true,
        QSOFetched: false
      });
      return newStore;
    case CLEAR_QSO:
      newStore = Object.assign({}, state, {
        ...state,
        qso: null,
        FetchingQSO: false,
        QSOFetched: false
      });
      return newStore;
    case CLEAR_QSO_LINK:
      newStore = Object.assign({}, state, {
        ...state,
        qso_link: null,
        FetchingQSO: true,
        QSOFetched: false
      });
      return newStore;
    case RECEIVE_QSO:
      newStore = Object.assign({}, state, {
        ...state,
        qso: action.qso,
        FetchingQSO: false,
        QSOFetched: true,

        userData: {
          ...state.userData,
          qra: {
            ...state.userData.qra,
            monthly_qso_views: action.monthly_qso_views
          }
        }
      });
      return newStore;
    case RECEIVE_QSO_ERROR:
      newStore = Object.assign({}, state, {
        ...state,

        FetchingQSO: false,
        QSOFetched: true,
        qsoError: action.error
      });
      return newStore;
    case RECEIVE_QSO_MEDIA_COUNTER:
      newStore = Object.assign({}, state, {
        ...state,
        userData: {
          ...state.userData,
          qra: {
            ...state.userData.qra,
            monthly_audio_play: action.monthly_audio_play
          }
        }
      });
      return newStore;
    case RECEIVE_QSO_LINK:
      newStore = Object.assign({}, state, {
        ...state,
        qso_link: action.qso_link,
        FetchingQSO: true
      });
      return newStore;

    case PUBLIC_SESSION: {
      const publicSessionUserData = {
        ...state.userData,
        token: null,
        authenticating: false,
        isAuthenticated: false,
        qra: {
          accountType: null,
          profilepic: null,
          avatarpic: null
        },
        identityId: null,
        public: true
      };
      newStore = Object.assign({}, state, {
        ...state,
        userData: publicSessionUserData,
        FetchingQSO: false,
        qsos: [],
        qsosFetched: false,
        FetchingQRA: false,
        QRAFetched: false
      });

      return newStore;
    }
    case LOGIN: {
      const logInUserData = {
        ...state.userData,
        token: action.token,
        authenticating: false,
        isAuthenticated: true,
        currentQRA: action.qra,
        identityId: action.identityId,
        public: false
      };
      newStore = Object.assign({}, state, {
        ...state,
        userData: logInUserData,
        FetchingQSO: false,
        qsos: [],
        qsosFetched: false,
        FetchingQRA: false,
        QRAFetched: false,
        follow: {}
      });

      return newStore;
    }
    case REFRESH_TOKEN: {
      const tokenData = {
        ...state.userData,
        token: action.token
      };
      newStore = Object.assign({}, state, {
        ...state,
        userData: tokenData
      });

      return newStore;
    }
    case PREPARE_LOGIN: {
      const preparelogInUserData = {
        ...state.userData,
        token: null,
        authenticating: true,
        isAuthenticated: false,
        qra: {
          accountType: null,
          profilepic: null,
          avatarpic: null
        },
        currentQRA: null,
        identityId: null,
        public: false
      };
      newStore = Object.assign({}, state, {
        ...state,
        userData: preparelogInUserData,
        FetchingQSO: false,
        qsos: [],
        qsosFetched: false,
        FetchingQRA: false,
        QRAFetched: false,
        follow: {},
        followFetching: false,
        followFetched: false
      });

      return newStore;
    }
    case LOGOUT: {
      const logoutUserData = {
        ...state.userData,
        token: '',
        qra: {
          accountType: null,
          profilepic: null,
          avatarpic: null
        },
        currentQRA: null,
        identityId: null,
        isAuthenticated: false,
        public: true
      };
      newStore = Object.assign({}, state, {
        ...state,
        userData: logoutUserData,
        qsos: [],
        FetchingQSO: false,
        qsosFetched: false,
        FetchingQRA: false,
        QRAFetched: false,
        follow: {},
        followFetching: false,
        followFetched: false
      });

      return newStore;
    }
    default:
      return state;
  }
}
// const rootReducer = combineReducers({ authReducers, generalReducers });

export default generalReducers;
