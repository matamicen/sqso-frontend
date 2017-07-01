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

        console.log(cognitoUser)
        if (cognitoUser != null) {
            console.log("exit")
            cognitoUser.clearCachedTokens();
            //this.props.doLogout();
            cognitoUser.signOut({
                onSuccess: function(result) {
                    console.log(result);

                   // console.log('access token + ' + result.getAccessToken().getJwtToken());

                    // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    //     IdentityPoolId : '...', // your identity pool id here
                    //     Logins : {
                    //         // Change the key below according to the specific region your user pool is in.
                    //         'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : result.getIdToken().getJwtToken()
                    //     }
                    // });

                    // Instantiate aws sdk service objects now that the credentials have been updated.
                    // example: var s3 = new AWS.S3();

                },

                onFailure: function(err) {
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