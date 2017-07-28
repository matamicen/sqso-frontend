import React from "react";
import {CognitoUserPool, CognitoUser, AuthenticationDetails} from "amazon-cognito-identity-js";
// ES Modules, e.g. transpiling with Babel
import appConfig from "./Config";
import {Form} from "semantic-ui-react";
import "../../styles/App.css";
import {Redirect} from "react-router-dom";
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../../actions/Actions';

var poolData = {
    UserPoolId: appConfig.UserPoolId, // Your user pool id here
    ClientId: appConfig.ClientId // Your client id here
};

class LogIn extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            password: '',
            qra: ''

        };



    }
    componentDidMount() {

    }

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

        var cognitoUser = new CognitoUser(userData);


        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                let token = result.idToken.jwtToken;
                this.props.actions.doLogin(token, this.state.qra.toUpperCase());

            }.bind(this),

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
        if (this.props.state.userData.isAuthenticated) {
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

const mapStateToProps = (state) => ({
    state: state
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogIn);
