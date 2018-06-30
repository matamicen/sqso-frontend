import React from "react";

// ES Modules, e.g. transpiling with Babel


import "../../styles/App.css";
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
import { Auth } from 'aws-amplify';



// Amplify.configure(aws_exports);

// var poolData = {
//     UserPoolId: appConfig.UserPoolId, // Your user pool id here
//     ClientId: appConfig.ClientId // Your client id here
// };

class LogIn extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            password: '',
            qra: '',
            loginError: false
        };

    }

    handleOnClickLogin(e) {

        e.preventDefault();
        Auth
            .signIn(this.state.qra, this.state.password)
            .then(user => {
                
                let token = user.signInUserSession.idToken.jwtToken;
                this
                    .props
                    .actions
                    .doLogin(token, this.state.qra.toUpperCase());
            })
            .catch(err => {
                console.log(err)
                console.error(err);
                this.setState({loginError: true});
            });

        }

        handlePasswordChange(e) {
            this.setState({password: e.target.value});
        }

        handleQraChange(e) {
            this.setState({qra: e.target.value.toUpperCase()})

        }

        render() {
            if (this.props.isAuthenticated) {
                return <Redirect to="/"/>
            }

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
                    </Grid.Column>
                </Grid>

            );

        }
}

const mapStateToProps = (state) => ({isAuthenticated: state.default.userData.isAuthenticated});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
