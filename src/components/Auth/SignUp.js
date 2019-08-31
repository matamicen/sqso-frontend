import React, { Fragment } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import SignUpPresentation from "./SignUpPresentation";
import Auth from "@aws-amplify/auth";
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import * as Sentry from "@sentry/browser";
import ReactGA from "react-ga";
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dimmerActive: false,
      dimmerLoginActive: false,
      dimmerValCodeActive: false,
      qra: "",
      password: "",
      email: "",
      birthDate: "",
      firstName: "",
      lastName: "",
      country: "",
      code: "",
      showModal: false,
      showModalTC: false,
      userCreated: false,
      userConfirmed: false,
      cognitoUser: "",
      signUpError: "",
      confirmError: "",
      error: null
    };
  }
  handleAcceptTC() {
    this.signUp();
    this.setState({ showModalTC: false });
  }
  signUp(values) {
    const email = this.state.email;
    const password = this.state.password;
    const qra = this.state.qra;
    const birthDate = this.state.birthDate;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const country = this.state.country;

    this.setState({ dimmerActive: true });

    Auth.signUp({
      username: qra,
      password: password,
      attributes: {
        email: email, // optional
        birthdate: birthDate, // optional - E.164 number convention
        "custom:country": country,
        "custom:firstName": firstName,
        "custom:lastName": lastName
        // other custom attributes
      },
      validationData: [] //optional
    })
      .then(data => {
        this.setState({
          dimmerActive: false,
          cognitoUser: data.user.username,
          userCreated: true,
          showModal: true
        });
        ReactGA.event({ category: "QRA", action: "signUP" });
      })
      .catch(err => {
        this.setState({ dimmerActive: false, signUpError: err.message });
      });
  }
  handleCodeChange(e) {
    this.setState({ code: e.target.value });
  }
  async handleResendCode() {
    await Auth.resendSignUp(this.state.qra.toUpperCase())
      .then(() => {
        ReactGA.event({ category: "QRA", action: "resentCode" });
      })
      .catch(err => {
        if (process.env.NODE_ENV !== "production") {
          console.log(err);
        } else Sentry.captureException(err);
        this.setState({ confirmError: err });
      });
  }
  handleOnConfirm() {
    const code = this.state.code.trim();
    this.setState({ dimmerValCodeActive: true });

    Auth.confirmSignUp(this.state.qra.trim().toUpperCase(), code, {
      // Optional. Force user confirmation irrespective of existing alias. By default
      // set to True.
      forceAliasCreation: true
    })
      .then(data => {
        this.setState({
          showModal: false,
          dimmerValCodeActive: false,
          dimmerLoginActive: true
        });
        ReactGA.event({ category: "QRA", action: "confirmCode" });
        this.login();
      })
      .catch(err => {
        if (process.env.NODE_ENV !== "production") {
          console.log(err);
        } else Sentry.captureException(err);
        this.setState({ dimmerValCodeActive: false, confirmError: err });
      });
  }
  async login() {
    let token;
    this.setState({ active: true });

    let user = await Auth.signIn(this.state.qra, this.state.password).catch(
      err => {
        console.log(err);
      }
    );

    if (user) {
      await this.props.actions.doStartingLogin();
      token = user.signInUserSession.idToken.jwtToken;
      let credentials = await Auth.currentCredentials();
      await this.props.actions.doLogin(
        token,
        this.state.qra.toUpperCase(),
        credentials.data.IdentityId
      );
      await this.props.actions.doFetchUserInfo(token);
      Sentry.configureScope(scope => {
        scope.setUser({
          qra: this.state.qra
        });
      });
      this.setState({ dimmerLoginActive: false });
      ReactGA.event({ category: "QRA", action: "login" });
      this.props.history.push("/follow");
    }
  }
  render() {
    const values = {
      email: "",
      emailConfirm: "",
      password: "",
      passwordConfirm: "",
      qra: "",
      birthDate: "",
      firstName: "",
      lastName: "",
      country: ""
    };
    const validationSchema = Yup.object({
      email: Yup.string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
      emailConfirm: Yup.string()
        .required()
        .oneOf([Yup.ref("email"), null], "Emails must match"),
      password: Yup.string("Enter a Password")
        .min(6, "Password is too short")
        .required("Password is required"),
      passwordConfirm: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      qra: Yup.string("Enter your Callsign")
        .required("QRA is required")
        .min(3, "QRA is too short"),
      birthDate: Yup.date()
        .required("Enter your Date of Birth")
        .min(new Date(1900, 0, 1))
        .max(new Date()),
      country: Yup.string().required(),
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      recaptcha: Yup.string().required("Confirm Recaptcha")
    });
    return (
      <Fragment>
        <Dimmer active={this.state.dimmerLoginActive} page>
          <Loader>Login User...</Loader>
        </Dimmer>
        <Dimmer active={this.state.dimmerActive} page>
          <Loader>Validating User...</Loader>
        </Dimmer>
        <Dimmer active={this.state.dimmerValCodeActive} page>
          <Loader>Validating Code...</Loader>
        </Dimmer>
        <Formik
          render={props => (
            <SignUpPresentation
              {...props}
              signUpError={this.state.signUpError}
              showModal={this.state.showModal}
              showModalTC={this.state.showModalTC}
              handleOnCloseModal={() => this.setState({ showModal: false })}
              handleOnAcceptModalTC={() => this.handleAcceptTC()}
              handleOnCancelModalTC={() =>
                this.setState({ showModalTC: false })
              }
              handleOnConfirm={() => this.handleOnConfirm()}
              handleCodeChange={this.handleCodeChange.bind(this)}
              handleResendCode={() => this.handleResendCode()}
              confirmError={this.state.confirmError}
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
              country: values.country.trim(),
              showModalTC: true
            });
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
  )(SignUp)
);
