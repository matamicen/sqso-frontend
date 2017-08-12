import {LOGIN, LOGOUT, RECEIVE_FEED, RECEIVE_USERINFO} from "../actions/Actions"
const initialState = {
    userData: {
        token: "test",
        qra: "test",
        isAuthenticated: false,
        following: [],
        followers: [],
        profilepic: null
    },
    qsos: []
}

//define a reducer with an initialized state action
export default  function defaultState(state = initialState, action) {
    let newStore;
    switch (action.type) {
        case RECEIVE_USERINFO:
            let userInfo = { ...state.userData,
                         following : action.following,
                         followers: action.followers,
                         profilepic: action.profilepic
            }
            newStore =  Object.assign({}, state,
                {
                    userData: userInfo
                });
            return newStore;
        case RECEIVE_FEED:
            newStore = Object.assign({}, state, {
                qsos: action.qsos
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

