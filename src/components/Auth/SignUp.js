import React from "react";
// ES Modules, e.g. transpiling with Babel import {Config,
// CognitoIdentityCredentials} from "aws-sdk"; import {CognitoUserPool} from

import "../../styles/App.css";
// import appConfig from "./Config";
import {Redirect} from "react-router-dom";
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'
import Header from 'semantic-ui-react/dist/commonjs/elements/Header'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form'
import Message from 'semantic-ui-react/dist/commonjs/collections/Message'
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'
import Auth from '@aws-amplify/auth';

// const userPool = new CognitoUserPool({UserPoolId: appConfig.UserPoolId,
// ClientId: appConfig.ClientId});

export class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirm: null,
            birthdate: '',
            qra: '',
            code: '',
            userCreated: false,
            userConfirmed: false,
            cognitoUser: '',
            signupError: '',
            confirmError: '',
            formErrors: {
                email: '',
                birthdate: '',
                password: '',
                passwordConfirm: '',
                qra: ''
            }
        };

    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }

    handleCodeChange(e) {
        this.setState({code: e.target.value});
    }

    handleBirthdateChange(e) {
        this.setState({birthdate: e.target.value});
    }
    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }
    handlePasswordConfirmChange(e) {
        this.setState({passwordConfirm: e.target.value});
    }
    handleQraChange(e) {
        this.setState({qra: e.target.value});

    }

    handleUserCreated(result) {

        this.setState({cognitoUser: result.user.username});
        this.setState({userCreated: true});

    }

    handleUserConfirmed(result) {
      
        
        this.setState({userConfirmed: true});

    }

    handleOnClick(e) {

        e.preventDefault();
        const email = this
            .state
            .email
            .trim();
        const password = this
            .state
            .password
            .trim();

        const qra = this
            .state
            .qra
            .trim()
            .toUpperCase();
        const birthdate = this
            .state
            .birthdate
            .trim();

        this.validateFields()

        if (!this.state.formErrors.password && !this.state.formErrors.email && !this.state.formErrors.passwordConfirm && !this.state.formErrors.qra && !this.state.formErrors.birthdate) {

            
            Auth.signUp({
                username: qra,
                password: password,
                attributes: {
                    email: email, // optional
                    birthdate: birthdate, // optional - E.164 number convention
                    // other custom attributes
                },
                validationData: [] //optional
            }).then(data => {

                this.handleUserCreated(data)

            }).catch(err => {
                console.log(err);
                this.setState({signupError: err})
            });
        }
    }
    validateFields() {

        let fieldValidationErrors = this.state.formErrors;

        //email
        
        let emailValid = this
            .state
            .email
            .match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid
            ? ''
            : 'Email is invalid';

        //password

        let passwordValid = this.state.password.length >= 6;
        fieldValidationErrors.password = passwordValid
            ? ''
            : 'Password is too short';

        fieldValidationErrors.passwordConfirm = (this.state.password === this.state.passwordConfirm)
            ? ''
            : 'Password and Confirmation are not the same';

        //QRA
        let qraValid = this.state.qra.length >= 6;
        fieldValidationErrors.qra = qraValid
            ? ''
            : 'QRA is too short';
        let birthdateValid = this.state.birthdate <= Date.now;

        fieldValidationErrors.birthdate = birthdateValid
            ? ''
            : 'Birthdate is not valid';

        this.setState({formErrors: fieldValidationErrors});
    }

    handleOnConfirm(e) {

        e.preventDefault();

        const code = this
            .state
            .code
            .trim();

        Auth.confirmSignUp(this.state.qra.trim().toUpperCase(), code, {
            // Optional. Force user confirmation irrespective of existing alias. By default
            // set to True.
            forceAliasCreation: true
        }).then(data => {
            
            this.handleUserConfirmed(data)

        }).catch(err => {
            console.log(err);
            this.setState({confirmError: err})
        });

    }

    render() {
        if (this.state.userConfirmed) {
            return (<Redirect to="/login"/>)
        }
        if (this.state.userCreated) {
            return (
                <Grid
                    textAlign='center'
                    style={{
                    height: '100%'
                }}
                    verticalAlign='middle'>
                    <Grid.Column
                        style={{
                        maxWidth: 450
                    }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Confirmation Code
                        </Header>
                        <Form
                            onSubmit={this
                            .handleOnConfirm
                            .bind(this)}>
                            <Form.Field>

                                <Form.Input
                                    fluid
                                    placeholder='Confirmation Code'
                                    name='Code'
                                    onChange={this
                                    .handleCodeChange
                                    .bind(this)}/>
                            </Form.Field>
                            {this.state.confirmError && <Message negative content={this.state.confirmError}/>}
                            <Form.Button content='Confirm Code'/>
                        </Form>
                    </Grid.Column>
                </Grid>
            )
        }
        return (
            <Grid
                textAlign='center'
                style={{
                height: '100%'
            }}
                verticalAlign='middle'>
                <Grid.Column style={{
                    maxWidth: 450
                }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Sign Up to SuperQSO
                    </Header>
                    <Form
                        size='large'
                        onSubmit={this
                        .handleOnClick
                        .bind(this)}>
                        <Segment stacked>

                            <Form.Field>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='QRA'
                                    error={this.state.formErrors.qra
                                    ? true
                                    : false}
                                    name='QRA'
                                    onChange={this
                                    .handleQraChange
                                    .bind(this)}
                                    style={{
                                    'textTransform': 'uppercase'
                                }}/> {this.state.formErrors.qra && <Message negative content={this.state.formErrors.qra}/>}
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    fluid
                                    icon='at'
                                    iconPosition='left'
                                    placeholder='Email'
                                    error={this.state.formErrors.email
                                    ? true
                                    : false}
                                    name='email'
                                    onChange={this
                                    .handleEmailChange
                                    .bind(this)}/> {this.state.formErrors.email && <Message negative content={this.state.formErrors.email}/>}
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    type='date'
                                    fluid
                                    icon='calendar'
                                    iconPosition='left'
                                    placeholder='Birthdate'
                                    error={this.state.formErrors.birthdate
                                    ? true
                                    : false}
                                    name='birthdate'
                                    onChange={this
                                    .handleBirthdateChange
                                    .bind(this)}/> {this.state.formErrors.birthdate && <Message negative content={this.state.formErrors.birthdate}/>}
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    type='password'
                                    error={this.state.formErrors.password
                                    ? true
                                    : false}
                                    placeholder='Password'
                                    name='password'
                                    onChange={this
                                    .handlePasswordChange
                                    .bind(this)}/> {this.state.formErrors.password && <Message negative content={this.state.formErrors.password}/>}
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    type='password'
                                    error={this.state.formErrors.passwordConfirm
                                    ? true
                                    : false}
                                    placeholder='Password Confirmation'
                                    name='passwordConfirm'
                                    onChange={this
                                    .handlePasswordConfirmChange
                                    .bind(this)}/> {this.state.formErrors.passwordConfirm && <Message negative content={this.state.formErrors.passwordConfirm}/>}
                            </Form.Field>

                            {this.state.signupError && <Message negative content={this.state.signupError}/>}

                            <Button content='SignUp'/>
                        </Segment>
                    </Form>

                </Grid.Column>
            </Grid>

        );

    }
}