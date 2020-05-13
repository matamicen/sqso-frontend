import React, { Fragment } from "react";
import { CountryDropdown } from "react-country-region-selector";
import Recaptcha from "react-recaptcha";
import { Link } from "react-router-dom";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import Checkbox from "semantic-ui-react/dist/commonjs/modules/Checkbox";
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
import Ad from "../Ad/Ad";
import AppNavigation from "../Home/AppNavigation";
const SignUpPresentation = props => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldTouched,
    handleSubmit,
    setFieldValue,
    signUpError,
    showModal,
    // showModalTC,
    showModalMessage,
    handleOnCloseModal,
    // handleOnAcceptModalTC,
    handleAcceptMessageModal,
    // handleOnCancelModalTC,
    handleOnConfirm,
    handleCodeChange,
    handleResendCode,
    confirmError
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };
  return (
    <Fragment>
      <div className="global-container">
        <div className="site-header">
          <AppNavigation />
        </div>
        <div className="site-left">
          <Ad adslot="/21799560237/Signup/left" width={160} height={600} />
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
              </Header>{" "}
              <Segment stacked>
                <Form onSubmit={() => handleSubmit()}>
                  <Form.Field>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      label="callsign"
                      error={touched.qra && Boolean(errors.qra)}
                      name="qra"
                      onChange={change.bind(null, "qra")}
                      onBlur={handleBlur}
                      style={{
                        textTransform: "uppercase"
                      }}
                    />{" "}
                    {touched.qra && errors.qra && (
                      <Message negative content={errors.qra} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      iconPosition="left"
                      label="First Name"
                      error={touched.firstName && Boolean(errors.firstName)}
                      name="firstName"
                      onChange={change.bind(null, "firstName")}
                      style={{
                        textTransform: "uppercase"
                      }}
                    />{" "}
                    {touched.firstName && errors.firstName && (
                      <Message negative content={errors.firstName} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      iconPosition="left"
                      label="Last Name"
                      error={touched.lastName && Boolean(errors.lastName)}
                      name="lastName"
                      onChange={change.bind(null, "lastName")}
                      style={{
                        textTransform: "uppercase"
                      }}
                    />{" "}
                    {touched.lastName && errors.lastName && (
                      <Message negative content={errors.lastName} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      // icon="at"
                      iconPosition="left"
                      label="Email"
                      error={touched.email && Boolean(errors.email)}
                      name="email"
                      onChange={change.bind(null, "email")}
                    />{" "}
                    {touched.email && errors.email && (
                      <Message negative content={errors.email} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      // icon="at"
                      iconPosition="left"
                      label="Email Confirmation"
                      error={
                        touched.emailConfirm && Boolean(errors.emailConfirm)
                      }
                      name="emailConfirm"
                      onChange={change.bind(null, "emailConfirm")}
                    />{" "}
                    {touched.emailConfirm && errors.emailConfirm && (
                      <Message negative content={errors.emailConfirm} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      type="date"
                      fluid
                      icon="calendar"
                      iconPosition="left"
                      label="Birthdate"
                      error={touched.birthDate && Boolean(errors.birthDate)}
                      name="birthDate"
                      onChange={change.bind(null, "birthDate")}
                    />{" "}
                    {touched.birthDate && errors.birthDate && (
                      <Message negative content={errors.birthDate} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <CountryDropdown
                      name="country"
                      valueType="short"
                      value={values.country}
                      onChange={(_, e) => handleChange(e)}
                      onBlur={handleBlur}
                    />
                    {/* <Form.Input
                      fluid
                      icon="world"
                      iconPosition="left"
                      placeholder="Country"
                      error={touched.country && Boolean(errors.country)}
                      name="country"
                      onChange={change.bind(null, "country")}
                    /> */}{" "}
                    {touched.country && errors.country && (
                      <Message negative content={errors.country} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      type="password"
                      error={touched.password && Boolean(errors.password)}
                      label="Password"
                      name="password"
                      onChange={change.bind(null, "password")}
                    />{" "}
                    {touched.password && errors.password && (
                      <Message negative content={errors.password} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      type="password"
                      error={
                        touched.passwordConfirm &&
                        Boolean(errors.passwordConfirm)
                      }
                      label="Password Confirmation"
                      name="passwordConfirm"
                      onChange={change.bind(null, "passwordConfirm")}
                    />{" "}
                    {touched.passwordConfirm && errors.passwordConfirm && (
                      <Message negative content={errors.passwordConfirm} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Recaptcha
                      sitekey="6Lcloo0UAAAAAP8Ur4aiBVbIrU6dWOGKDMwFrWiD"
                      render="explicit"
                      verifyCallback={response => {
                        setFieldValue("recaptcha", response);
                      }}
                    />{" "}
                    {touched.recaptcha && errors.recaptcha && (
                      <Message negative content={errors.recaptcha} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Checkbox
                      id="terms"
                      label={
                        <label>
                          I agree the{" "}
                          <Link target={"_blank"} to="/privacy">
                            Privacy Policy
                          </Link>{" "}
                          and{" "}
                          <Link target={"_blank"} to="/terms">
                            {" "}
                            Terms and Conditions
                          </Link>
                          . Others will be able to find you by CallSign.
                        </label>
                      }
                      onChange={change.bind(null, "terms")}
                    />
                    {touched.terms && errors.terms && (
                      <Message negative content={errors.terms} />
                    )}
                  </Form.Field>
                  {signUpError && <Message negative content={signUpError} />}
                  <Form.Button content="Register" type="submit" />
                </Form>
              </Segment>
              To claim your CallSign, send an email to support@superqso.com
            </Grid.Column>
          </Grid>
        </div>

        <div className="site-right">
          <Ad adslot="/21799560237/Signup/left" width={160} height={600} />
        </div>
      </div>

      <Modal size="small" open={showModalMessage}>
        <Modal.Content>
          <p>
            You have 3 month of trial Premium Subscription! Enjoy SuperQso
            59+100 !!! After the 3 month you can continue using SuperQso with
            the FREE subscription.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="OK"
            onClick={() => handleAcceptMessageModal()}
          />
        </Modal.Actions>
      </Modal>
      <Modal closeOnDimmerClick={false} closeIcon open={showModal} onClose={() => handleOnCloseModal()}>
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
                <Header as="h3" color="teal" textAlign="center">
                  Please verify your email inbox
                </Header>
                <Form>
                  <Form.Field>
                    <Form.Input
                      fluid
                      placeholder="Confirmation Code"
                      name="Code"
                      onChange={handleCodeChange.bind(this)}
                    />
                  </Form.Field>

                  {confirmError && <Message negative content={confirmError} />}
                  <div>
                    <Button
                      content="Resend Code"
                      onClick={() => handleResendCode()}
                    />
                    <Button
                      content="Confirm Code"
                      onClick={() => handleOnConfirm()}
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
};

export default SignUpPresentation;
