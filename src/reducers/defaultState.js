import {
    LOGIN,
    LOGOUT,
    RECEIVE_FEED,
    RECEIVE_FOLLOWERS,
    RECEIVE_QRA,
    RECEIVE_QSO,
    RECEIVE_USERINFO,
    REQUEST_FEED,
    REQUEST_QRA,
    REQUEST_QSO,
    REQUEST_USERINFO
} from "../actions/Actions"

const initialState = {
    userData: {
        token: "test",
        qra: "test",
        isAuthenticated: false,
        following: [],
        followers: [],
        profilepic: null,
        fetchingUser: false,
        userFetched: false

    },
    qsos: [],
    FetchingQSOS: false,
    qsosFetched: false,
    qso: null,
    FetchingQSO: false,
    qra: null,
    FetchingQRA: false,
    QRAFetched: false

};

//define a reducer with an initialized state action
export default function defaultState(state = initialState, action) {
    let newStore;
    let userInfo;
      switch (action.type) {
        case REQUEST_USERINFO:
            userInfo = {
                ...state.userData,
                fetchingUser: action.fetchingUser,
                userFetched: action.userFetched
            };
            newStore = Object.assign({}, state,
                {
                    ...state,
                    userData: userInfo
                });
            return newStore;
        case RECEIVE_USERINFO:
            userInfo = {
                ...state.userData,
                following: action.following,
                followers: action.followers,
                profilepic: action.profilepic,
                fetchingUser: action.fetchingUser,
                userFetched: action.userFetched
            };
            newStore = Object.assign({}, state,
                {
                    ...state,
                    userData: userInfo
                });
            return newStore;
          case RECEIVE_FOLLOWERS:
              console.log("RECEIVE_FOLLOWERS");
              userInfo = {
                  ...state.userData,
                  following: action.following
              };
              newStore = Object.assign({}, state,
                  {
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
        case RECEIVE_QRA:
            newStore = Object.assign({}, state, {
                ...state,
                qra: action.qra,
                FetchingQRA: action.FetchingQRA,
                QRAFetched: action.QRAFetched
            });
            return newStore;
        case REQUEST_QSO:
            newStore = Object.assign({}, state, {
                ...state,
                FetchingQSO: true
            });
            return newStore;
        case RECEIVE_QSO:
            newStore = Object.assign({}, state, {
                ...state,
                qso: action.qso,
                FetchingQSO: true
            });
            return newStore;
        case LOGIN:
            let logInUserData = {
                ...state.userData,
                token: action.token,
                isAuthenticated: true,
                qra: action.qra

            };
            newStore = Object.assign({}, state,
                {
                    ...state,
                    userData: logInUserData,
                    FetchingQSO: false,
                    qsosFetched: false,
                    FetchingQRA: false,
                    QRAFetched: false
                });

            return newStore;
        case LOGOUT:
            let logoutUserData = {
                ...state.userData,
                token: "",
                isAuthenticated: false
            };
            newStore = Object.assign({}, state,
                {
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
            return state
    }

}

