import React from "react";
import {Col, FormControl, Form, Button, FormGroup, ControlLabel, Checkbox} from "react-bootstrap";
import AWS, {Config, CognitoIdentityCredentials} from 'aws-sdk'
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';
import {Redirect} from 'react-router-dom'
// ES Modules, e.g. transpiling with Babel
import appConfig from "./Config";

import "../../App.css";
Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: appConfig.IdentityPoolId
});


export class LogIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userLogged: false,
            password: '',
            qra: ''
        };

        //Fields
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleQraChange = this.handleQraChange.bind(this);

        //Event
        this.handleOnClickLogin = this.handleOnClickLogin.bind(this);

        //Callback
        this.handleOnLoginSuccess = this.handleOnLoginSuccess.bind(this);

    }

    handleOnLoginSuccess(result) {
        //alert("result" )
       // // console.debug(result)
       //  console.log('access token + ' + result.getAccessToken().getJwtToken());
       //  //var URL = "cognito-idp." + appConfig.region + ".amazonaws.com/" + appConfig.UserPoolId;
       //  //POTENTIAL: Region needs to be set if not already set previously elsewhere.
       //  AWS.config.region = appConfig.region;
       //  alert(result.getIdToken().getJwtToken());
       //  console.log(result)
       //  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
       //      IdentityPoolId: appConfig.IdentityPoolId, // your identity pool id here
       //      Logins: {
       //          // Change the key below according to the specific region your user pool is in.
       //          URL : result.getIdToken().getJwtToken()
       //      }
       //  });
       //
       // // this.setState({userLogged : true});
       //  // Instantiate aws sdk service objects now that the credentials have been updated.
       //  // example: var s3 = new AWS.S3();

    }

    handleOnClickLogin() {


        var authenticationData = {
            Username: this.state.qra,
            Password: this.state.password
        };
        var authenticationDetails = new AuthenticationDetails(authenticationData);
        console.log(authenticationDetails)
        var poolData = {
            UserPoolId: appConfig.UserPoolId, // Your user pool id here
            ClientId: appConfig.ClientId // Your client id here
        };
        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username: this.state.qra,
            Pool: userPool
        };

        console.log(userData)
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result){
                console.debug(result)
                console.log(result);
            },
            onFailure: function (err) {
                console.log(err);
            },

        });

    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleQraChange(e) {
        this.setState({qra: e.target.value})

    }


    render() {

        return (
            <div className="content">
                <Form horizontal>
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
                            <Button type="submit" onClick={this.handleOnClickLogin}>
                                Login
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );

    }
}