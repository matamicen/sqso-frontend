import React from "react";
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from "amazon-cognito-identity-js";
// ES Modules, e.g. transpiling with Babel
import appConfig from "./Config";

import "../../styles/App.css";
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/Actions';
import {Button, Form, Message, Grid, Segment} from 'semantic-ui-react'

var poolData = {
    UserPoolId: appConfig.UserPoolId, // Your user pool id here
    ClientId: appConfig.ClientId // Your client id here
};

class LogIn extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            password: '',
            qra: '',
            loginError: false
        };

    }
    componentDidMount() {}

    handleOnClickLogin(e) {

        e.preventDefault();
        var authenticationData = {
            Username: this.state.qra,
            Password: this.state.password
        };
        var authenticationDetails = new AuthenticationDetails(authenticationData);

        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username: this.state.qra,
            Pool: userPool
        };

    /*     ///TEST NEW API
     
        var authParams = {
          AuthFlow: 'ADMIN_NO_SRP_AUTH',
          ClientId: poolData.ClientId,
          UserPoolId: poolData.UserPoolId,
          AuthParameters: {
            USERNAME: this.state.qra,
            PASSWORD: this.state.password,
          },
        };
        var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
            region: 'us-east-1' // Why do I need this? Its in .aws/config
        });
        
        cognitoidentityserviceprovider.adminInitiateAuth(authParams, function(err, sessionData) {
        
            if (err) {
                console.log(err, err.stack);
            } else {
        
                var cognitoidentity = new AWS.CognitoIdentity({
                    region: 'us-east-1' // Why do I need this? Its in .aws/config
                });
        
                var getIdParams = {
                    IdentityPoolId: 'us-east-1:051d18f6-a6bf-4237-af95-33c0f3a45cc1',
                    Logins: {
                        'cognito-idp.us-east-1.amazonaws.com/us-east-1_yznBlsoTx': sessionData.AuthenticationResult.IdToken
                    }
                }
        
                cognitoidentity.getId(getIdParams, function(err, identity) {
                    if (err)
                    {
                        console.log(err, err.stack);
                    }
                    else
                    {       
        
                        var getCredentialsParams = {
                            IdentityId: identity.IdentityId,
                            Logins: {
                                'cognito-idp.us-east-1.amazonaws.com/us-east-1_yznBlsoTx': sessionData.AuthenticationResult.IdToken
                            }                        
                        };
        
                        cognitoidentity.getCredentialsForIdentity(getCredentialsParams, function(err, credentials) {                        
                          if (err)
                          {
                              console.log(err, err.stack);
                          }
                          else 
                          {
                              console.log(credentials); // SUCCESS!
                          }
                        });
        
        
                    }
                });
        
        
            }
        });

        //END TEST NEW API */
        var cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                let token = result.idToken.jwtToken;
                this
                    .props
                    .actions
                    .doLogin(token, this.state.qra.toUpperCase());

            }.bind(this),

            onFailure: function (err) {
                console.error(err);
                this.setState({loginError: true})

            }.bind(this)
        });

    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleQraChange(e) {
        this.setState({qra: e.target.value})

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
                <Grid.Column style={{
                    maxWidth: 450
                }}>
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
                            <Button content='Login'/>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to='/signup'>Sign Up</Link>
                    </Message>
                </Grid.Column>
            </Grid>

        );

    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.default.userData.isAuthenticated
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
