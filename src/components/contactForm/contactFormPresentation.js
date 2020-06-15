import React from "react";
import { withTranslation } from 'react-i18next';
import Recaptcha from "react-recaptcha";
import Form from "semantic-ui-react/dist/commonjs/collections/Form";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import Header from "semantic-ui-react/dist/commonjs/elements/Header";
import Ad from "../Ad/Ad";
import AppNavigation from "../Home/AppNavigation";
const ContactFormPresentation = props => {
  const {
    values: { email, message },
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldTouched,
    handleSubmit,
    setFieldValue,t
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };
  return (
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
            {t('forms.contactUs')}
            </Header>
            <Form onSubmit={() => {}}>
              <Form.Field>
                <Form.Input
                  fluid
                  placeholder={t('qra.email')}
                  name="email"
                  value={email}
                  error={touched.email && Boolean(errors.email)}
                  onChange={change.bind(null, "email")}
                  onBlur={handleBlur}
                />
              </Form.Field>
              {touched.email && errors.email && (
                <Message content={errors.email} />
              )}
              <Form.TextArea
                name="message"
                placeholder={t('forms.message')}
                defaultValue={message}
                error={touched.message && Boolean(errors.message)}
                onChange={change.bind(null, "message")}
                onBlur={handleBlur}
              />
              {touched.message && errors.message && (
                <Message content={errors.message} />
              )}
              <Form.Field>
                <Recaptcha
                  sitekey="6LeiVL8UAAAAAIQSELqMu1FpyRsiazdA233cV4u7"
                  render="explicit"
                  verifyCallback={response => {
                    setFieldValue("recaptcha", response);
                  }}
                />{" "}
                {touched.token && errors.token && (
                  <Message negative content={errors.token} />
                )}
              </Form.Field>
              <Form.Button
                type="submit"
                content={t('forms.send')}
                onClick={handleSubmit}
              />
            </Form>
          </Grid.Column>
        </Grid>
      </div>

      <div className="site-right">
        <Ad adslot="/21799560237/Login/left" width={160} height={600} />
      </div>
    </div>
  );
};

export default withTranslation()(ContactFormPresentation);
