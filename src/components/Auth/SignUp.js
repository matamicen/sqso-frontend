import React from "react";
// ES Modules, e.g. transpiling with Babel import {Config, import appConfig from
// "./Config";
import { Redirect } from "react-router-dom";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Auth from "@aws-amplify/auth";
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
import Advertisement from "semantic-ui-react/dist/commonjs/views/Advertisement";
import AppNavigation from "../Home/AppNavigation";
import Recaptcha from "react-recaptcha";
import Ad from "../Ad/Ad";
import * as Sentry from "@sentry/browser";
export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      email: "",
      password: "",
      passwordConfirm: null,
      birthdate: "",
      firstname: "",
      lastname: "",
      country: "",
      qra: "",
      code: "",
      token: "",
      userCreated: false,
      userConfirmed: false,
      cognitoUser: "",
      signupError: "",
      confirmError: "",
      formErrors: {
        email: "",
        birthdate: "",
        password: "",
        passwordConfirm: "",
        qra: "",
        firstname: "",
        lastname: "",
        country: "",
        token: ""
      },
      error: null
    };
    this.verifyCallback = this.verifyCallback.bind(this);
  }
  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === "production") {
      this.setState({ error });
      Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        this.setState({ eventId });
      });
    } else console.log(error, errorInfo);
  }
  verifyCallback = function(response) {
    this.setState({ token: response });
  };
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handleCodeChange(e) {
    this.setState({ code: e.target.value });
  }

  handleBirthdateChange(e) {
    this.setState({ birthdate: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  handleFirstNameChange(e) {
    this.setState({ firstname: e.target.value });
  }
  handleLastNameChange(e) {
    this.setState({ lastname: e.target.value });
  }
  handleCountryChange(e) {
    this.setState({ country: e.target.value });
  }
  handlePasswordConfirmChange(e) {
    this.setState({ passwordConfirm: e.target.value });
  }
  handleQraChange(e) {
    this.setState({ qra: e.target.value });
  }

  handleUserCreated(result) {
    this.setState({ cognitoUser: result.user.username });
    this.setState({ userCreated: true });
    this.setState({ showModal: true });
  }

  handleUserConfirmed(result) {
    this.setState({ userConfirmed: true });
  }

  handleOnClick = e => {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();

    const qra = this.state.qra.trim().toUpperCase();
    const birthdate = this.state.birthdate.trim();
    const firstname = this.state.firstname.trim();
    const lastname = this.state.lastname.trim();
    const country = this.state.country.trim();

    this.validateFields();

    if (
      !this.state.formErrors.password &&
      !this.state.formErrors.email &&
      !this.state.formErrors.passwordConfirm &&
      !this.state.formErrors.qra &&
      !this.state.formErrors.birthdate &&
      !this.state.formErrors.firstname &&
      !this.state.formErrors.lastname &&
      !this.state.formErrors.country
    ) {
      Auth.signUp({
        username: qra,
        password: password,
        attributes: {
          email: email, // optional
          birthdate: birthdate, // optional - E.164 number convention
          "custom:country": country,
          "custom:firstName": firstname,
          "custom:lastName": lastname
          // other custom attributes
        },
        validationData: [] //optional
      })
        .then(data => {
          this.handleUserCreated(data);
        })
        .catch(err => {
          if (process.env.NODE_ENV !== "production") {
            console.log(err);
          } else Sentry.captureException(err);
          this.setState({ signupError: err });
        });
    }
  };
  validateFields() {
    let fieldValidationErrors = this.state.formErrors;

    //email

    let emailValid = this.state.email.match(
      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    );
    fieldValidationErrors.email = emailValid ? "" : "Email is invalid";

    //password

    let passwordValid = this.state.password.length >= 6;
    fieldValidationErrors.password = passwordValid
      ? ""
      : "Password is too short";

    fieldValidationErrors.passwordConfirm =
      this.state.password === this.state.passwordConfirm
        ? ""
        : "Password and Confirmation are not the same";

    //QRA
    let qraValid = this.state.qra.length >= 4;
    fieldValidationErrors.qra = qraValid ? "" : "QRA is too short";
    let birthdateValid = this.state.birthdate <= Date.now;

    fieldValidationErrors.birthdate = birthdateValid
      ? ""
      : "Birthdate is not valid";

    let countryValid = this.state.country !== "";
    fieldValidationErrors.country = countryValid ? "" : "Country is not Valid";

    let firstNameValid = this.state.firstname !== "";
    fieldValidationErrors.firstname = firstNameValid
      ? ""
      : "FirstName is not Valid";
    let lastNameValid = this.state.lastname !== "";
    fieldValidationErrors.lastname = lastNameValid
      ? ""
      : "LastName is not Valid";

    let recaptcha = this.state.token !== "";
    fieldValidationErrors.token = recaptcha ? "" : "Confirm Recaptcha";
    this.setState({ formErrors: fieldValidationErrors });
  }

  handleOnConfirm(e) {
    e.preventDefault();

    const code = this.state.code.trim();

    Auth.confirmSignUp(this.state.qra.trim().toUpperCase(), code, {
      // Optional. Force user confirmation irrespective of existing alias. By default
      // set to True.
      forceAliasCreation: true
    })
      .then(data => {
        this.handleUserConfirmed(data);
      })
      .catch(err => {
        if (process.env.NODE_ENV !== "production") {
          console.log(err);
        } else Sentry.captureException(err);
        this.setState({ confirmError: err });
      });
  }
  handleOnOpenModal() {
    this.setState({ showModal: true });
  }
  handleOnCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    if (this.state.userConfirmed) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="global-container">
        <div className="site-header">
          <AppNavigation />
        </div>
        <div className="site-left">
          <Advertisement unit="wide skyscraper">
            <Ad adslot="/21799560237/Signup/left" width={160} height={600} />
          </Advertisement>
        </div>

        <div className="site-main">
          <Grid
            textAlign="center"
            style={{
              height: "100%"
            }}
            verticalAlign="middle"
          >
            <Grid.Column
              style={{
                maxWidth: 450
              }}
            >
              <Header as="h2" color="teal" textAlign="center">
                Sign Up to SuperQSO
              </Header>
              <Form size="large" onSubmit={this.handleOnClick.bind(this)}>
                <Segment stacked>
                  <Form.Field>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="QRA"
                      error={this.state.formErrors.qra ? true : false}
                      name="QRA"
                      onChange={this.handleQraChange.bind(this)}
                      style={{
                        textTransform: "uppercase"
                      }}
                    />{" "}
                    {this.state.formErrors.qra && (
                      <Message negative content={this.state.formErrors.qra} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      iconPosition="left"
                      placeholder="First Name"
                      error={this.state.formErrors.firstname ? true : false}
                      name="firstName"
                      onChange={this.handleFirstNameChange.bind(this)}
                      style={{
                        textTransform: "uppercase"
                      }}
                    />{" "}
                    {this.state.formErrors.firstname && (
                      <Message
                        negative
                        content={this.state.formErrors.firstname}
                      />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      iconPosition="left"
                      placeholder="Last Name"
                      error={this.state.formErrors.lastname ? true : false}
                      name="lastName"
                      onChange={this.handleLastNameChange.bind(this)}
                      style={{
                        textTransform: "uppercase"
                      }}
                    />{" "}
                    {this.state.formErrors.lastname && (
                      <Message
                        negative
                        content={this.state.formErrors.lastname}
                      />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      icon="at"
                      iconPosition="left"
                      placeholder="Email"
                      error={this.state.formErrors.email ? true : false}
                      name="email"
                      onChange={this.handleEmailChange.bind(this)}
                    />{" "}
                    {this.state.formErrors.email && (
                      <Message negative content={this.state.formErrors.email} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      type="date"
                      fluid
                      icon="calendar"
                      iconPosition="left"
                      placeholder="Birthdate"
                      error={this.state.formErrors.birthdate ? true : false}
                      name="birthdate"
                      onChange={this.handleBirthdateChange.bind(this)}
                    />{" "}
                    {this.state.formErrors.birthdate && (
                      <Message
                        negative
                        content={this.state.formErrors.birthdate}
                      />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      icon="world"
                      iconPosition="left"
                      placeholder="Country"
                      error={this.state.formErrors.country ? true : false}
                      name="country"
                      onChange={this.handleCountryChange.bind(this)}
                    />{" "}
                    {this.state.formErrors.country && (
                      <Message
                        negative
                        content={this.state.formErrors.country}
                      />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      type="password"
                      error={this.state.formErrors.password ? true : false}
                      placeholder="Password"
                      name="password"
                      onChange={this.handlePasswordChange.bind(this)}
                    />{" "}
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
                        this.state.formErrors.passwordConfirm ? true : false
                      }
                      placeholder="Password Confirmation"
                      name="passwordConfirm"
                      onChange={this.handlePasswordConfirmChange.bind(this)}
                    />{" "}
                    {this.state.formErrors.passwordConfirm && (
                      <Message
                        negative
                        content={this.state.formErrors.passwordConfirm}
                      />
                    )}
                  </Form.Field>
                  <Recaptcha
                    sitekey="6Lcloo0UAAAAAP8Ur4aiBVbIrU6dWOGKDMwFrWiD"
                    render="explicit"
                    verifyCallback={this.verifyCallback}
                  />{" "}
                  {this.state.formErrors.token && (
                    <Message negative content={this.state.formErrors.token} />
                  )}
                  {this.state.signupError && (
                    <Message negative content={this.state.signupError} />
                  )}
                  <Button content="SignUp" />
                </Segment>
              </Form>
              <Modal
                basic
                closeIcon
                open={this.state.showModal}
                onClose={this.handleOnCloseModal.bind(this)}
              >
                <Modal.Content>
                  <Modal.Description>
                    <Grid
                      textAlign="center"
                      style={{
                        height: "100%"
                      }}
                      verticalAlign="middle"
                    >
                      <Grid.Column
                        style={{
                          maxWidth: 450
                        }}
                      >
                        <Header as="h2" color="teal" textAlign="center">
                          Confirmation Code
                        </Header>
                        <Form onSubmit={this.handleOnConfirm.bind(this)}>
                          <Form.Field>
                            <Form.Input
                              fluid
                              placeholder="Confirmation Code"
                              name="Code"
                              onChange={this.handleCodeChange.bind(this)}
                            />
                          </Form.Field>
                          {this.state.confirmError && (
                            <Message
                              negative
                              content={this.state.confirmError}
                            />
                          )}
                          <Form.Button content="Confirm Code" />
                        </Form>
                      </Grid.Column>
                    </Grid>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Grid.Column>
          </Grid>
        </div>

        <div className="site-right">
          <Advertisement unit="wide skyscraper">
            <Ad adslot="/21799560237/Signup/left" width={160} height={600} />
          </Advertisement>
        </div>
      </div>
    );
  }
}
