import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import {Home} from "./components/Home";
import {SignUp} from "./components/Auth/SignUp";
import Logout from "./components/Auth/Logout";
import {LogIn} from "./components/Auth/LogIn";
import AppNavigation from "./components/AppNavigation";
import AWS from "aws-sdk";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import appConfig from "./components/Auth/Config";
import {Segment } from 'semantic-ui-react'


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
        this.doLogin = this.doLogin.bind(this);

    }

    doLogin() {
        console.log("doLogin")
        this.setState({isAuthenticated: true});

    }

    doLogout() {
        console.log("doLogout")
        this.setState({isAuthenticated: false});

    }

    loadAuthenticatedUser() {
        var that = this;
        console.log("Loading Auth User");

        var userPool = new CognitoUserPool(appConfig.poolData);
        var cognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null) {

            cognitoUser.getSession(function (err, session) {
                if (err) {
                    alert(err);
                    that.doLogout();
                    return;
                }
                that.doLogin();
                //console.log('session validity: ' + session.isValid());
                //console.log(session.getIdToken().getJwtToken());
                var creds = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-east-1:051d18f6-a6bf-4237-af95-33c0f3a45cc1', // your identity pool id here
                    Logins: {
                        // Change the key below according to the specific region your user pool is in.
                        'cognito-idp.us-east-1.amazonaws.com/us-east-1_dqZFpjJEt': session.getIdToken().getJwtToken()
                    }
                }, {
                    region: "us-east-1"
                });

                creds.refresh(function (err, data) {
                    if (err) {
                        console.log(err);
                        that.setState({isAuthenticated : false});
                    }
                    else {

                    }
                });
                // AWS.config.credentials

                // Instantiate aws sdk service objects now that the credentials have been updated.
                // example: var s3 = new AWS.S3();

            });
        }
    }

    componentDidMount() {
        this.loadAuthenticatedUser();
        // var that = this;
        // console.log("Component mounted!");

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Router>
                <div>
                    <AppNavigation isAuthenticated={this.state.isAuthenticated}/>
                    <Segment attached='bottom'>
                        <Switch>
                            <Route exact path="/" component={() => <Home isAuthenticated={this.state.isAuthenticated} />}/>
                            {/*<Authenticated exact path="/documents" component={Documents} {...appProps} />*/}
                            {/*<Authenticated exact path="/documents/new" component={NewDocument} {...appProps} />*/}
                            {/*<Authenticated exact path="/documents/:_id" component={ViewDocument} {...appProps} />*/}
                            {/*<Authenticated exact path="/documents/:_id/edit" component={EditDocument} {...appProps} />*/}
                            <Route exact path="/signup" component={SignUp}/>
                            <Route exact path="/login" component={() => <LogIn isAuthenticated={this.state.isAuthenticated}
                                                                               doLogin={this.doLogin.bind(this)}/>}/>
                            <Route exact path="/logout"
                                   component={() => <Logout isAuthenticated={this.state.isAuthenticated}
                                                            doLogout={this.doLogout.bind(this)}/>}/>
                            {/*<Route name="recover-password" path="/recover-password" component={RecoverPassword} />*/}
                            {/*<Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />*/}
                            {/*<Route component={NotFound} />*/}
                        </Switch>
                    </Segment>
                </div>
            </Router>
        );
    }

}

