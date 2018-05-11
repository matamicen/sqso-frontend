import React, {Component} from "react";

import {Route, Switch, withRouter} from "react-router-dom";

import "../styles/App.css";
import Home from "./Home/Home";
import {SignUp} from "./Auth/SignUp";
import Logout from "./Auth/Logout";
import LogIn from "./Auth/LogIn";
import AppNavigation from "./Home/AppNavigation";
// import AWS from "aws-sdk";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import appConfig from "./Auth/Config";
import Container from 'semantic-ui-react/dist/commonjs/elements/Container'
import QRAProfileContainer from "./Profile/QRAProfileContainer";
import QSODetail from "./QSODetail"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';
// if (process.env.NODE_ENV !== 'production') {     const {whyDidYouUpdate} =
// require('why-did-you-update')     whyDidYouUpdate(React)   }
class App extends Component {
    constructor() {
        super();
        this.state = {};
    }
    loadAuthenticatedUser() {
        var userPool = new CognitoUserPool(appConfig.poolData);
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {

            cognitoUser
                .getSession(function (err, session) {
                    if (err) {
                        alert(err);
                        this
                            .props
                            .actions
                            .doLogout();
                        return;
                    }
                    let token = session
                        .getIdToken()
                        .getJwtToken();

                    this
                        .props
                        .actions
                        .doLogin(token, cognitoUser.username.toUpperCase());

                    var creds = new window
                        .AWS
                        .CognitoIdentityCredentials({
                            IdentityPoolId: appConfig.IdentityPoolId, // your identity pool id here
                            Logins: {
                                // Change the key below according to the specific region your user pool is in.
                                [appConfig.CognitoToken]: token
                            }
                        }, {region: appConfig.region});

                    creds.refresh(function (err, data) {
                        if (err) {
                            console.log(err);
                            this
                                .props
                                .actions
                                .doLogout()
                        } else {}
                    }.bind(this));

                }.bind(this));
        }

    }

    componentDidMount() {

        this.loadAuthenticatedUser()

    }

    render() {

        return (
            <div>
                <AppNavigation/>

                <Container
                    fluid
                    style={{
                    marginTop: '5em'
                }}>

                    <Switch>
                        <Route exact path="/" component={() => <Home/>}/>
                        <Route exact path="/signup" component={SignUp}/>
                        <Route exact path="/login" component={() => <LogIn/>}/>
                        <Route exact path="/logout" component={() => <Logout/>}/>
                        <Route exact path="/:qra" component={() => <QRAProfileContainer/>}/>
                        <Route exact path="/qso/:idqso" component={() => <QSODetail/>}/>
                    </Switch>
                </Container>

            </div>

        );
    }

}

const mapStateToProps = (state) => ({state: state});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
