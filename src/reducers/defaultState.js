import {
    DELETE_MEDIA,
    DELETE_QSO,
    PREPARE_LOGIN,
    LOGIN,
    LOGOUT,
    RECEIVE_FEED,
    RECEIVE_FOLLOWERS,
    RECEIVE_QRA,
    RECEIVE_QSO,
    RECEIVE_QSO_LINK,
    RECEIVE_USERINFO,
    REQUEST_FEED,
    REQUEST_QRA,
    CLEAR_QRA,
    REQUEST_QSO,
    REQUEST_USERINFO,
    DELETE_COMMENT,
    CLEAR_QSO,
    CLEAR_QSO_LINK,
    NOTIFICATION_READ,
    RECEIVE_NOTIFICATIONS,
    PUBLIC_SESSION,
    RECEIVE_USER_BIO,
    RECEIVE_USER_DATA_INFO
} from "../actions/Actions"

const initialState = {
    userData: {
        token: null,
        qra: null,
        identityId: null,
        authenticating: false,
        isAuthenticated: false,
        following: [],
        followers: [],
        notifications: [],
        profilepic: null,
        avatarpic: null,
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
    qra: null,
    FetchingQRA: false,
    QRAFetched: false

};

//define a reducer with an initialized state action
export default (state = initialState, action) => {
    let newStore;
    let userInfo;
    switch (action.type) {
        case NOTIFICATION_READ:
            userInfo = {
                ...state.userData,
                notifications: state
                    .userData
                    .notifications
                    .filter((n) => n.idqra_notifications !== action.idnotif)
            }
            newStore = Object.assign({}, state, {
                ...state,
                userData: userInfo

            });
            return newStore;
        case DELETE_QSO:
            console.log(action);
            newStore = Object.assign({}, state, {
                ...state,
                qsos: state
                    .qsos
                    .filter((qso) => qso.idqsos !== action.idqso)

            });
            return newStore;
        case DELETE_COMMENT:

            newStore = Object.assign({}, state, {
                ...state,
                qsos: state
                    .qsos
                    .map((qso) => {
                        if (qso.idqsos === action.idqso) {

                            qso.comments = qso
                                .comments
                                .filter((comment) => comment.idqsos_comments !== action.idcomment)
                        }
                        return qso
                    })

            });

            return newStore;
        case DELETE_MEDIA:
            newStore = Object.assign({}, state, {
                ...state,
                qsos: state
                    .qsos
                    .map((qso) => {

                        if (qso.idqsos === action.idqso) {
                            qso.media = qso
                                .media
                                .filter((media) => media.idqsos_media !== action.idmedia)
                        }
                        return qso
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
                profilepic: action.profilepic,
                avatarpic: action.avatarpic,
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
                userData: userInfo
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
                QRAFetched: action.QRAFetched
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
        case RECEIVE_QRA:
            newStore = Object.assign({}, state, {
                ...state,
                qra: action.qra,
                FetchingQRA: action.FetchingQRA,
                QRAFetched: action.QRAFetched
            });
            return newStore;
        case RECEIVE_USER_DATA_INFO:
            let qra = {
                ...state.qra,
                qra: action.qra
            }
            newStore = Object.assign({}, state, {
                ...state,
                qra: qra
            });
            return newStore;
        case RECEIVE_USER_BIO:
            qra = {
                ...state.qra,
                qra: action.qra
            }
            newStore = Object.assign({}, state, {
                ...state,
                qra: qra
            });
            return newStore;

        case REQUEST_QSO:
            newStore = Object.assign({}, state, {
                ...state,
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
                QSOFetched: true
            });
            return newStore;
        case RECEIVE_QSO_LINK:

            newStore = Object.assign({}, state, {
                ...state,
                qso_link: action.qso_link,
                FetchingQSO: true
            });
            return newStore;
        case PREPARE_LOGIN:
            let preparelogInUserData = {
                ...state.userData,
                token: null,
                authenticating: true,
                isAuthenticated: false,
                qra: null,
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
                QRAFetched: false
            });

            return newStore;
        case PUBLIC_SESSION:
            let publicSessionUserData = {
                ...state.userData,
                token: null,
                authenticating: false,
                isAuthenticated: false,
                qra: null,
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
        case LOGIN:
            let logInUserData = {
                ...state.userData,
                token: action.token,
                authenticating: false,
                isAuthenticated: true,
                qra: action.qra,
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
                QRAFetched: false
            });

            return newStore;
        case LOGOUT:

            let logoutUserData = {
                ...state.userData,
                token: "",
                qra: null,
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
                QRAFetched: false
            });

            return newStore;
        default:
            return state;
    }

};