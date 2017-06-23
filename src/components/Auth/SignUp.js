import React from "react";
import {ControlLabel, FormGroup, Col, FormControl, Form, Button} from "react-bootstrap";
// ES Modules, e.g. transpiling with Babel
import {Config, CognitoIdentityCredentials, } from "aws-sdk";
import {CognitoUserPool, CognitoUserAttribute, CognitoUser} from "amazon-cognito-identity-js";
import "../../App.css";
import appConfig from "./Config";
import {Redirect} from "react-router-dom";

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
        //Events Binding
        //Buttons
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnConfirm = this.handleOnConfirm.bind(this);

        //Fields
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleQraChange = this.handleQraChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);

        //API Callbacks
        this.handleUserCreated = this.handleUserCreated.bind(this);
        this.handleUserConfirmed = this.handleUserConfirmed.bind(this);
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
        this.setState({ cognitoUser: result.user });
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

        userPool.signUp(qra, password, attributeList, null, this.handleUserCreated);
    }

    handleOnConfirm(e) {

        e.preventDefault();
        const qra = this.state.qra.trim();
        const code = this.state.code.trim();

        this.state.cognitoUser.confirmRegistration(code, true, this.handleUserConfirmed);


    }

    render() {
        if (this.state.userConfirmed) {
            return (
                <Redirect to="/login"/>
            )
        }
        if (this.state.userCreated) {
            return (
                <div className="content">
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalCode">
                            <Col componentClass={ControlLabel} sm={2}>
                                Code
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="Code"
                                             onChange={this.handleCodeChange.bind(this)}/>
                            </Col>
                        </FormGroup>


                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button type="submit" onClick={this.handleOnConfirm}>
                                    Sign Up
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            )
        }
        return (
            <div className="content">
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                        </Col>
                        <Col sm={10}>
                            <FormControl type="email" placeholder="Email"
                                         onChange={this.handleEmailChange.bind(this)}/>
                        </Col>
                    </FormGroup>

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
                            <Button type="submit" onClick={this.handleOnClick}>
                                Sign Up
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );

    }
}