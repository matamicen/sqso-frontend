import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Row,Col,  FormControl, Form, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router'
import {Config, CognitoIdentityCredentials, CognitoIdentityServiceProvider} from "aws-sdk";
import { CognitoUserPool} from 'amazon-cognito-identity-js';
// ES Modules, e.g. transpiling with Babel
import appConfig from './Config'

Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: appConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
    UserPoolId: appConfig.UserPoolId,
    ClientId: appConfig.ClientId,
});

export class Account extends React.Component{
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false,
            password: '',
            qra: ''
        };
    }

    handleLoginClick() {
        const qra = this.state.qra.trim();
        const password = this.state.password.trim();
        var authenticationData = {
            Username : qra,
            Password : password,
        };
        var authenticationDetails = new CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

        var userPool = new CognitoIdentityServiceProvider.CognitoUserPool(userPool);
        var userData = {
            Username : qra,
            Pool : userPool
        };
        var cognitoUser = new CognitoIdentityServiceProvider.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log('access token + ' + result.getAccessToken().getJwtToken());

                //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                // AWS.config.region = appConfig.region;
                // var login = 'cognito-idp.' && appConfig.region && '.amazonaws.com/' &&  appConfig.UserPoolId;
                // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                //     IdentityPoolId : appConfig.IdentityPoolId, // your identity pool id here
                //
                //     Logins : {
                //         // Change the key below according to the specific region your user pool is in.
                //          login : result.getIdToken().getJwtToken()
                //     }
                // });

                // Instantiate aws sdk service objects now that the credentials have been updated.
                // example: var s3 = new AWS.S3();
                this.setState({isLoggedIn: true});
            },

            onFailure: function(err) {
                alert(err);
            },

        });


    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    redirectTo(route){
        browserHistory.push(route)
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        const formLogIn = (
            <Form onSubmit={this.handleLoginClick}>
                <Row className="show-grid">
                    <Col xs={2} md={2}>
                        <FormControl bsSize="small" type="qra" placeholder="QRA"
                                     ref={input => this.state.qra = input}/>/>
                    </Col>
                    <Col xs={2} md={2}>
                        <FormControl bsSize="small" type="password" placeholder="Password"
                                     ref={input => this.state.password = input}/>
                    </Col>
                    <Col xs={2} md={2}>
                        <Button type="submit">
                        Sign in
                        </Button>
                    </Col>
                    <Col xs={3} md={3}>
                        <Button type="submit" onClick={()=>this.redirectTo('/auth/signup')}>
                            Sign Up
                        </Button>
                    </Col>
                </Row>
            </Form>


        );
        const formLogOut = (
            <Form onSubmit={this.handleLogoutClick}>
                <Row className="show-grid">
                   <Col xs={2} md={2}>
                        <Button type="submit">
                            Sign out
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
        return (
            <div>
                {isLoggedIn ? formLogOut:  formLogIn}
            </div>
        );

    }
}