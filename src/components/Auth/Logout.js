import React from "react";
// ES Modules, e.g. transpiling with Babel
import appConfig from "./Config";
import "../../App.css";
import {Redirect} from "react-router-dom";
import {CognitoUserPool} from "amazon-cognito-identity-js";

var poolData = {
    UserPoolId: appConfig.UserPoolId, // Your user pool id here
    ClientId: appConfig.ClientId // Your client id here
};

export default class Logout extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {};

    }

    componentDidMount() {
        var userPool = new CognitoUserPool(poolData);
        var cognitoUser = userPool.getCurrentUser();

        console.log("logout")
        console.log(cognitoUser)
        if (cognitoUser != null) {
            console.log("exit")
            cognitoUser.clearCachedTokens();
            this.props.doLogout();

            cognitoUser.signOut({
                onSuccess: function (result) {
                    console.log(result);

                },

                onFailure: function (err) {
                    console.error(err);
                }
            });
        }
        this.props.doLogout();
        // var that = this;
        // console.log("Component mounted!");

    }

    render() {

        return <Redirect to="/"/>
    }
}