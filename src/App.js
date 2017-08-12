import React, {Component} from "react";
import {Route, Switch, withRouter} from "react-router-dom";
import "./styles/App.css";
import Home from "./components/Home";
import {SignUp} from "./components/Auth/SignUp";
import Logout from "./components/Auth/Logout";
import LogIn from "./components/Auth/LogIn";
import AppNavigation from "./components/AppNavigation";
import AWS from "aws-sdk";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import appConfig from "./components/Auth/Config";
import {Segment} from 'semantic-ui-react'
import QRAProfile from "./components/QRAProfile";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from './actions/Actions';


class App extends Component {

    loadAuthenticatedUser() {
        var userPool = new CognitoUserPool(appConfig.poolData);
        var cognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null) {

            cognitoUser.getSession(function (err, session) {
                if (err) {
                    alert(err);
                    this.props.actions.doLogout();
                    return;
                }
                let token = session.getIdToken().getJwtToken();
                this.props.actions.doLogin(token, cognitoUser.username.toUpperCase());

                var creds = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-east-1:051d18f6-a6bf-4237-af95-33c0f3a45cc1', // your identity pool id here
                    Logins: {
                        // Change the key below according to the specific region your user pool is in.
                        'cognito-idp.us-east-1.amazonaws.com/us-east-1_dqZFpjJEt': token
                    }
                }, {
                    region: "us-east-1"
                });

                creds.refresh(function (err, data) {
                    if (err) {
                        console.log(err);
                        this.props.actions.doLogout()
                    }
                    else {
                        var apigClient = window.apigClientFactory.newClient({});
                        var params;
                        var body = {};
                        var additionalParams = {};



                        params = {
                            "Authorization": this.props.state.default.userData.token
                        };
                        this.props.actions.doRequestUserInfo();
                        apigClient.userInfoGet(params, body, additionalParams)
                            .then(function (result) {
                                if (result.data.body.error === 0) {
                                    this.props.actions.doReceiveUserInfo(result.data.body.message.followers, result.data.body.message.following, result.data.body.message.profilepic);
                                }


                            }.bind(this)).catch(function (error) {
                            console.log("error");
                            alert(error);
                        });
                        this.props.actions.doRequestFeed();
                        apigClient.qsoGetUserFeedGet(params, body, additionalParams)
                            .then(function (result) {
                                this.props.actions.doReceiveFeed(result.data);

                            }.bind(this)).catch(function (error) {
                            console.log("error");
                            alert(error);
                        });
                    }
                }.bind(this));


            }.bind(this));
        }

    }

    componentWillMount() {

        this.loadAuthenticatedUser();

    }

    componentWillUnmount() {

    }

    render() {

        return (
            <div>
                <AppNavigation/>
                <Segment attached='bottom'>
                    <Switch>
                        <Route exact path="/"
                               component={() => <Home/>}/>

                        <Route exact path="/signup" component={SignUp}/>
                        <Route exact path="/login"
                               component={() => <LogIn/>}/>
                        <Route exact path="/logout"
                               component={() => <Logout/>}/>
                        {/*<Route name="recover-password" path="/recover-password" component={RecoverPassword} />*/}
                        {/*<Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />*/}
                        {/*<Route component={NotFound} />*/}
                        <Route path="/:qra"
                               component={() =>
                                   <QRAProfile/>
                               }/>
                    </Switch>
                </Segment>
            </div>

        );
    }

}

const mapStateToProps = (state) => ({
    state: state
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
})


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps)(App));



