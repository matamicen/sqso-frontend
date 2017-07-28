import {LOGIN, LOGOUT} from "../actions/Actions"
const initialState = {
    userData: {
        token: "test",
        qra: "test",
        isAuthenticated: false
    },
    qsos: []
}

//define a reducer with an initialized state action
function sqsoApp(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            let logInUserData =  {
                token: action.token,
                isAuthenticated: true,
                qra: action.qra

            }
            let loggedinStore = Object.assign({}, state,
                {
                userData: logInUserData
                });

            return loggedinStore
        case LOGOUT:
            let logoutUserData =  {
                token: "",
                isAuthenticated: false
            }
            let loggedoutStore = Object.assign({}, state,
                {
                    userData: logoutUserData,
                    qsos: []
                });

            return loggedoutStore
        default:
            return state
    }

}

export default sqsoApp