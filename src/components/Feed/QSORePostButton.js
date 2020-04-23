import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import * as Actions from '../../actions'

class QSORePostButton extends React.Component {
  constructor () {
    super()
    this.state = {
      showConfirmationRequest: false,
      openLogin: false
    }
  }

  doRePost () {
    this.setState({ showConfirmationRequest: false })
    this.props.actions.doRepost(
      this.props.qso.type === 'SHARE'
        ? this.props.qso.idqso_shared
        : this.props.qso.idqsos,
      this.props.token,
      this.props.qso
    )
  }

  openConfirmationRequest () {
    if (this.props.isAuthenticated) {
      this.setState({ showConfirmationRequest: true })
    } else {
      this.setState({ openLogin: true })
    }
  }

  // close = () => {
  //   this.setState({ showReportContent: false });
  // };

  render () {
    const { showConfirmationRequest } = this.state
    return (
      <Fragment>
        <Button icon onClick={() => this.openConfirmationRequest()}>
          <Icon name="retweet" />
        </Button>
        <Confirm
          size="mini"
          open={this.state.openLogin}
          onCancel={() => this.setState({ openLogin: false })}
          onConfirm={() =>
            this.props.history.push({
              pathname: '/login',
              state: { from: this.props.location.pathname }
            })
          }
          cancelButton="Cancel"
          confirmButton="Login"
          content="Please Login to perform this action"
        />
        <Confirm
          size="mini"
          open={showConfirmationRequest}
          onCancel={() => this.setState({ showConfirmationRequest: false })}
          onConfirm={this.doRePost.bind(this)}
          content="Confirm Repost?"
        />
      </Fragment>
    )
  }
}
QSORePostButton.propTypes = {
  actions: PropTypes.shape({
    doRepost: PropTypes.func
    // doLogout: PropTypes.func,
    // doLogin: PropTypes.func,
    // doFetchUserInfo: PropTypes.func,
    // doSetPublicSession: PropTypes.func
  }).isRequired,
  qso: PropTypes.shape({
    type: PropTypes.string,
    idqso_shared: PropTypes.number,

    idqsos: PropTypes.number
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),

  isAuthenticated: PropTypes.bool,
  token: PropTypes.string,

  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
}
const mapStateToProps = state => ({
  token: state.userData.token,
  isAuthenticated: state.userData.isAuthenticated
})
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QSORePostButton)
)
