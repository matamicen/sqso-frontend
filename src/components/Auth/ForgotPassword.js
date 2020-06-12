import Auth from '@aws-amplify/auth';
import * as Sentry from '@sentry/browser';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement';
import Ad from '../Ad/Ad';
import AppNavigation from '../Home/AppNavigation';
class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      showModal: false,
      showMessageModal: false,
      password: '',

      passwordConfirm: null,
      email: '',
      code: '',
      emailSent: false,
      userConfirmed: false,
      cognitoUser: '',
      forgotPasswordError: '',
      confirmError: '',
      formErrors: {
        email: '',
        password: '',
        passwordConfirm: ''
      }
    };
  }

  handleCodeChange(e) {
    this.setState({ code: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handlePasswordConfirmChange(e) {
    this.setState({ passwordConfirm: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleEmailSent(result) {
    // this.setState({cognitoUser: result.user.username});
    this.setState({ emailSent: true });
    this.setState({ showModal: true });
  }

  handleUserConfirmed(result) {
    this.setState({ userConfirmed: true });
  }

  handleChangePasswordButton(e) {
    const email = this.state.email.trim();

    this.validateEmail();

    if (!this.state.formErrors.email) {
      Auth.forgotPassword(email)
        .then(data => {
          this.handleEmailSent(data);
          this.setState({ forgotPasswordError: null });
        })
        .catch(err => {
          this.setState({ forgotPasswordError: err.message });
          if (process.env.NODE_ENV !== 'production') {
            console.log(err);
          } else {
            Sentry.configureScope(function(scope) {
              scope.setExtra('ENV', process.env.NODE_ENV);
            });
            Sentry.captureException(err);
          }
        });
    }
  }

  validateFields() {
    const fieldValidationErrors = this.state.formErrors;

    // password

    const passwordValid = this.state.password.length >= 6;
    fieldValidationErrors.password = passwordValid
      ? ''
      : 'Password is too short';

    fieldValidationErrors.passwordConfirm =
      this.state.password === this.state.passwordConfirm
        ? ''
        : 'Password and Confirmation are not the same';

    this.setState({ formErrors: fieldValidationErrors });
  }

  validateEmail() {
    const fieldValidationErrors = this.state.formErrors;

    // email
    const emailValid = this.state.email.match(
      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    );
    fieldValidationErrors.email = emailValid ? '' : 'Email is not Valid';

    this.setState({ formErrors: fieldValidationErrors });
  }

  handleConfirmPasswordButton(e) {
    this.setState({ confirmError: null });
    const code = this.state.code.trim();

    const password = this.state.password.trim();
    this.validateFields();

    if (
      !this.state.formErrors.password &&
      !this.state.formErrors.passwordConfirm &&
      !this.state.formErrors.email
    ) {
      Auth.forgotPasswordSubmit(
        DOMPurify.sanitize(this.state.email),
        DOMPurify.sanitize(code),
        DOMPurify.sanitize(password),
        {
          // Optional. Force user confirmation irrespective of existing alias. By default
          // set to True.
          // forceAliasCreation: true
        }
      )
        .then(data => {
          this.handleUserConfirmed(data);
          this.setState({ confirmError: null, showMessageModal: true });
        })
        .catch(err => {
          this.setState({ confirmError: err.message });
          if (process.env.NODE_ENV !== 'production') {
            console.log(err);
          } else {
            Sentry.configureScope(function(scope) {
              scope.setExtra('ENV', process.env.NODE_ENV);
            });
            Sentry.captureException(err);
          }
        });
    }
  }

  close() {
    this.setState({ showMessageModal: false });
    this.props.history.push('/login');
  }

  handleOnOpenModal() {
    this.setState({ showModal: true });
  }

  handleOnCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const {t} = this.props;
    // if (this.state.userConfirmed) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: '/login',
    //         state: { from: this.props.location.pathname }
    //       }}
    //     />
    //   )
    // }
    return (
      <div className="global-container">
        <div className="site-header">
          <AppNavigation />
        </div>
        <div className="site-left">
          <Advertisement className="left" unit="wide skyscraper">
            <Ad
              adslot="/21799560237/ForgotPassword/left"
              width={160}
              height={600}
            />
          </Advertisement>
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
                Recover Account
              </Header>
              <Form size="large">
                <Segment stacked>
                  <Form.Field>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="email"
                      error={!!this.state.formErrors.email}
                      name="email"
                      onChange={this.handleEmailChange.bind(this)}
                      // style={{
                      //   textTransform: "uppercase"
                      // }}
                    />{' '}
                    {this.state.formErrors.email && (
                      <Message negative content={this.state.formErrors.email} />
                    )}
                  </Form.Field>

                  {this.state.forgotPasswordError && (
                    <Message
                      negative
                      content={this.state.forgotPasswordError}
                    />
                  )}

                  <Modal
                    // basic
                    closeIcon
                    open={this.state.showModal}
                    onClose={this.handleOnCloseModal.bind(this)}
                    trigger={
                      <Button
                        content="Submit"
                        onClick={() => this.handleChangePasswordButton()}
                      />
                    }
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
                              Recover Account
                            </Header>
                            <Form>
                              <Form.Field>
                                <Form.Input
                                  fluid
                                  placeholder="Confirmation Code"
                                  name="Code"
                                  onChange={this.handleCodeChange.bind(this)}
                                />
                              </Form.Field>
                              <Form.Field>
                                <Form.Input
                                  fluid
                                  icon="lock"
                                  iconPosition="left"
                                  type="password"
                                  error={!!this.state.formErrors.password}
                                  placeholder="Password"
                                  name="password"
                                  onChange={this.handlePasswordChange.bind(
                                    this
                                  )}
                                />{' '}
                                {this.state.formErrors.password && (
                                  <Message
                                    negative
                                    content={this.state.formErrors.password}
                                  />
                                )}
                              </Form.Field>
                              <Form.Field>
                                <Form.Input
                                  fluid
                                  icon="lock"
                                  iconPosition="left"
                                  type="password"
                                  error={
                                    !!this.state.formErrors.passwordConfirm
                                  }
                                  placeholder="Password Confirmation"
                                  name="passwordConfirm"
                                  onChange={this.handlePasswordConfirmChange.bind(
                                    this
                                  )}
                                />{' '}
                                {this.state.formErrors.passwordConfirm && (
                                  <Message
                                    negative
                                    content={
                                      this.state.formErrors.passwordConfirm
                                    }
                                  />
                                )}
                              </Form.Field>
                              {this.state.forgotPasswordError && (
                                <Message
                                  negative
                                  content={this.state.forgotPasswordError}
                                />
                              )}
                              {this.state.confirmError && (
                                <Message
                                  negative
                                  content={this.state.confirmError}
                                />
                              )}
                              <Form.Button
                                content="Confirm Password"
                                onClick={() =>
                                  this.handleConfirmPasswordButton()
                                }
                              />
                            </Form>
                          </Grid.Column>
                        </Grid>
                      </Modal.Description>
                    </Modal.Content>
                  </Modal>
                  <Modal
                    open={this.state.showMessageModal}
                    onClose={() => this.close()}
                    header="Password Changed"
                    content="Your password has been changed. Please login again!"
                    actions={[
                      {
                        key: 'done',
                        content: 'Ok',
                        positive: true
                      }
                    ]}
                  />
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>

        <div className="site-right">
          <Advertisement unit="wide skyscraper">
            <Ad
              adslot="/21799560237/ForgotPassword/left"
              width={160}
              height={600}
            />
          </Advertisement>
        </div>
      </div>
    );
  }
}
ForgotPassword.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default withRouter(withTranslation()(ForgotPassword));
