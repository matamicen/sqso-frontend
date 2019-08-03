import React, { Fragment } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import SignUpPresentation from "./SignUpPresentation";
import Auth from "@aws-amplify/auth";

import * as Sentry from "@sentry/browser";
export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      userCreated: false,
      userConfirmed: false,
      cognitoUser: "",
      signUpError: "",
      confirmError: "",
      error: null
    };
  }

  signUp(values) {
    console.log("signUp");
    const email = values.email.trim();
    const password = values.password.trim();
    const qra = values.qra.trim().toUpperCase();
    const birthDate = values.birthDate.trim();
    const firstName = values.firstName.trim();
    const lastName = values.lastName.trim();
    const country = values.country.trim();

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
        this.setState({ cognitoUser: data.user.username });
        this.setState({ userCreated: true });
        this.setState({ showModal: true });
      })
      .catch(err => {
        this.setState({ signUpError: err.message });
      });
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
        this.props.history.push("/");
      })
      .catch(err => {
        if (process.env.NODE_ENV !== "production") {
          console.log(err);
        } else Sentry.captureException(err);
        this.setState({ confirmError: err });
      });
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
        .min(4, "QRA is too short"),
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
        <Formik
          render={props => (
            <SignUpPresentation
              {...props}
              signUpError={this.state.signUpError}
              showModal={this.state.showModal}
              handleOnCloseModal={() => this.setState({ showModal: false })}
              handleOnConfirm={() => this.handleOnConfirm()}
              handleCodeChange={() => this.handleCodeChange()}
              confirmError={this.state.confirmError}
            />
          )}
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={values => this.signUp(values)}
        />
      </Fragment>
    );
  }
}
