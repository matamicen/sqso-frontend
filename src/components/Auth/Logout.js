import React from "react";
// ES Modules, e.g. transpiling with Babel
import appConfig from "./Config";
import "../../styles/App.css";
import {Redirect} from "react-router-dom";
// import {CognitoUserPool} from "amazon-cognito-identity-js";
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/Actions';

var poolData = {
    UserPoolId: appConfig.UserPoolId, // Your user pool id here
    ClientId: appConfig.ClientId // Your client id here
};

class Logout extends React.Component {

    componentDidMount() {
        var userPool = new window.CognitoUserPool(poolData);
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.clearCachedTokens();
            this.props.actions.doLogout();

            cognitoUser.signOut({
                onSuccess: function (result) {
                    console.log(result);

                },

                onFailure: function (err) {
                    console.error(err);
                }
            });
        }
        this.props.actions.doLogout();

    }

    render() {

        return <Redirect to="/"/>
    }
}

const mapStateToProps = (state) => ({
    state: state
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout);
