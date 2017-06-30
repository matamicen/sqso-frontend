import React from "react";
import {Col, FormControl, Button, FormGroup, ControlLabel, Checkbox} from "react-bootstrap";
import {CognitoUserPool, CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
// ES Modules, e.g. transpiling with Babel
import appConfig from "./Config";

import "../../App.css";
import {Redirect} from 'react-router-dom'


var poolData = {
    UserPoolId: appConfig.UserPoolId, // Your user pool id here
    ClientId: appConfig.ClientId // Your client id here
};

export class LogIn extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            password: '',
            qra: ''

        };



        //Fields
       // this.handlePasswordChange = this.handlePasswordChange.bind(this);
       // this.handleQraChange = this.handleQraChange.bind(this);

        //Event
       // this.handleOnClickLogin = this.handleOnClickLogin.bind(this);


        //Callback
       // this.handleOnLoginSuccess = this.handleOnLoginSuccess.bind(this);

    }



    handleOnClickLogin(e) {
        console.log("onClick")
                e.preventDefault();
        var authenticationData = {
            Username: this.state.qra,
            Password: this.state.password
        };
        var authenticationDetails = new AuthenticationDetails(authenticationData);

        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username: this.state.qra,
            Pool: userPool
        };

        var cognitoUser = new CognitoUser(userData);
        console.log("onClick")
        this.props.doLogin();
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                console.log(result);
                console.log('access token + ' + result.getAccessToken().getJwtToken());

                // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                //     IdentityPoolId : '...', // your identity pool id here
                //     Logins : {
                //         // Change the key below according to the specific region your user pool is in.
                //         'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : result.getIdToken().getJwtToken()
                //     }
                // });

                // Instantiate aws sdk service objects now that the credentials have been updated.
                // example: var s3 = new AWS.S3();
                console.debug()

                console.log("authenticated");
            },

            onFailure: function(err) {
                console.error(err);
            }
        });

    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleQraChange(e) {
        this.setState({qra: e.target.value})

    }



    render() {
        if (this.props.authenticated){ return <Redirect to="/home" /> }
        return (
            <div className="content">

                    <FormGroup controlId="formHorizontalQRA">
                        <Col componentClass={ControlLabel} sm={2}>
                            QRA
                        </Col>
                        <Col sm={10}>
                            <FormControl type="qra" placeholder="QRA"
                                         onChange={this.handleQraChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password"
                                         onChange={this.handlePasswordChange.bind(this)}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Checkbox>Remember me</Checkbox>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit" onClick={this.handleOnClickLogin.bind(this)}>
                                Login
                            </Button>
                        </Col>
                    </FormGroup>

            </div>
        );

    }
}