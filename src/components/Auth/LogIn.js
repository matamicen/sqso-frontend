import React from "react";

// ES Modules, e.g. transpiling with Babel

import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/Actions';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'
import Header from 'semantic-ui-react/dist/commonjs/elements/Header'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form'
import Message from 'semantic-ui-react/dist/commonjs/collections/Message'
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'
// import Auth from '@aws-amplify/auth';
import "./style.css";
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'
import AppNavigation from '../Home/AppNavigation'
import Amplify from '@aws-amplify/core'

const Auth = Amplify.Auth;
class LogIn extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            password: '',
            qra: '',
            loginError: false
        };

    }

    async handleOnClickLogin(e) {
        let token;
        e.preventDefault();
        await this
            .props
            .actions
            .doStartingLogin()
        await Auth
            .signIn(this.state.qra, this.state.password)
            .then(user => {

                token = user.signInUserSession.idToken.jwtToken;
                this
                    .props
                    .actions
                    .doLogin(token, this.state.qra.toUpperCase());

            })
            .catch(err => {

                console.error(err);
                this.setState({loginError: true});
            });
        await this
            .props
            .actions
            .doFetchUserInfo(token);

    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleQraChange(e) {
        this.setState({
            qra: e
                .target
                .value
                .toUpperCase()
        })

    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/"/>
        }

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
                                Sign-in to your account
                            </Header>
                            <Form
                                size='large'
                                onSubmit={this
                                .handleOnClickLogin
                                .bind(this)}>
                                <Segment stacked>
                                    <Form.Field>
                                        <Form.Input
                                            fluid
                                            icon='user'
                                            iconPosition='left'
                                            placeholder='QRA'
                                            error={this.state.loginError}
                                            name='QRA'
                                            value={this.state.qra}
                                            onChange={this
                                            .handleQraChange
                                            .bind(this)}
                                            style={{
                                            'textTransform': 'uppercase'
                                        }}/>
                                    </Form.Field>
                                    <Form.Field>

                                        <Form.Input
                                            fluid
                                            icon='lock'
                                            iconPosition='left'
                                            type='password'
                                            error={this.state.loginError}
                                            placeholder='Password'
                                            name='password'
                                            onChange={this
                                            .handlePasswordChange
                                            .bind(this)}/>

                                    </Form.Field>

                                    {this.state.loginError && <Message>
                                        <Message.List>
                                            <Message.Item>User or Password invalid</Message.Item>
                                        </Message.List>
                                    </Message>}
                                    <Button content='SignIn'/>
                                </Segment>
                            </Form>
                            <Message>
                                New to us?
                                <Link to='/signup'>{' '}Sign Up</Link>
                            </Message>
                            <Message>
                                Forgot Password?
                                <Link to='/forgot'>{' '}Change Password</Link>
                            </Message>
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

const mapStateToProps = (state) => ({isAuthenticated: state.default.userData.isAuthenticated});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
