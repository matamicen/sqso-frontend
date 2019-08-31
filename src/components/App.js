import React, { Component, Fragment } from "react";

import { Route, Switch, withRouter } from "react-router-dom";

import Home from "./Home/Home";
import SignUp from "./Auth/SignUp";

import LogIn from "./Auth/LogIn";
import ForgotPassword from "./Auth/ForgotPassword";
import ChangePassword from "./Auth/ChangePassword";
import QRAProfileContainer from "./Profile/QRAProfileContainer";
import QSODetail from "./QSODetail";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import Auth from "@aws-amplify/auth";
import aws_exports from "../aws-exports";
import Amplify from "@aws-amplify/core";
import * as Sentry from "@sentry/browser";
import Notifications from "./Notifications/Notifications";
import ContactForm from "./contactForm";
import ErrorBoundary from "./ErrorBoundary";
import Follow from "./follow";
import TermsAndConditions from "./help/termsAndConditions";
import PrivacyPolicy from "./help/privacyPolicy";
import CookieUse from "./help/cookieUse";
// if (process.env.NODE_ENV !== 'production') {     const {whyDidYouUpdate} =
// require('why-did-you-update')     whyDidYouUpdate(React)   }

Amplify.configure(aws_exports);

class App extends Component {
  async componentDidMount() {
    this.props.actions.doStartingLogin();
    let session = await Auth.currentSession().catch(error => {
      // No Current User Message
      this.props.actions.doLogout();
    });

    if (session) {
      let credentials = await Auth.currentCredentials();
      this.props.actions.doLogin(
        session.idToken.jwtToken,
        session.idToken.payload["cognito:username"].toUpperCase(),
        credentials.data.IdentityId
      );
      this.props.actions.doFetchUserInfo(session.idToken.jwtToken);
      Sentry.configureScope(scope => {
        scope.setUser({
          qra: session.idToken.payload["cognito:username"].toUpperCase()
        });
      });
    } else {
      this.props.actions.doSetPublicSession();
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
              if (
                !this.props.authenticating &&
                (this.props.isAuthenticated || this.props.public)
              )
                return (
                  <ErrorBoundary key="home">
                    <Home />
                  </ErrorBoundary>
                );
              else return null;
            }}
          />
          <Route exact path="/signup" component={SignUp} />
          <Route
            exact
            path="/login"
            component={() => (
              <ErrorBoundary key="login">
                <LogIn />
              </ErrorBoundary>
            )}
          />
          <Route exact path="/forgot" component={() => <ForgotPassword />} />
          <Route
            exact
            path="/changepassword"
            component={() => (
              <ErrorBoundary key="changePassword">
                <ChangePassword />
              </ErrorBoundary>
            )}
          />
          <Route
            exact
            path="/notifications"
            component={() => {
              if (this.props.isAuthenticated)
                return (
                  <ErrorBoundary key="notifications">
                    <Notifications />
                  </ErrorBoundary>
                );
              else
                return (
                  <ErrorBoundary key="login">
                    <LogIn />
                  </ErrorBoundary>
                );
            }}
          />
          <Route
            exact
            path="/tos"
            component={() => (
              <ErrorBoundary key="tos">
                <TermsAndConditions />
              </ErrorBoundary>
            )}
          />
          <Route
            exact
            path="/cookie"
            component={() => (
              <ErrorBoundary key="cookie">
                <CookieUse />
              </ErrorBoundary>
            )}
          />
          <Route
            exact
            path="/privacy"
            component={() => (
              <ErrorBoundary key="privacy">
                <PrivacyPolicy />
              </ErrorBoundary>
            )}
          />
          <Route
            exact
            path="/contact"
            component={() => (
              <ErrorBoundary key="contact">
                <ContactForm />
              </ErrorBoundary>
            )}
          />
          <Route
            exact
            path="/follow"
            component={() => {
              if (this.props.isAuthenticated)
                return (
                  <ErrorBoundary key="follow">
                    <Follow />
                  </ErrorBoundary>
                );
              else
                return (
                  <ErrorBoundary key="login">
                    <LogIn />
                  </ErrorBoundary>
                );
            }}
          />
          <Route
            exact
            path="/:qra"
            component={() => {
              if (
                !this.props.authenticating &&
                (this.props.isAuthenticated || this.props.public)
              )
                return (
                  <ErrorBoundary key="qraProfile">
                    <QRAProfileContainer />
                  </ErrorBoundary>
                );
              else return null;
            }}
          />
          <Route
            exact
            path="/:qra/bio"
            component={() => {
              if (
                !this.props.authenticating &&
                (this.props.isAuthenticated || this.props.public)
              )
                return (
                  <ErrorBoundary key="qraProfileBio">
                    <QRAProfileContainer tab="BIO" />
                  </ErrorBoundary>
                );
              else return null;
            }}
          />
          <Route
            exact
            path="/:qra/info"
            component={() => {
              if (
                !this.props.authenticating &&
                (this.props.isAuthenticated || this.props.public)
              )
                return (
                  <ErrorBoundary key="qraProfileInfo">
                    <QRAProfileContainer tab="INFO" />{" "}
                  </ErrorBoundary>
                );
              else return null;
            }}
          />

          <Route
            exact
            path="/:qra/following"
            component={() => {
              if (
                !this.props.authenticating &&
                (this.props.isAuthenticated || this.props.public)
              )
                return (
                  <ErrorBoundary key="qraProfileFollowing">
                    <QRAProfileContainer tab="FOLLOWING" />{" "}
                  </ErrorBoundary>
                );
              else return null;
            }}
          />

          <Route
            exact
            path="/qso/:idqso"
            component={() => {
              if (
                !this.props.authenticating &&
                (this.props.isAuthenticated || this.props.public)
              )
                return (
                  <ErrorBoundary key="qsoDetail">
                    <QSODetail />
                  </ErrorBoundary>
                );
              else return null;
            }}
          />
        </Switch>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    authenticating: state.userData.authenticating,
    public: state.userData.public,
    isAuthenticated: state.userData.isAuthenticated
  };
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
