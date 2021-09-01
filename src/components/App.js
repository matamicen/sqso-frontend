import Auth from '@aws-amplify/auth';
import Amplify from '@aws-amplify/core';
import * as Sentry from '@sentry/browser';
import PropTypes from 'prop-types';
import React, { Component, lazy, Suspense, useCallback } from 'react';
import { isIOS, isMobile } from 'react-device-detect';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Image } from 'semantic-ui-react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import * as Actions from '../actions';
import AwsExports from '../aws-exports';
import './index.css';
import i18n from 'i18next';




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
const SignUp = lazy(() => import('./Auth/SignUpDownload'));
const Home = lazy(() => import('./Home/Home'));
const FieldDaysFeed = lazy(() => import('./Home/FieldDaysFeed'));

// if (process.env.NODE_ENV !== 'production') {     const {whyDidYouUpdate} =
// require('why-did-you-update')     whyDidYouUpdate(React)   }



Amplify.configure(AwsExports);

class App extends Component {
  constructor() {
    super();
    this.state = {
      mobileSession: null,
      showjpg: true
    };
  }
  async componentDidMount() {
    
    
    let query = new URLSearchParams(this.props.location.search);

    if (isMobile) {
      if (query.get('embedded')) this.props.actions.doSetEmbedded();

      window.addEventListener('newURLfromWebView', event => {
        this.props.actions.doSetEmbedded();
      });
      if (isIOS) {
        window.WebViewBridge = {
          onMessage: this._onMessage.bind(this)
        };
        const event = new Event('WebViewBridge');
        window.dispatchEvent(event);
        // this._postMessage({ helloFromWebPage: true });
      } else {
        document.addEventListener('message', event =>
          this.loginFromAndroid(event)
        );

        // const event = new Event('WebViewBridge');
        // document.dispatchEvent(event);
      }
    }
    // this.login();
  }
  async _onMessage(data) {
    let token;

    let mobileSession = JSON.parse(data);
    this.props.actions.doSetEmbedded();
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
        this.props.actions.doFollowFetch();
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
          if (process.env.REACT_APP_STAGE === 'production')
            window.gtag('event', 'userLogin_WEBPRD', {
              event_category: 'User',
              event_label: 'login',
              userQRA: user.signInUserSession.idToken.payload['custom:callsign']
            });
        }
      }
    }
  }
  componentWillUnmount() {
    if (!isIOS) document.removeEventListener('message', () => {});
  }
  async login() {
    this.props.actions.doStartingLogin();
    this.props.actions.doFollowFetch();
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
    
    this.props.actions.doSetEmbedded();
    let token;

    let mobileSession = JSON.parse(event.data);

    this.setState({ mobileSession: mobileSession });
    if (mobileSession.userlogin) {
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
          this.props.actions.doFollowFetch();
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
            if (process.env.REACT_APP_STAGE === 'production')
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
 
    var userLang = navigator.language || navigator.userLanguage; 
    
    

    return (
      <Suspense fallback={<div>{t('global.loading')}</div>}>
        <Switch>
         {/* <Route
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
          /> */}
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
          </Switch>
        {/* <Switch>
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
          <Route exact path="/fielddays" component={FieldDaysFeed} />
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
            path="/explore"
            location={{
              pathname: '/explore',
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
        </Switch> */}
        <div class='center0'> 
        <img src={require('./SuperQSOHoriz.jpg')} 
        class='center'
        />
        {/* <div><p>{userLang.substring(0, 2)}</p></div> */}
        {/* <div><p>{userLang.substring(0, 2)}</p></div> */}
       
            <div class="but">
              {userLang.substring(0, 2) === 'es' ?
         
          this.state.showjpg ?
        
        //   <button
        //   type="button"
        //   class="but"

        //   onClick={() => this.setState({ showjpg: false })}    
        // >
              <img src={require('./superQSOWEB_ES.jpg')}  onClick={() => this.setState({ showjpg: false })} />
          // </button>
      
          :
      
              <video
              id="my-video"
              // className="video-js"
              controls
              preload="metadata"
              responsive="true"
               width='300vw'
               autoPlay={true}
              // height={(props.media.height * width) / props.media.width}
              // poster={props.media.videoPreview}
            >
              <source src='https://d1dwfud4bi54v7.cloudfront.net/Intro_ES.mp4' type="video/mp4" />
              </video>
    
          
          
         
            :

            userLang.substring(0, 2) === 'ja' ?
            this.state.showjpg ?
        
          //   <button
          //   type="button"
          //   class="but"
          //   onClick={() => this.setState({ showjpg: false })}    
          // >
                <img src={require('./superQSOWEB_JP.jpg')} onClick={() => this.setState({ showjpg: false })} />
            // </button>
            :
              <video
              id="my-video"
              // className="video-js"
              controls
              preload="metadata"
              responsive="true"
               width='300vw'
               autoPlay={true}
              // height={(props.media.height * width) / props.media.width}
              // poster={props.media.videoPreview}
            >
              <source src='https://d1dwfud4bi54v7.cloudfront.net/Intro_JP.mp4' type="video/mp4" />
              </video>
              :
              this.state.showjpg ?
        
            //   <button
            //    type="butios"
             
            //   onClick={() => this.setState({ showjpg: false })}    
            // >
                  <img src={require('./superQSOWEB_EN.jpg')} onClick={() => this.setState({ showjpg: false })} />
              //  </button>
              :
              <video
              id="my-video"
              // className="video-js"
              controls
              preload="metadata"
              responsive="true"
              width='300vw'
              autoPlay={true}
              //  width='100vw'
              // height={(props.media.height * width) / props.media.width}
              // poster={props.media.videoPreview}
            >
              <source src='https://d1dwfud4bi54v7.cloudfront.net/Intro_EN.mp4' type="video/mp4" />
              </video>

             }

            </div>
         
         
          
      
          </div>
          {/* <div className='rows'> */}
          <div class="texto">
          {userLang.substring(0, 2) === 'es' ?
            <p class="tx1">Descargalo de tu tienda de aplicaciones:</p>
            :
            userLang.substring(0, 2) === 'ja' ?
            <p class="tx1">あなたの店からダウンロードしてください：</p>
            :
            <p class="tx1">Download from your store:</p>
          }

          </div>
          <div class="contenedor">
         
         
            
             
              
            <div class="it1">
            <a href="https://apps.apple.com/ar/app/superqso/id1478967853">
            <img src={require('./downApp.png')}  height="40vw" />
            </a>
              </div>
              <div class="it2">
                <a href="https://play.google.com/store/apps/details?id=com.sqsomobile">
                 <img src={require('./downGoogle.png')}  height="40vw"/>
               </a>
              </div>
              {/* <div class="item3">
            <img src={require('./downAppStore.png')} class='center'  width='20%'/>
              </div>
              <div class="item4">
            <img src={require('./downAppStore.png')} class='center'  width='20%'/>
              </div> */}
          </div>
              {/* </div> */}

              <div class="contenedor">
         
         
            
             
              
         <div class="it1">
         <a href="https://www.superqso.com/terms">
         {/* <img src={require('./downApp.png')}  height="40vw" /> */} Terms and Conditions
         </a>
           </div>
           <div class="it2">
             <a href="https://www.superqso.com/privacy">
              {/* <img src={require('./downGoogle.png')}  height="40vw"/> */}
              Privacy Policy
            </a>
           </div>
           {/* <div class="item3">
         <img src={require('./downAppStore.png')} class='center'  width='20%'/>
           </div>
           <div class="item4">
         <img src={require('./downAppStore.png')} class='center'  width='20%'/>
           </div> */}
       </div>

             
   
    
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
