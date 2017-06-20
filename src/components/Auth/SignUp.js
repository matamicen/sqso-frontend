import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Row,Col,  FormControl, Form, Button } from 'react-bootstrap';
// ES Modules, e.g. transpiling with Babel
import {Config, CognitoIdentityCredentials} from "aws-sdk";
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

import appConfig from './Config'

Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: appConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
    UserPoolId: appConfig.UserPoolId,
    ClientId: appConfig.ClientId,
});

export class SignUp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            qra: '',
        };
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }
    handleQraChange(e) {
        this.setState({qra: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const email = this.state.email.trim();
        const password = this.state.password.trim();
        const qra = this.state.qra.trim();


        var attributeList = [];

        var dataEmail = {
            Name : 'email',
            Value : email
        };

        var dataUsername = {
            Name : 'nickname',
            Value : qra
        };


        var attributeEmail = new CognitoUserAttribute(dataEmail);
        var attributeUsername = new CognitoUserAttribute(dataUsername);

        attributeList.push(attributeEmail);
        //attributeList.push(attributeUsername);

        userPool.signUp(qra, password, attributeList, null, function(err, result){
            if (err) {
                alert(err);
                return;
            }
            var cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
            console.log('call result: ' + result);
        });
    }
    render() {
        const isLoggedIn = this.state.isLoggedIn;


        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text"
                       value={this.state.qra}
                       placeholder="QRA"
                       onChange={this.handleQraChange.bind(this)}/>
                <input type="text"
                       value={this.state.email}
                       placeholder="Email"
                       onChange={this.handleEmailChange.bind(this)}/>
                <input type="password"
                       value={this.state.password}
                       placeholder="Password"
                       onChange={this.handlePasswordChange.bind(this)}/>
                <input type="submit"/>
            </form>
        );

    }
}