import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import * as Sentry from '@sentry/browser';
import PropTypes from 'prop-types';
import React, { Component, Suspense } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import AwsExports from '../aws-exports';
import ChangePassword from './Auth/ChangePassword';
import ForgotPassword from './Auth/ForgotPassword';
import LogIn from './Auth/LogIn';
import SignUp from './Auth/SignUp';
import ContactForm from './contactForm';
import ErrorBoundary from './ErrorBoundary';
import Follow from './follow';
import Download from './help/download';
import FAQ from './help/faq';
import PrivacyPolicy from './help/privacyPolicy';
import TermsOfService from './help/termsOfServcice';
import Tutorials from './help/tutorials';
import Home from './Home/Home';
import Notifications from './Notifications/Notifications';
import QRAProfileContainer from './Profile/QRAProfileContainer';
import QSODetail from './QSODetail';
// if (process.env.NODE_ENV !== 'production') {     const {whyDidYouUpdate} =
// require('why-did-you-update')     whyDidYouUpdate(React)   }

Amplify.configure(AwsExports);

class App extends Component {
  async componentDidMount() {
    this.props.actions.doStartingLogin();
    const session = await Auth.currentSession().catch(error => {
      this.props.actions.doLogout();
    });

    if (
      session &&
      session.idToken &&
      session.idToken.payload['custom:callsign']
    ) {
      const credentials = await Auth.currentCredentials();

      if (!credentials.data) {
        await Auth.signOut();

        this.props.actions.doSetPublicSession();
      } else {
        this.props.actions.doLogin(
          session.idToken.jwtToken,
          session.idToken.payload['custom:callsign'].toUpperCase(),
          credentials.data.IdentityId
        );
        this.props.actions.doFetchUserInfo(session.idToken.jwtToken);
        Sentry.configureScope(scope => {
          scope.setUser({
            qra: session.idToken.payload['custom:callsign'].toUpperCase()
          });
        });
      }
    } else {
      await Auth.signOut();

      this.props.actions.doSetPublicSession();
    }
  }

  render() {
    const {t} = this.props;
    return (
      <Suspense fallback={<div>{t('global.loading')}</div>}>
        <Switch>
          <Route
            exact
            path="/"
            location={{
              pathname: '/',
              state: { from: this.props.location.pathname }
            }}
            component={() => {
              if (
                !this.props.authenticating &&
                (this.props.isAuthenticated || this.props.public)
              ) {
                return (
                  <ErrorBoundary key="home">
                    <Home />
                  </ErrorBoundary>
                );
              } else return null;
            }}
          />
          <Route exact path="/signup" component={SignUp} />
          <Route
            exact
            location={{
              pathname: '/login',
              state: { from: this.props.location.pathname }
            }}
            path="/login"
            component={() => (
              <ErrorBoundary key="login">
                <LogIn />
              </ErrorBoundary>
            )}
          />
          <Route
            exact
            path="/forgot"
            location={{
              pathname: '/forgot',
              state: { from: this.props.location.pathname }
            }}
            component={() => <ForgotPassword />}
          />
          <Route
            exact
            path="/changepassword"
            location={{
              pathname: '/changepassword',
              state: { from: this.props.location.pathname }
            }}
            component={() => {
              if (
                this.props.isAuthenticated ||
                (this.props.location.data &&
                  this.props.location.data.newPasswordRequired)
              ) {
                return (
                  <ErrorBoundary key="changePassword">
                    <ChangePassword />
                  </ErrorBoundary>
                );
              } else {
                return (
                  <ErrorBoundary key="login">
                    <LogIn />
                  </ErrorBoundary>
                );
              }
            }}
          />
          <Route
            exact
            path="/notifications"
            location={{
              pathname: '/notifications',
              state: { from: this.props.location.pathname }
            }}
            component={() => {
              if (this.props.isAuthenticated) {
                return (
                  <ErrorBoundary key="notifications">
                    <Notifications />
                  </ErrorBoundary>
                );
              } else {
                return (
                  <ErrorBoundary key="login">
                    <LogIn />
                  </ErrorBoundary>
                );
              }
            }}
          />
          <Route
            exact
            path="/privacy"
            location={{
              pathname: '/privacy',
              state: { from: this.props.location.pathname }
            }}
            component={() => (
              <ErrorBoundary key="privacy">
                <PrivacyPolicy />
              </ErrorBoundary>
            )}
          />
          <Route
            exact
            path="/terms"
            location={{
              pathname: '/terms',
              state: { from: this.props.location.pathname }
            }}
            component={() => (
              <ErrorBoundary key="terms">
                <TermsOfService />
              </ErrorBoundary>
            )}
          />
          <Route
            exact
            path="/faq"
            location={{
              pathname: '/faq',
              state: { from: this.props.location.pathname }
            }}
            component={() => (
              <ErrorBoundary key="faq">
                <FAQ />
              </ErrorBoundary>
            )}
          />
          <Route
            exact
            path="/tutorials"
            location={{
              pathname: '/tutorials',
              state: { from: this.props.location.pathname }
            }}
            component={() => (
              <ErrorBoundary key="tutorials">
                <Tutorials />
              </ErrorBoundary>
            )}
          />
          <Route
            exact
            path="/download"
            location={{
              pathname: '/download',
              state: { from: this.props.location.pathname }
            }}
            component={() => (
              <ErrorBoundary key="download">
                <Download />
              </ErrorBoundary>
            )}
          />
          <Route
            exact
            path="/contact"
            location={{
              pathname: '/contact',
              state: { from: this.props.location.pathname }
            }}
            component={() => (
              <ErrorBoundary key="contact">
                <ContactForm />
              </ErrorBoundary>
            )}
          />
          <Route
            exact
            path="/follow"
            location={{
              pathname: '/follow',
              state: { from: this.props.location.pathname }
            }}
            component={() => {
              if (this.props.isAuthenticated) {
                return (
                  <ErrorBoundary key="follow">
                    <Follow />
                  </ErrorBoundary>
                );
              } else {
                return (
                  <ErrorBoundary key="login">
                    <LogIn />
                  </ErrorBoundary>
                );
              }
            }}
          />
          <Route
            exact
            path="/:qra"
            location={{
              pathname: '/:qra',
              state: { from: this.props.location.pathname }
            }}
            component={() => {
              if (
                !this.props.authenticating &&
                (this.props.isAuthenticated || this.props.public)
              ) {
                return (
                  <ErrorBoundary key="qraProfile">
                    <QRAProfileContainer />
                  </ErrorBoundary>
                );
              } else return null;
            }}
          />
          <Route
            exact
            path="/:qra/bio"
            location={{
              pathname: '/:qra/bio',
              state: { from: this.props.location.pathname }
            }}
            component={() => {
              if (
                !this.props.authenticating &&
                (this.props.isAuthenticated || this.props.public)
              ) {
                return (
                  <ErrorBoundary key="qraProfileBio">
                    <QRAProfileContainer tab="BIO" />
                  </ErrorBoundary>
                );
              } else return null;
            }}
          />
          <Route
            exact
            path="/:qra/info"
            location={{
              pathname: '/:qra/info',
              state: { from: this.props.location.pathname }
            }}
            component={() => {
              if (
                !this.props.authenticating &&
                (this.props.isAuthenticated || this.props.public)
              ) {
                return (
                  <ErrorBoundary key="qraProfileInfo">
                    <QRAProfileContainer tab="INFO" />{' '}
                  </ErrorBoundary>
                );
              } else return null;
            }}
          />

          <Route
            exact
            path="/:qra/following"
            location={{
              pathname: '/:qra/following',
              state: { from: this.props.location.pathname }
            }}
            component={() => {
              if (
                !this.props.authenticating &&
                (this.props.isAuthenticated || this.props.public)
              ) {
                return (
                  <ErrorBoundary key="qraProfileFollowing">
                    <QRAProfileContainer tab="FOLLOWING" />{' '}
                  </ErrorBoundary>
                );
              } else return null;
            }}
          />

          <Route
            exact
            path="/qso/:idqso"
            location={{
              pathname: '/qso/:idqso',
              state: { from: this.props.location.pathname }
            }}
            component={() => {
              if (
                !this.props.authenticating &&
                (this.props.isAuthenticated || this.props.public)
              ) {
                return (
                  <ErrorBoundary key="qsoDetail">
                    <QSODetail />
                  </ErrorBoundary>
                );
              } else return null;
            }}
          />
        </Switch>
      </Suspense>
    );
  }
}
App.propTypes = {
  actions: PropTypes.shape({
    doStartingLogin: PropTypes.func,
    doLogout: PropTypes.func,
    doLogin: PropTypes.func,
    doFetchUserInfo: PropTypes.func,
    doSetPublicSession: PropTypes.func
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    data: PropTypes.shape({ newPasswordRequired: PropTypes.bool })
  }),
  authenticating: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  public: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      state: PropTypes.shape({})
    }).isRequired
  }).isRequired
};
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
  )(withTranslation()(App))
);
