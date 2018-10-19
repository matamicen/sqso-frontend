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
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'
import AppNavigation from '../Home/AppNavigation'
export default class ForgotPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            password: '',
            passwordConfirm: null,
            qra: '',
            code: '',
            emailSent: false,
            userConfirmed: false,
            cognitoUser: '',
            forgotPasswordError: '',
            confirmError: '',
            formErrors: {
                qra: '',
                password: '',
                passwordConfirm: ''
            }
        };

    }

    handleCodeChange(e) {
        this.setState({code: e.target.value});
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

    handleEmailSent(result) {

        // this.setState({cognitoUser: result.user.username});
        this.setState({emailSent: true});
        this.setState({showModal: true})

    }

    handleUserConfirmed(result) {

        this.setState({userConfirmed: true});

    }

    handleChangePasswordButton(e) {

        e.preventDefault();

        const qra = this
            .state
            .qra
            .trim()
            .toUpperCase();

        this.validateQRA()

        if (!this.state.formErrors.qra) {

            Auth
                .forgotPassword(qra)
                .then(data => {

                    this.handleEmailSent(data)

                })
                .catch(err => {
                    console.log(err);
                    this.setState({forgotPasswordError: err})
                });
        }
    }
    validateFields() {

        let fieldValidationErrors = this.state.formErrors;

        //password

        let passwordValid = this.state.password.length >= 6;
        fieldValidationErrors.password = passwordValid
            ? ''
            : 'Password is too short';

        fieldValidationErrors.passwordConfirm = (this.state.password === this.state.passwordConfirm)
            ? ''
            : 'Password and Confirmation are not the same';

        this.setState({formErrors: fieldValidationErrors});
    }
    validateQRA() {

        let fieldValidationErrors = this.state.formErrors;

        //QRA
        let qraValid = this.state.qra.length >= 4;
        fieldValidationErrors.qra = qraValid
            ? ''
            : 'QRA is too short';

        this.setState({formErrors: fieldValidationErrors});
    }

    handleConfirmPasswordButton(e) {

        e.preventDefault();

        const code = this
            .state
            .code
            .trim();

        const password = this
            .state
            .password
            .trim();
        this.validateFields()

        if (!this.state.formErrors.password && !this.state.formErrors.passwordConfirm && !this.state.formErrors.qra) {

            Auth.forgotPasswordSubmit(this.state.qra.trim().toUpperCase(), code, password, {
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
    }
    handleOnOpenModal() {
        this.setState({showModal: true})
    }
    handleOnCloseModal() {
        this.setState({showModal: false})
    }
    render() {
        if (this.state.userConfirmed) {
            return (<Redirect to="/login"/>)
        };
        return (
            <div className='global-container'>
                <div className='site-header'>
                    <AppNavigation/>
                </div>
                <div className='site-left'>
                    <Advertisement className="left" unit='wide skyscraper' test='Wide Skyscraper'/>
                </div>

                <div className='site-main'>

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
                                Forgot Password
                            </Header>
                            <Form
                                size='large'
                                onSubmit={this
                                .handleChangePasswordButton
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

                                    {this.state.forgotPasswordError && <Message negative content={this.state.forgotPasswordError}/>}

                                    <Modal
                                        basic
                                        closeIcon
                                        open={this.state.showModal}
                                        onClose={this
                                        .handleOnCloseModal
                                        .bind(this)}
                                        trigger={< Button content = 'Change Password' />}>
                                        <Modal.Content>

                                            <Modal.Description>

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
                                                            Change Password
                                                        </Header>
                                                        <Form
                                                            onSubmit={this
                                                            .handleConfirmPasswordButton
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
                                                            {this.state.forgotPasswordError && <Message negative content={this.state.forgotPasswordError}/>}
                                                            <Form.Button content='Confirm Password'/>
                                                        </Form>
                                                    </Grid.Column>
                                                </Grid>
                                            </Modal.Description>
                                        </Modal.Content>
                                    </Modal>

                                </Segment>
                            </Form>

                        </Grid.Column>
                    </Grid>
                </div>

                <div className='site-right'>
                    <Advertisement unit='wide skyscraper' test='Wide Skyscraper'/>
                </div>

            </div>
        );
    }
}