import React from "react";
import {CognitoUserPool, CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
// ES Modules, e.g. transpiling with Babel
import appConfig from "./Config";
import {Form, Segment} from "semantic-ui-react";
import "../../App.css";
import {Redirect} from "react-router-dom";


var poolData = {
    UserPoolId: appConfig.UserPoolId, // Your user pool id here
    ClientId: appConfig.ClientId // Your client id here
};

export class LogIn extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            password: '',
            qra: ''

        };


        //Fields
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
        // this.handleQraChange = this.handleQraChange.bind(this);

        //Event
        // this.handleOnClickLogin = this.handleOnClickLogin.bind(this);


        //Callback
        // this.handleOnLoginSuccess = this.handleOnLoginSuccess.bind(this);

    }


    handleOnClickLogin(e) {
        console.log("onClick")
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

        var cognitoUser = new CognitoUser(userData);
        console.log("onClickLogin")
        this.props.doLogin();
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log(result);
                console.log('access token + ' + result.getAccessToken().getJwtToken());


                console.log("authenticated Login");
            },

            onFailure: function (err) {
                console.error(err);
            }
        });

    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleQraChange(e) {
        this.setState({qra: e.target.value})

    }


    render() {
        console.log("login");
        console.log(this.props.authenticated);
        if (this.props.authenticated) {
            return <Redirect to="/"/>
        }
        return (

                <Form onSubmit={this.handleOnClickLogin.bind(this)}>
                    <Form.Field>
                        <label>QRA</label>
                        <Form.Input placeholder='QRA' name='QRA' onChange={this.handleQraChange.bind(this)}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Form.Input type='password' placeholder='password' name='password'
                                    onChange={this.handlePasswordChange.bind(this)}/>
                    </Form.Field>
                    <Form.Button content='Login'/>
                </Form>



        );

    }
}