import React, { Fragment } from "react";
import { Formik } from "formik";
import ContactFormPresentation from "./contactFormPresentation";
import * as Yup from "yup";
import API from "@aws-amplify/api";
import * as Sentry from "@sentry/browser";
import { withRouter } from "react-router-dom";
import Modal from "semantic-ui-react/dist/commonjs/modules/Modal";
class contactForm extends React.Component {
  state = { openModal: false };
  send(values) {
    let apiName = "superqso";
    let path = "/contactformsend";
    let myInit = {
      body: {
        email: values.email,
        message: values.message,
      }, // replace this with attributes you need
    };
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error > 0) {
          console.error(response.body.message);
        } else {
          this.setState({ openModal: true });
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        } else Sentry.captureException(error);
      });
  }
  render() {
    const values = { email: "", message: "" };
    const validationSchema = Yup.object({
      email: Yup.string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
      message: Yup.string().required("Enter Message"),
    });

    return (
      <Fragment>
        <Formik
          render={props => <ContactFormPresentation {...props} />}
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={values => this.send(values)}
        />

        <Modal
          open={this.state.openModal}
          onClose={() => this.props.history.push("/")}
          size="small"
        >
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Content>
            <p>Email Sent!</p>
          </Modal.Content>
        </Modal>
      </Fragment>
    );
  }
}

export default withRouter(contactForm);
