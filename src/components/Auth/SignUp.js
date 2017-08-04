import React from "react";
// ES Modules, e.g. transpiling with Babel
import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {CognitoUserPool, CognitoUserAttribute} from "amazon-cognito-identity-js";
import "../../styles/App.css";
import appConfig from "./Config";
import {Redirect} from "react-router-dom";
import {Form, Label} from "semantic-ui-react";

Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({
    IdentityPoolId: appConfig.IdentityPoolId
});

const userPool = new CognitoUserPool({
    UserPoolId: appConfig.UserPoolId,
    ClientId: appConfig.ClientId,
});

export class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            qra: '',
            code: '',
            userCreated: false,
            userConfirmed: false,
            cognitoUser: ''
        };

    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handleCodeChange(e) {
        this.setState({code: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleQraChange(e) {
        this.setState({qra: e.target.value});

    }

    handleUserCreated(err, result) {
        if (err) {
            alert(err);
            return;
        }
        this.setState({cognitoUser: result.user});
        console.log('user name is ' + this.state.cognitoUser.getUsername());
        console.log('call result: ' + result);
        this.setState({userCreated: true});

    }

    handleUserConfirmed(err, result) {
        if (err) {
            alert(err);
            return;
        }
        console.log('call result: ' + result);
        this.setState({userConfirmed: true});

    }


    handleOnClick(e) {

        e.preventDefault();
        const email = this.state.email.trim();
        const password = this.state.password.trim();
        const qra = this.state.qra.trim();


        var attributeList = [];

        var dataEmail = {
            Name: 'email',
            Value: email
        };


        var attributeEmail = new CognitoUserAttribute(dataEmail);


        attributeList.push(attributeEmail);
        //attributeList.push(attributeUsername);

        userPool.signUp(qra, password, attributeList, null, this.handleUserCreated.bind(this));
    }

    handleOnConfirm(e) {

        e.preventDefault();

        const code = this.state.code.trim();

        this.state.cognitoUser.confirmRegistration(code, true, this.handleUserConfirmed.bind(this));


    }

    render() {
        if (this.state.userConfirmed) {
            return (
                <Redirect to="/login"/>
            )
        }
        if (this.state.userCreated) {
            return (
                <Form onSubmit={this.handleOnConfirm.bind(this)}>
                    <Form.Field>
                        <label>Code</label>
                        <Form.Input placeholder='Code' name='Code' onChange={this.handleCodeChange.bind(this)}/>
                    </Form.Field>
                    <Form.Button content='Confirm'/>

                </Form>

            )
        }
        return (
            <Form onSubmit={this.handleOnClick.bind(this)}>
                <Form.Field>
                    <Label>Email</Label>
                    <Form.Input placeholder='Email' name='email' onChange={this.handleEmailChange.bind(this)}/>
                </Form.Field>
                <Form.Field>
                    <Label>QRA</Label>
                    <Form.Input placeholder='Qra' name='QRA' onChange={this.handleQraChange.bind(this)}/>
                </Form.Field>
                <Form.Field>
                    <Label>Password</Label>
                    <Form.Input type='password' placeholder='Password' name='password' onChange={this.handlePasswordChange.bind(this)}/>
                </Form.Field>
                <Form.Button content='SignUp'/>

            </Form>

        );

    }
}