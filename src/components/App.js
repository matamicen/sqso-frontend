import React, {PureComponent, Fragment} from "react";

import {Route, Switch, withRouter} from "react-router-dom";

import Home from "./Home/Home";
import {SignUp} from "./Auth/SignUp";

import LogIn from "./Auth/LogIn";
import ForgotPassword from './Auth/ForgotPassword'
import ChangePassword from './Auth/ChangePassword'
import QRAProfileContainer from "./Profile/QRAProfileContainer";
import QSODetail from "./QSODetail"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../actions/Actions';
import Auth from '@aws-amplify/auth';
import aws_exports from '../aws-exports';
import Amplify from '@aws-amplify/core';
// import Auth from '@aws-amplify/auth';
import Notifications from "./Notifications/Notifications";

// if (process.env.NODE_ENV !== 'production') {     const {whyDidYouUpdate} =
// require('why-did-you-update')     whyDidYouUpdate(React)   }

Amplify.configure(aws_exports);

class App extends PureComponent {
    async componentDidMount() {
        this
            .props
            .actions
            .doStartingLogin();
        let session = await Auth
            .currentSession()
            .catch(err => {
                this
                    .props
                    .actions
                    .doLogout();

            });

        if (session) {

            let credentials = await Auth.currentCredentials();

            this
                .props
                .actions
                .doLogin(session.idToken.jwtToken, session.idToken.payload["cognito:username"].toUpperCase(), credentials.data.IdentityId);
            this
                .props
                .actions
                .doFetchUserInfo(session.idToken.jwtToken);

        } else {
            this
                .props
                .actions
                .doSetPublicSession();

        }

    }
    render() {

        return (
            <Fragment>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={() => {
                        if (!this.props.authenticating && (this.props.isAuthenticated || this.props.public)) 
                            return <Home/>
                            else 
                                return null;
                            }}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/login" component={() => <LogIn/>}/>
                    <Route exact path="/forgot" component={() => <ForgotPassword/>}/>
                    <Route exact path="/changepassword" component={() => <ChangePassword/>}/>
                    <Route exact path="/notifications" component={() => <Notifications/>}/>
                    <Route
                        exact
                        path="/:qra"
                        component={() => {
                        if (!this.props.authenticating && (this.props.isAuthenticated || this.props.public)) 
                            return <QRAProfileContainer/>
                            else 
                                return null;
                            }}/>
                    <Route
                        exact
                        path="/:qra/bio"
                        component={() => {
                        if (!this.props.authenticating && (this.props.isAuthenticated || this.props.public)) 
                            return <QRAProfileContainer tab='BIO'/>
                            else 
                                return null;
                            }}/>
                    <Route
                        exact
                        path="/:qra/info"
                        component={() => {
                        if (!this.props.authenticating && (this.props.isAuthenticated || this.props.public)) 
                            return <QRAProfileContainer tab='INFO'/>
                            else 
                                return null;
                            }}/>

                    <Route
                        exact
                        path="/:qra/following"
                        component={() => {
                        if (!this.props.authenticating && (this.props.isAuthenticated || this.props.public)) 
                            return <QRAProfileContainer tab='FOLLOWING'/>
                            else 
                                return null;
                            }}/>

                    <Route
                        exact
                        path="/qso/:idqso"
                        component={() => {
                        if (!this.props.authenticating && (this.props.isAuthenticated || this.props.public)) 
                            return <QSODetail/>
                            else 
                                return null;
                            }}/>

                </Switch>

            </Fragment>

        );
    }

}

const mapStateToProps = (state) => ({authenticating: state.default.userData.authenticating, public: state.default.userData.public, isAuthenticated: state.default.userData.isAuthenticated});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
