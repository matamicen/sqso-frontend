import React from "react";
// ES Modules, e.g. transpiling with Babel
import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {CognitoUserPool, CognitoUserAttribute} from "amazon-cognito-identity-js";
import "../../styles/App.css";
import appConfig from "./Config";
import {Redirect} from "react-router-dom";
import {
    Form,
    Grid,
    Header,
    Segment,
    Message,
    Button
} from "semantic-ui-react";

Config.region = appConfig.region;
Config.credentials = new CognitoIdentityCredentials({IdentityPoolId: appConfig.IdentityPoolId});

const userPool = new CognitoUserPool({UserPoolId: appConfig.UserPoolId, ClientId: appConfig.ClientId});

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

    handleUserCreated(err, result) {
        if (err) {
            this.setState({signupError: err})
            alert(err);
            return;
        }
        this.setState({cognitoUser: result.user});   
        this.setState({userCreated: true});

    }

    handleUserConfirmed(err, result) {
        if (err) {
            this.setState({confirmError: err})
            alert(err);
            return;
        }
        console.log('call result: ' + result);
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
            .trim();
        const birthdate = this
            .state
            .birthdate
            .trim();

        var attributeList = [];

        var dataEmail = {
            Name: 'email',
            Value: email
        };

        var dataBirthdate = {
            Name: 'birthdate',
            value: birthdate
        }
        // Validate Email
        this.validateFields()

        if (!this.state.formErrors.password && !this.state.formErrors.email && !this.state.formErrors.passwordConfirm && !this.state.formErrors.qra && !this.state.formErrors.birthdate) {

            var attributeEmail = new CognitoUserAttribute(dataEmail);
            var attributeBirthdate = new CognitoUserAttribute(dataBirthdate);

            attributeList.push(attributeEmail);
            attributeList.push(attributeBirthdate);
            //attributeList.push(attributeUsername);

            userPool.signUp(qra, password, attributeList, null, this.handleUserCreated.bind(this));
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

        this
            .state
            .cognitoUser
            .confirmRegistration(code, true, this.handleUserConfirmed.bind(this));

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
                                    .handleEmailChange
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