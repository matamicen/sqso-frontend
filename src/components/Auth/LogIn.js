import Amplify from '@aws-amplify/core';
import * as Sentry from '@sentry/browser';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import * as Actions from '../../actions';
import Ad from '../Ad/Ad';
import AppNavigation from '../Home/AppNavigation';
import './style.css';
const Auth = Amplify.Auth;
class LogIn extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dimmerActive: false,
      dimmerLoginActive: false,
      dimmerValCodeActive: false,

      showModal: false,
      code: '',
      password: '',
      email: '',
      error: null,
      loginError: false,
      showModalMessage: false,
      confirmError: ''
    };
    // if (this.props.isAuthenticated && !this.props.authenticating) {
    //   alert("You can't login if you are logged in!");
    //   this.props.history.goBack();
    // }
  }
  handleAcceptMessageModal() {
    // this.handleOnClickLogin();
    this.setState({ showModalMessage: false });
    this.props.history.push('/login');
  }
  handleOnClickLogin() {
    const { t } = this.props;
    this.setState({ dimmerActive: true });
    if (!this.state.email || !this.state.password) {
      this.setState({
        loginError: { message: t('auth.enterMailPassword') }
      });
    } else this.login();
  }

  async login() {
    const { t } = this.props;
    let token;
    this.setState({ dimmerActive: true });

    const user = await Auth.signIn(
      this.state.email.toLowerCase().trim(),
      this.state.password
    ).catch(err => {
      switch (err.code) {
        case 'NotAuthorizedException':
          console.log(err);
          if (err.message === 'Incorrect username or password.')
            this.setState({
              loginError: {
                code: err.code,
                message: t('auth.incorrectUserPass')
              }
            });
          else if (err.message === 'User is disabled.')
            this.setState({
              loginError: { code: err.code, message: t('auth.userDisabled') }
            });
          else
            this.setState({
              loginError: err
            });
          break;
        case 'UserNotConfirmedException':
          this.setState({
            loginError: { code: err.code, message: t('auth.userNotConfirmed') }
          });
          break;
        default:
          this.setState({ loginError: err });
          break;
      }
      this.setState({ dimmerActive: false });
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
        if (!credentials.data) {
          await Auth.signOut();

          this.props.actions.doSetPublicSession();
        } else {
          await this.props.actions.doLogin(
            token,
            user.signInUserSession.idToken.payload['custom:callsign'],
            credentials.data.IdentityId
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
          if (process.env.NODE_ENV !== 'production')
            window.gtag('event', 'userLogin_WEBDEV', {
              event_category: 'User',
              event_label: 'login',
              userQRA: user.signInUserSession.idToken.payload['custom:callsign']
            });
          else
            window.gtag('event', 'userLogin_WEBPRD', {
              event_category: 'User',
              event_label: 'login',
              userQRA: user.signInUserSession.idToken.payload['custom:callsign']
            });

          const { location } = this.props;

          if (
            location.state &&
            location.state.from &&
            location.state.from !== '/'
          ) {
            this.props.history.push(location.state.from);
          } else {
            this.props.history.push('/');
          }
        }
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isAuthenticated || state.loginError) {
      return { dimmerActive: false };
    } else if (props.authenticating && !state.loginError) {
      return { dimmerActive: true };
    }
    // Return null to indicate no change to state.
    return null;
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  async handleResendCode() {
    const { t } = this.props;
    this.setState({ confirmError: '' });
    await Auth.resendSignUp(this.state.email.trim())
      .then(() => {
        this.setState({
          loginError: {
            code: 'codeResent',
            message: t('auth.codeResent') + this.state.email.trim()
          },
          confirmError: {
            code: 'codeResent',
            message: t('auth.codeResent') + this.state.email.trim()
          },
          showModal: true
        });
      })
      .catch(err => {
        if (process.env.NODE_ENV !== 'production') {
          console.log(err);
        } else {
          Sentry.configureScope(function(scope) {
            scope.setExtra('ENV', process.env.NODE_ENV);
          });
          Sentry.captureException(err);
        }
        this.setState({ confirmError: err });
      });
  }

  handleOnConfirm(e) {
    const code = this.state.code.trim();
    this.setState({ dimmerValCodeActive: true });
    Auth.confirmSignUp(this.state.email.trim(), code, {
      // Optional. Force user confirmation irrespective of existing alias. By default
      // set to True.
      forceAliasCreation: true
    })
      .then(data => {
        this.setState({
          dimmerValCodeActive: false,
          dimmerLoginActive: true,
          showModalMessage: true
        });
        if (process.env.NODE_ENV !== 'production')
          window.gtag('event', 'confirmCode_WEBDEV', {
            event_category: 'User',
            event_label: 'confirmCode'
          });
        else
          window.gtag('event', 'confirmCode_WEBPRD', {
            event_category: 'User',
            event_label: 'confirmCode'
          });
      })
      .catch(err => {
        this.setState({ dimmerValCodeActive: false });
        this.setState({ confirmError: err });
      });
  }

  handleCodeChange(e) {
    this.setState({ code: e.target.value });
  }

  render() {
    const { location, t } = this.props;

    if (this.props.isAuthenticated && !this.props.authenticating) {
      // alert("Please Logout before login again!");
      if (
        location.state &&
        location.state.from &&
        location.state.from !== '/'
      ) {
        return <Redirect to={'/' + location.state.from} />;
      } else {
        return <Redirect to={'/'} />;
      }
    }

    return (
      <Fragment>
        <Dimmer active={this.state.dimmerLoginActive} page>
          <Loader>{t('auth.loadingUser')}</Loader>
        </Dimmer>
        <Dimmer active={this.state.dimmerActive} page>
          <Loader>{t('auth.validatingUser')}</Loader>
        </Dimmer>
        <Dimmer active={this.state.dimmerValCodeActive} page>
          <Loader>{t('auth.validatingCode')}</Loader>
        </Dimmer>

        <div className="global-container">
          <div className="site-header">
            <AppNavigation />
          </div>
          <div className="site-left">
            <Ad adslot="/21799560237/Login/left" width={160} height={600} />
          </div>

          <div className="site-main">
            <Grid
              textAlign="center"
              style={{
                height: '100%'
              }}
              verticalAlign="middle"
            >
              <Grid.Column
                style={{
                  maxWidth: 450
                }}
              >
                <Header as="h2" color="teal" textAlign="center">
                  {t('auth.loginHeader')}
                </Header>
                <Form size="large">
                  <Segment stacked>
                    <Form.Field>
                      <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder={t('auth.labelEmail')}
                        error={!!this.state.loginError}
                        name="email"
                        value={this.state.email}
                        onChange={this.handleEmailChange.bind(this)}
                        style={{
                          textTransform: 'uppercase'
                        }}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        type="password"
                        error={!!this.state.loginError}
                        placeholder={t('auth.labelPassword')}
                        name="password"
                        onChange={this.handlePasswordChange.bind(this)}
                      />
                    </Form.Field>

                    {this.state.loginError && (
                      <Message
                        negative
                        content={this.state.loginError.message}
                      />
                    )}
                    {this.state.loginError.code ===
                      'UserNotConfirmedException' && (
                      <div>
                        <Button
                          content={t('auth.resendCode')}
                          onClick={() => this.handleResendCode()}
                        />
                        <Button
                          content={t('auth.confirmCode')}
                          onClick={() => this.setState({ showModal: true })}
                        />
                      </div>
                    )}
                    {this.state.loginError.code !==
                      'UserNotConfirmedException' && (
                      <Button
                        content={t('auth.login')}
                        onClick={() => this.handleOnClickLogin()}
                      />
                    )}
                  </Segment>
                </Form>
                <Message>
                  {t('auth.newToUs')}
                  <Link
                    to={{
                      pathname: '/signup',
                      state: { from: this.props.location.pathname }
                    }}
                  >
                    {' '}
                    {t('navBar.signUp')}
                  </Link>
                </Message>
                <Message>
                  <Link to="/forgot"> {t('auth.forgotPassword')}</Link>
                </Message>
              </Grid.Column>
            </Grid>
          </div>

          <div className="site-right">
            <Ad adslot="/21799560237/Login/left" width={160} height={600} />
          </div>
        </div>
        <Modal size="small" open={this.state.showModalMessage}>
          <Header content={t('forms.welcomeToSuperQSO')} />
          <Modal.Content>
            <p>{t('forms.betaPhase')}</p>
            {/* <p>{t('forms.trialPeriod')}</p> */}
            <p style={{ color: '#243665' }}>
              <b>{t('forms.sendLicence')}</b>
            </p>
            <p>
              <b>{t('forms.downloadAPP')}</b>
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="facebook"
              onClick={() => {
                this.setState({
                  modalOpen: false,
                  videoAlreadyDisplayed: true
                });
                localStorage['alreadyVisited'] = true;
                this.props.history.push('/download');
              }}
            >
              {t('whatIsSuperQSO.downloadApp')}
            </Button>
            <Button
              onClick={() => {
                this.setState({
                  modalOpen: false,
                  videoAlreadyDisplayed: true
                });
                localStorage['alreadyVisited'] = true;
                this.props.history.push('/tutorials');
              }}
            >
              {t('whatIsSuperQSO.tutorial')}
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="OK"
              onClick={() => this.handleAcceptMessageModal()}
            />
          </Modal.Actions>
        </Modal>
        <Modal
          closeOnDimmerClick={false}
          closeIcon
          open={this.state.showModal}
          onClose={() => this.setState({ showModal: false })}
        >
          <Modal.Content>
            <Modal.Description>
              <Grid
                textAlign="center"
                style={{
                  height: '100%'
                }}
                verticalAlign="middle"
              >
                <Grid.Column
                  style={{
                    maxWidth: 450
                  }}
                >
                  <Header as="h2" color="teal" textAlign="center">
                    {t('auth.confirmationCode')}
                  </Header>
                  <p>{t('forms.verifyEmailInbox')}</p>
                  <Form>
                    <Form.Field>
                      <Form.Input
                        fluid
                        placeholder={t('auth.confirmationCode')}
                        name="Code"
                        onChange={this.handleCodeChange.bind(this)}
                      />
                    </Form.Field>

                    {this.state.confirmError && (
                      <Message
                        negative
                        content={this.state.confirmError.message}
                      />
                    )}
                    <div>
                      <Button
                        content={t('auth.resendCode')}
                        onClick={() => this.handleResendCode()}
                      />
                      <Button
                        content={t('auth.confirmCode')}
                        onClick={() => this.handleOnConfirm()}
                      />
                    </div>
                  </Form>
                </Grid.Column>
              </Grid>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </Fragment>
    );
  }
}
LogIn.propTypes = {
  actions: PropTypes.shape({
    doStartingLogin: PropTypes.func,
    doLogout: PropTypes.func,
    doLogin: PropTypes.func,
    doFetchUserInfo: PropTypes.func,
    doSetPublicSession: PropTypes.func
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.string
  }),
  authenticating: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  public: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      state: PropTypes.shape({})
      // pathname: PropTypes.string,
      // search: PropTypes.string
    }).isRequired
  }).isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.userData.isAuthenticated,
  authenticating: state.userData.authenticating
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(LogIn))
);
