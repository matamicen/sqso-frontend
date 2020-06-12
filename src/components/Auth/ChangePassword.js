import Auth from '@aws-amplify/auth'
import PropTypes from 'prop-types'
import React from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Form from 'semantic-ui-react/dist/commonjs/collections/Form'
import Message from 'semantic-ui-react/dist/commonjs/collections/Message'
import Header from 'semantic-ui-react/dist/commonjs/elements/Header'
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader'
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment'
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer'
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal'
import Advertisement from 'semantic-ui-react/dist/commonjs/views/Advertisement'
import * as Actions from '../../actions'
import '../../styles/style.css'
import Ad from '../Ad/Ad'
import AppNavigation from '../Home/AppNavigation'
class ChangePassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loader: false,
      showModal: false,
      oldPassword: null,
      password: null,
      passwordConfirm: null,
      changePasswordError: '',
      formErrors: {
        oldPassword: '',
        password: '',
        passwordConfirm: ''
      },
      error: null
    }
    this.handleChangePasswordButton = this.handleChangePasswordButton.bind(
      this
    )
  }

  changeHandler (event) {
    const name = event.target.name
    const value = event.target.value

    this.setState({ [name]: value })
  }

  close () {
    this.setState({ showModal: false })
    this.props.actions.doLogout()
    this.props.history.push({
      pathname: '/login'
    })
  }

  open () {
    this.setState({ showModal: true })
  }

  handleChangePasswordButton () {
    const error = this.validateFields()
    
    if (!error) {
      this.setState({ loader: true })
      if (this.props.history.location.data && this.props.history.location.data.newPasswordRequired) {
        Auth.completeNewPassword(
          this.props.history.location.data.user, // the Cognito User Object
          this.state.password // the new password
          // OPTIONAL, the required attributes
          // {
          //   email: 'xxxx@example.com',
          //   phone_number: '1234567890'
          // }
        )
          .then(user => {
            // at this time the user is logged in if no MFA required
            this.setState({ loader: false })
            this.setState({ showModal: true })
          })
          .catch(err => {
            this.setState({ changePasswordError: err.message })
            this.setState({ loader: false })
          })
      } else {
        Auth.currentAuthenticatedUser()
          .then(user => {
            return Auth.changePassword(
              user,
              this.state.oldPassword,
              this.state.password
            )
          })
          .then(data => {
            this.setState({ loader: false })
            this.setState({ showModal: true })
          })
          .catch(err => {
            this.setState({ changePasswordError: err.message })
            this.setState({ loader: false })
          })
      }
    }
  }

  validateFields () {
    const {t} = this.props;
    const fieldValidationErrors = this.state.formErrors

    // password

    const passwordValid = this.state.password.length >= 6
    fieldValidationErrors.password = passwordValid
      ? null
      : t('auth.passwordTooShort')

    fieldValidationErrors.passwordConfirm =
      this.state.password === this.state.passwordConfirm
        ? null
        : t('auth.passwordsDontMatch')

    this.setState({ formErrors: fieldValidationErrors })

    if (
      fieldValidationErrors.password ||
      fieldValidationErrors.passwordConfirm
    ) {
      return true
    } else return false
  }

  render () {
    const {t} = this.props;
    return (
      <div className="global-container">
        <div className="site-header">
          <AppNavigation />
        </div>
        <div className="site-left">
          <Advertisement className="left" unit="wide skyscraper">
            <Ad
              adslot="/21799560237/ChangePassword/left"
              width={160}
              height={600}
            />
          </Advertisement>
        </div>

        <div className="changepassword-main">
          <Segment raised>
            <Modal
              open={this.state.showModal}
              onClose={() => this.close()}
              header={t('auth.passwordChangedHeader')}
              content={t('auth.passwordChangedContent')}
              actions={[
                {
                  key: 'done',
                  content: 'Ok',
                  positive: true
                }
              ]}
            />
            <Dimmer active={this.state.loader} page>
              <Loader>{t('global.loading')}</Loader>
            </Dimmer>
            <Header as="h2" color="teal" textAlign="center">
            {}
            </Header>
            <Form onSubmit={() => this.handleChangePasswordButton()}>
              <Form.Field>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  error={!!this.state.formErrors.password}
                  placeholder={t('auth.placeholderOldPassword')}
                  name="oldPassword"
                  onChange={this.changeHandler.bind(this)}
                />{' '}
                {this.state.formErrors.password && (
                  <Message negative content={this.state.formErrors.password} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  error={!!this.state.formErrors.password}
                  placeholder={t('auth.placeholderNewPassword')}
                  name="password"
                  onChange={this.changeHandler.bind(this)}
                />{' '}
                {this.state.formErrors.password && (
                  <Message negative content={this.state.formErrors.password} />
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  error={!!this.state.formErrors.passwordConfirm}
                  placeholder={t('auth.placeholderPasswordConfirm')}
                  name="passwordConfirm"
                  onChange={this.changeHandler.bind(this)}
                />{' '}
                {this.state.formErrors.passwordConfirm && (
                  <Message
                    negative
                    content={this.state.formErrors.passwordConfirm}
                  />
                )}
              </Form.Field>
              {this.state.changePasswordError && (
                <Message negative content={this.state.changePasswordError} />
              )}
              <Form.Button content={t('auth.changePasswordButton')} />
            </Form>
          </Segment>
        </div>

        <div className="site-right">
          <Advertisement unit="wide skyscraper">
            <Ad
              adslot="/21799560237/ChangePassword/right"
              width={160}
              height={600}
            />
          </Advertisement>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  // state: state,
  currentQRA: state.userData.currentQRA
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})
ChangePassword.propTypes = {
  actions: PropTypes.shape({
    doLogout: PropTypes.func
  }).isRequired,

  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      data: PropTypes.shape({
        newPasswordRequired: PropTypes.bool,
        user: PropTypes.object
      })
    }).isRequired
  }).isRequired
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { pure: false }
  )(withTranslation()(ChangePassword))
)
