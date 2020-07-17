import API from '@aws-amplify/api';
import * as Sentry from '@sentry/browser';
import { Formik } from 'formik';
import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import * as Yup from 'yup';
import ContactFormPresentation from './contactFormPresentation';
class contactForm extends React.Component {
  state = { openModal: false };
  send(values) {
    let apiName = 'superqso';
    let path = '/contactformsend';
    let myInit = {
      body: {
        email: values.email,
        message: values.message
      } // replace this with attributes you need
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
        if (process.env.NODE_ENV !== 'production') {
          console.log(error);
        } else {
          Sentry.configureScope(function(scope) {
            scope.setExtra('ENV', process.env.REACT_APP_STAGE);
          });
          Sentry.captureException(error);
        }
      });
  }
  render() {
    const {t} = this.props;
    const values = { email: '', message: '' };
    const validationSchema = Yup.object({
      email: Yup.string(t('forms.enterEmail'))
        .email(t('forms.enterValidEmail'))
        .required(t('forms.emailRequired')),
      message: Yup.string().required(t('forms.enterMessage')),
      recaptcha: Yup.string().required(t('forms.confirmRecaptcha'))
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
          onClose={() => this.props.history.push('/')}
          size="small"
        >
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Content>
            <p>{t('qso.othersLikeThis')}Email Sent!</p>
          </Modal.Content>
        </Modal>
      </Fragment>
    );
  }
}

export default withRouter(withTranslation()(contactForm));
