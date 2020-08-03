import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import * as Sentry from '@sentry/browser';
import PropTypes from 'prop-types';
import React, { Component, lazy, Suspense } from 'react';
import { isIOS, isMobile } from 'react-device-detect';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import * as Actions from '../actions';
import AwsExports from '../aws-exports';
// const Tutorials = lazy(() => import('./help/tutorials'));
// import QRAProfileContainer from './Profile/QRAProfileContainer';

const ChangePassword = lazy(() => import('./Auth/ChangePassword'));
const ForgotPassword = lazy(() => import('./Auth/ForgotPassword'));
const ContactForm = lazy(() => import('./contactForm'));
const ErrorBoundary = lazy(() => import('./ErrorBoundary'));
const Follow = lazy(() => import('./follow'));
const Download = lazy(() => import('./help/download'));
const FAQ = lazy(() => import('./help/faq'));
const PrivacyPolicy = lazy(() => import('./help/privacyPolicy'));
const TermsOfService = lazy(() => import('./help/termsOfServcice'));
const QRAProfileContainer = lazy(() => import('./Profile/QRAProfileContainer'));
const Notifications = lazy(() => import('./Notifications/Notifications'));
const QSODetail = lazy(() => import('./QSODetail'));
const LogIn = lazy(() => import('./Auth/LogIn'));
const SignUp = lazy(() => import('./Auth/SignUp'));
const Home = lazy(() => import('./Home/Home'));

// if (process.env.NODE_ENV !== 'production') {     const {whyDidYouUpdate} =
// require('why-did-you-update')     whyDidYouUpdate(React)   }

Amplify.configure(AwsExports);

class App extends Component {
  constructor() {
    super();
    this.state = {
      mobileSession: null
    };
  }
  async componentDidMount() {
    if (isMobile) {
      if (isIOS) {
        window.WebViewBridge = {
          onMessage: this._onMessage.bind(this)
        };
        const event = new Event('WebViewBridge');
        window.dispatchEvent(event);
        // this._postMessage({ helloFromWebPage: true });
      } else
        document.addEventListener('message', event =>
          this.loginFromAndroid(event)
        );
    }
    this.login();
  }
  async _onMessage(data) {
    let token;

    let mobileSession = JSON.parse(data);

    if (!mobileSession.userlogin) {
      try {
        const currentSession = await Auth.currentSession();
        const token = currentSession.getIdToken().getJwtToken();

        this.props.actions.refreshToken(token);
        this.props.actions.doFetchUserInfo(this.props.token);
        this.props.actions.doFetchPublicFeed(this.props.currentQRA);
        //   }
        // );
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Unable to refresh Token');
          console.log(error);
        } else {
          Sentry.configureScope(function(scope) {
            scope.setExtra('ENV', process.env.REACT_APP_STAGE);
          });
          Sentry.captureException(error);
        }
      }
    } else {
      const user = await Auth.signIn(
        mobileSession.userlogin.toLowerCase().trim(),
        mobileSession.userpwd
      ).catch(err => {
        console.log(err);
        this.props.actions.doLogout();
      });

      if (user) {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.props.history.push({
            pathname: '/changepassword',
            data: { user: user, newPasswordRequired: true }
          });
        } else {
          await this.props.actions.doStartingLogin();
          token = user.signInUserSession.idToken.jwtToken;
          const credentials = await Auth.currentCredentials();

          if (!credentials.authenticated) {
            await Auth.signOut();

            this.props.actions.doSetPublicSession();
          } else {
            await this.props.actions.doLogin(
              token,
              user.signInUserSession.idToken.payload['custom:callsign'],
              credentials.identityId
            );
            await this.props.actions.doFetchUserInfo(token);
            Sentry.configureScope(scope => {
              scope.setUser({
                qra: user.signInUserSession.idToken.payload['custom:callsign']
              });
            });
            window.gtag('config', 'G-H8G28LYKBY', {
              custom_map: { dimension1: 'userQRA' }
            });
            if (process.env.REACT_APP_STAGE !== 'production')
              window.gtag('event', 'userLogin_WEBDEV', {
                event_category: 'User',
                event_label: 'login',
                userQRA:
                  user.signInUserSession.idToken.payload['custom:callsign']
              });
            else
              window.gtag('event', 'userLogin_WEBPRD', {
                event_category: 'User',
                event_label: 'login',
                userQRA:
                  user.signInUserSession.idToken.payload['custom:callsign']
              });
          }
        }
      }
    }
  }
  componentWillUnmount() {
    if (!isIOS) document.removeEventListener('message', () => {});
  }
  async login() {
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

      if (!credentials.authenticated) {
        await Auth.signOut();

        this.props.actions.doSetPublicSession();
      } else {
        this.props.actions.doLogin(
          session.idToken.jwtToken,
          session.idToken.payload['custom:callsign'].toUpperCase(),
          credentials.identityId
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
  async loginFromAndroid(event) {
    let token;

    let mobileSession = JSON.parse(event.data);
    if (!mobileSession.userlogin) {
      try {
        const currentSession = await Auth.currentSession();
        const token = currentSession.getIdToken().getJwtToken();

        this.props.actions.refreshToken(token);
        this.props.actions.doFetchUserInfo(this.props.token);
        this.props.actions.doFetchPublicFeed(this.props.currentQRA);
        //   }
        // );
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Unable to refresh Token');
          console.log(error);
        } else {
          Sentry.configureScope(function(scope) {
            scope.setExtra('ENV', process.env.REACT_APP_STAGE);
          });
          Sentry.captureException(error);
        }
      }
    } else {
      this.setState({ mobileSession: mobileSession });
      console.log(mobileSession);
      const user = await Auth.signIn(
        mobileSession.userlogin.toLowerCase().trim(),
        mobileSession.userpwd
      ).catch(err => {
        console.log(err);
        this.props.actions.doLogout();
      });

      if (user) {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.props.history.push({
            pathname: '/changepassword',
            data: { user: user, newPasswordRequired: true }
          });
        } else {
          await this.props.actions.doStartingLogin();
          token = user.signInUserSession.idToken.jwtToken;
          const credentials = await Auth.currentCredentials();

          if (!credentials.authenticated) {
            await Auth.signOut();

            this.props.actions.doSetPublicSession();
          } else {
            await this.props.actions.doLogin(
              token,
              user.signInUserSession.idToken.payload['custom:callsign'],
              credentials.identityId
            );
            await this.props.actions.doFetchUserInfo(token);
            Sentry.configureScope(scope => {
              scope.setUser({
                qra: user.signInUserSession.idToken.payload['custom:callsign']
              });
            });
            window.gtag('config', 'G-H8G28LYKBY', {
              custom_map: { dimension1: 'userQRA' }
            });
            if (process.env.REACT_APP_STAGE !== 'production')
              window.gtag('event', 'userLogin_WEBDEV', {
                event_category: 'User',
                event_label: 'login',
                userQRA:
                  user.signInUserSession.idToken.payload['custom:callsign']
              });
            else
              window.gtag('event', 'userLogin_WEBPRD', {
                event_category: 'User',
                event_label: 'login',
                userQRA:
                  user.signInUserSession.idToken.payload['custom:callsign']
              });
          }
        }
      }
    }
  }
  render() {
    const { t } = this.props;
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
          {/* <Route
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
          /> */}
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
