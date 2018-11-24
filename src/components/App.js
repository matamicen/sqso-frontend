import React, {Component, Fragment} from "react";

import {Route, Switch, withRouter} from "react-router-dom";

import Home from "./Home/Home";
import {SignUp} from "./Auth/SignUp";

import LogIn from "./Auth/LogIn";
import ForgotPassword from './Auth/ForgotPassword'

import QRAProfileContainer from "./Profile/QRAProfileContainer";
import QSODetail from "./QSODetail"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';

import aws_exports from '../aws-exports';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import Notifications from "./Notifications/Notifications";

// if (process.env.NODE_ENV !== 'production') {     const {whyDidYouUpdate} =
// require('why-did-you-update')     whyDidYouUpdate(React)   }

Amplify.configure(aws_exports);

class App extends Component {
    constructor() {
        super();
        this.state = {
            loginValidated: false
        };
    }
    async loadAuthenticatedUser() {
        let session = await Auth
            .currentSession()
            .catch(err => {
                // console.log(err)
                // console.log("User NOT Authenticated")
                this
                    .props
                    .actions
                    .doLogout();
                this.setState({loginValidated: true});                
               
            });
            
        if (session) {      
            
             this.setState({loginValidated: true});
             this
                .props
                .actions
                .doFetchUserInfo(session.idToken.jwtToken);
             this
                .props
                .actions
                .doLogin(session.idToken.jwtToken, session.idToken.payload["cognito:username"].toUpperCase());

            
        }

    }

    componentDidMount() {

        this.loadAuthenticatedUser()

    }

    render() {

        if (!this.state.loginValidated) 
            return null;
        
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" component={() => <Home/>}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/login" component={() => <LogIn/>}/>
                    <Route exact path="/forgot" component={() => <ForgotPassword/>}/>
                    <Route exact path="/notifications" component={() => <Notifications/>}/>
                    <Route exact path="/:qra" component={() => <QRAProfileContainer/>}/>
                    <Route exact path="/qso/:idqso" component={() => <QSODetail/>}/>

                </Switch>

            </Fragment>

        );
    }

}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
