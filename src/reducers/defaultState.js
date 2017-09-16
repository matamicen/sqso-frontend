import {LOGIN, LOGOUT, RECEIVE_FEED, RECEIVE_USERINFO, REQUEST_USERINFO, REQUEST_FEED, RECEIVE_QSO, REQUEST_QSO} from "../actions/Actions"
const initialState = {
    userData: {
        token: "test",
        qra: "test",
        isAuthenticated: false,
        following: [],
        followers: [],
        profilepic: null,
        FetchingUser: false
    },
    qsos: [],
    FetchingQSOS: false,
    qso: null,
    FetchingQSO: false
}

//define a reducer with an initialized state action
export default  function defaultState(state = initialState, action) {
    let newStore;
    let userInfo;
    switch (action.type) {
        case REQUEST_USERINFO:
            userInfo = { ...state.userData,
                FetchingUser: action.FetchingUser
            }
            newStore =  Object.assign({}, state,
                {
                    userData: userInfo
                });
            return newStore;
        case RECEIVE_USERINFO:
            userInfo = { ...state.userData,
                         following : action.following,
                         followers: action.followers,
                         profilepic: action.profilepic
            }
            newStore =  Object.assign({}, state,
                {
                    userData: userInfo
                });
            return newStore;
        case REQUEST_FEED:
            newStore = Object.assign({}, state, {
                FetchingQSOS: action.FetchingQSOS
            });
            return newStore;
        case RECEIVE_FEED:
            newStore = Object.assign({}, state, {
                qsos: action.qsos
            });
            return newStore;
        case REQUEST_QSO:
            newStore = Object.assign({}, state, {
                FetchingQSO: action.FetchingQSO
            });
            return newStore;
        case RECEIVE_QSO:
            newStore = Object.assign({}, state, {
                qso: action.qso
            });
            return newStore;
        case LOGIN:
            let logInUserData =  {
                ...state.userData,
                token: action.token,
                isAuthenticated: true,
                qra: action.qra

            }
            newStore = Object.assign({}, state,
                {
                userData: logInUserData
                });

            return newStore;
        case LOGOUT:
            let logoutUserData =  {
                ...state.userData,
                token: "",
                isAuthenticated: false
            }
            newStore = Object.assign({}, state,
                {
                    userData: logoutUserData,
                    qsos: []
                });

            return newStore;
        default:
            return state
    }

}

