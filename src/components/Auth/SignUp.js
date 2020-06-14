/* eslint-disable react/prop-types */
import Auth from '@aws-amplify/auth';
import * as Sentry from '@sentry/browser';
import { Formik } from 'formik';
import moment from 'moment';
import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer';
import * as Yup from 'yup';
import * as Actions from '../../actions';
import SignUpPresentation from './SignUpPresentation';
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimmerActive: false,
      dimmerLoginActive: false,
      dimmerValCodeActive: false,
      qra: '',
      password: '',
      email: '',
      birthDate: '',
      firstName: '',
      lastName: '',
      country: '',
      code: '',
      showModal: false,
      // showModalTC: false,
      showModalMessage: false,
      userCreated: false,
      userConfirmed: false,
      cognitoUser: '',
      signUpError: '',
      confirmError: '',
      error: null
    };
  }

  handleAcceptMessageModal() {
    this.login();
    this.setState({ showModalMessage: false });
  }

  // handleAcceptTC() {
  //   this.signUp();
  //   this.setState({ showModalTC: false });
  // }
  signUp(values) {
    const {  t} = this.props;
    const email = this.state.email.toLowerCase();
    const password = this.state.password;
    const qra = this.state.qra.toUpperCase();
    const birthDate = this.state.birthDate;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const country = this.state.country;

    this.setState({ dimmerActive: true });

    Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email, // optional
        birthdate: birthDate, // optional - E.164 number convention
        'custom:callsign': qra,
        'custom:country': country,
        'custom:firstName': firstName,
        'custom:lastName': lastName
        // other custom attributes
      },
      validationData: [] // optional
    })
      .then(data => {
        this.setState({
          dimmerActive: false,
          cognitoUser: data.user.username,
          userCreated: true,
          showModal: true
        });
        window.gtag('config', 'G-H8G28LYKBY', {
          custom_map: { dimension1: 'userQRA' }
        });
        if (process.env.NODE_ENV !== 'production')
          window.gtag('event', 'userSignUp_WEBDEV', {
            event_category: 'User',
            event_label: 'signUp',
            userQRA: qra
          });
        else
          window.gtag('event', 'userSignUp_WEBPRD', {
            event_category: 'User',
            event_label: 'signUP',
            userQRA: qra
          });
      })
      .catch(err => {
        if (err.code === 'UserLambdaValidationException') {
          this.setState({
            dimmerActive: false,
            signUpError:t('auth.callsignAlreadyRegistered')
          });
        } else if (err.code === 'UsernameExistsException') {
          this.setState({
            dimmerActive: false,
            signUpError: t('auth.callsignAlreadyRegistered')          });
        } else if (
          err.message === 'SignUp is not permitted for this user pool'
        ) {
          this.setState({
            dimmerActive: false,
            signUpError: t('auth.signupNotAvailable')});
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.log(err);
          } else
            Sentry.configureScope(function(scope) {
              scope.setExtra('ENV', process.env.NODE_ENV);
            });
          Sentry.captureException(err);
          this.setState({ dimmerActive: false, signUpError: err.message });
        }
      });
  }

  handleCodeChange(e) {
    this.setState({ code: e.target.value });
  }

  async handleResendCode() {
    await Auth.resendSignUp(this.state.email.toLowerCase())
      .then(() => {
        if (process.env.NODE_ENV !== 'production')
          window.gtag('event', 'resendCode_WEBDEV', {
            event_category: 'User',
            event_label: 'resendCode'
          });
        else
          window.gtag('event', 'resendCode_WEBPRD', {
            event_category: 'User',
            event_label: 'resendCode'
          });
      })
      .catch(err => {
        if (process.env.NODE_ENV !== 'production') {
          console.log(err);
        } else
          Sentry.configureScope(function(scope) {
            scope.setExtra('ENV', process.env.NODE_ENV);
          });
        Sentry.captureException(err);
        this.setState({ confirmError: err });
      });
  }

  handleOnConfirm() {
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
        // ReactG.event({ category: "QRA", action: "confirmCode" });
      })
      .catch(err => {
        if (process.env.NODE_ENV !== 'production') {
          console.log(err);
        } else
          Sentry.configureScope(function(scope) {
            scope.setExtra('ENV', process.env.NODE_ENV);
          });
        Sentry.captureException(err);
        this.setState({ dimmerValCodeActive: false, confirmError: err });
      });
  }

  async login() {
    let token;
    this.setState({ active: true });

    const user = await Auth.signIn(this.state.email, this.state.password).catch(
      err => {
        console.log(err);
      }
    );

    if (user) {
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
        this.setState({ dimmerLoginActive: false });
        // ReactG.event({ category: "QRA", action: "login" });
        this.props.history.push('/follow');
      }
    }
  }

  render() {
    const { location , t} = this.props;

    if (this.props.isAuthenticated && !this.props.authenticating) {
      if (location.state && location.state.from) {
        return <Redirect to={'/' + location.state.from} />;
      } else {
        return <Redirect to={'/'} />;
      }
    }
    const values = {
      email: '',
      emailConfirm: '',
      password: '',
      passwordConfirm: '',
      qra: '',
      birthDate: '',
      firstName: '',
      lastName: '',
      country: '',
      recaptcha: '',
      terms: ''
    };
    const validationSchema = Yup.object({
      email: Yup.string(t('auth.enterEmail'))
        .email(t('auth.enterValidEmail'))
        .required(t('auth.emailRequired')),
      emailConfirm: Yup.string()
        .required()
        .oneOf([Yup.ref('email'), null], t('auth.emailsDontMatch')),
      password: Yup.string(t('auth.passwordRequired'))
        .min(6, t('auth.passwordTooShort'))
        .required(t('auth.passwordRequired')),
      passwordConfirm: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], t('auth.passwordDontMatch')),
      qra: Yup.string(t('auth.callsignRequired'))
        .required(t('auth.callsignRequired'))
        .matches(/^[a-zA-Z0-9]+$/, t('auth.callsignSpecialChars'))
        .min(3, t('auth.callsignShort'))
        .max(10, t('auth.callsignLong')),
      birthDate: Yup.date()
      .required(t('auth.birthDateRequired'))
        .min(new Date(1900, 0, 1))
        .max(new Date())
        .test('birthDate', t('auth.years13Restriction'), value => {
          return moment().diff(moment(value), 'years') >= 13;
        }),
      country: Yup.string().required(),
      firstName: Yup.string().required(t('qso.firstNameRequired')),
      lastName: Yup.string().required(t('auth.lastNameRequired')),
      recaptcha: Yup.string().required(t('auth.confirmRecaptcha')),
      terms: Yup.bool()
        .required(t('auth.acceptPrivacy'))
        .oneOf([true], t('auth.acceptPrivacy'))
    });
    return (
      <Fragment>
        <Dimmer active={this.state.dimmerLoginActive} page>
          <Loader>{t('auth..loadingUser')}</Loader>
        </Dimmer>
        <Dimmer active={this.state.dimmerActive} page>
          <Loader>{t('auth.validatingUser')}</Loader>
        </Dimmer>
        <Dimmer active={this.state.dimmerValCodeActive} page>
          <Loader>{t('auth.validatingCode')}</Loader>
        </Dimmer>
        <Formik
          render={props => (
            <SignUpPresentation
              {...props}
              signUpError={this.state.signUpError}
              showModal={this.state.showModal}
              // showModalTC={this.state.showModalTC}
              showModalMessage={this.state.showModalMessage}
              handleOnCloseModal={() => {
                this.setState({ showModal: false });

              }}
              // handleOnAcceptModalTC={() => this.handleAcceptTC()}
              handleAcceptMessageModal={() => this.handleAcceptMessageModal()}
              // handleOnCancelModalTC={() =>
              //   this.setState({ showModalTC: false })
              // }
              handleOnConfirm={() => this.handleOnConfirm()}
              handleCodeChange={this.handleCodeChange.bind(this)}
              handleResendCode={() => this.handleResendCode()}
              confirmError={this.state.confirmError.message}
            />
          )}
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={values => {
            this.setState({
              qra: values.qra.trim().toUpperCase(),
              password: values.password.trim(),
              email: values.email.trim(),
              birthDate: values.birthDate.trim(),
              firstName: values.firstName.trim(),
              lastName: values.lastName.trim(),
              country: values.country.trim()
              // showModalTC: true
            });
            this.signUp();
          }}
        />
      </Fragment>
    );
  }
}
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
  )
  (withTranslation()(SignUp))
);
