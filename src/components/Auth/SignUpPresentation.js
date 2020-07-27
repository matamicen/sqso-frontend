import React, { Fragment } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import ReCAPTCHA from 'react-google-recaptcha';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import Ad from '../Ad/Ad';
import AppNavigation from '../Home/AppNavigation';

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
    confirmError,
    t
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
                {t('auth.titleSignup')}
              </Header>{' '}
              <Segment stacked>
                <Form onSubmit={() => handleSubmit()}>
                  <Form.Field>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      label={t('auth.labelCallsign')}
                      error={touched.qra && Boolean(errors.qra)}
                      name="qra"
                      onChange={change.bind(null, 'qra')}
                      onBlur={handleBlur}
                      style={{
                        textTransform: 'uppercase'
                      }}
                    />{' '}
                    {touched.qra && errors.qra && (
                      <Message negative content={errors.qra} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      iconPosition="left"
                      label={t('auth.labelFirstName')}
                      error={touched.firstName && Boolean(errors.firstName)}
                      name="firstName"
                      onChange={change.bind(null, 'firstName')}
                      style={{
                        textTransform: 'uppercase'
                      }}
                    />{' '}
                    {touched.firstName && errors.firstName && (
                      <Message negative content={errors.firstName} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      iconPosition="left"
                      label={t('auth.labelLastName')}
                      error={touched.lastName && Boolean(errors.lastName)}
                      name="lastName"
                      onChange={change.bind(null, 'lastName')}
                      style={{
                        textTransform: 'uppercase'
                      }}
                    />{' '}
                    {touched.lastName && errors.lastName && (
                      <Message negative content={errors.lastName} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      // icon="at"
                      iconPosition="left"
                      label={t('auth.labelEmail')}
                      error={touched.email && Boolean(errors.email)}
                      name="email"
                      onChange={change.bind(null, 'email')}
                    />{' '}
                    {touched.email && errors.email && (
                      <Message negative content={errors.email} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      // icon="at"
                      iconPosition="left"
                      label={t('auth.labelEmailConfirmation')}
                      error={
                        touched.emailConfirm && Boolean(errors.emailConfirm)
                      }
                      name="emailConfirm"
                      onChange={change.bind(null, 'emailConfirm')}
                    />{' '}
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
                      label={t('auth.labelBirthDate')}
                      error={touched.birthDate && Boolean(errors.birthDate)}
                      name="birthDate"
                      onChange={change.bind(null, 'birthDate')}
                    />{' '}
                    {touched.birthDate && errors.birthDate && (
                      <Message negative content={errors.birthDate} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      fluid
                      // icon="at"
                      iconPosition="left"
                      label={t('auth.labelPhone')}
                      error={touched.phone && Boolean(errors.phone)}
                      name="phone"
                      onChange={change.bind(null, 'phone')}
                    />{' '}
                    {touched.phone && errors.phone && (
                      <Message negative content={errors.phone} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <CountryDropdown
                      name="country"
                      valueType="short"
                      value={values.country}
                      defaultOptionLabel={t('auth.labelCountry')}
                      onChange={(_, e) => handleChange(e)}
                      onBlur={handleBlur}
                    />

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
                      label={t('auth.labelPassword')}
                      name="password"
                      onChange={change.bind(null, 'password')}
                    />{' '}
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
                      label={t('auth.labelPasswordConfirm')}
                      name="passwordConfirm"
                      onChange={change.bind(null, 'passwordConfirm')}
                    />{' '}
                    {touched.passwordConfirm && errors.passwordConfirm && (
                      <Message negative content={errors.passwordConfirm} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <ReCAPTCHA
                      sitekey="6Lcloo0UAAAAAP8Ur4aiBVbIrU6dWOGKDMwFrWiD"
                      onChange={response =>
                        setFieldValue('recaptcha', response)
                      }
                    />
                    
                    {touched.recaptcha && errors.recaptcha && (
                      <Message negative content={errors.recaptcha} />
                    )}
                  </Form.Field>
                  <Form.Field>
                    <Checkbox
                      id="terms"
                      label={
                        <label>
                          {t('forms.iAgree')}{' '}
                          <Link target={'_blank'} to="/privacy">
                            {t('forms.privacyPolicy')}
                          </Link>{' '}
                          {t('global.and')}{' '}
                          <Link target={'_blank'} to="/terms">
                            {' '}
                            {t('forms.termsAndConditions')}
                          </Link>
                          .{t('forms.willFindYouByCallsign')}
                        </label>
                      }
                      onChange={change.bind(null, 'terms')}
                    />
                    {touched.terms && errors.terms && (
                      <Message negative content={errors.terms} />
                    )}
                  </Form.Field>
                  {signUpError && <Message negative content={signUpError} />}
                  <Form.Button content={t('global.submit')} type="submit" />
                </Form>
              </Segment>
              {t('forms.claimCallsign')}
            </Grid.Column>
          </Grid>
        </div>

        <div className="site-right">
          <Ad adslot="/21799560237/Signup/left" width={160} height={600} />
        </div>
      </div>

      <Modal size="small" open={showModalMessage}>
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
            onClick={() => handleAcceptMessageModal()}
          />
        </Modal.Actions>
      </Modal>
      <Modal
        closeOnDimmerClick={false}
        closeIcon
        open={showModal}
        onClose={() => handleOnCloseModal()}
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
                <Header as="h2" textAlign="center">
                  {t('auth.confirmationCode')}
                </Header>
                <p>{t('forms.verifyEmailInbox')}</p>

                <Form>
                  <Form.Field>
                    <Form.Input
                      fluid
                      placeholder={t('auth.confirmationCode')}
                      name="Code"
                      onChange={handleCodeChange.bind(this)}
                    />
                  </Form.Field>

                  {confirmError && <Message negative content={confirmError} />}
                  <div>
                    <Button
                      content={t('auth.resendCode')}
                      onClick={() => handleResendCode()}
                    />
                    <Button
                      content={t('auth.confirmCode')}
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

export default withTranslation()(SignUpPresentation);
