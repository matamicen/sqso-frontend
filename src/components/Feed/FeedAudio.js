/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Confirm, Modal } from 'semantic-ui-react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import * as Actions from '../../actions';
class FeedAudio extends React.Component {
  constructor() {
    super();
    this.state = {
      showReportContent: false,
      showMessage: false,
      audioNotVisible: true,
      promptLogin: false,
      promptPremium: false,
      error: null
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.props.isAuthenticated) {
      if (
        this.props.qraUserData.monthly_audio_play >
        this.props.qraUserData.account_type.web_qso_audio_play
      ) {
        this.setState({ promptPremium: true });
      } else this.setState({ audioNotVisible: false });
    } else {
      if (this.props.index > 0) this.setState({ promptLogin: true });
      else this.setState({ audioNotVisible: false });
    }
  }

  render() {
    const date = new Date(this.props.media.datetime);
    const onlyForRegistered = !!(
      this.props.index > 0 && !this.props.isAuthenticated
    );
    if (this.props.media.url) {
      if (this.state.audioNotVisible) {
        return (
          <Fragment>
            <Modal
              closeIcon
              open={this.state.promptPremium}
              onClose={() => this.setState({ promptPremium: false })}
              header="Upgrade to Premium"
              content="You've reached the maximum allowed for free users. Upgrade to Premium in our APP"
              actions={['OK']}
            />
            <Confirm
              size="mini"
              open={this.state.promptLogin}
              onConfirm={() =>
                this.props.history.push({
                  pathname: '/login',
                  state: { from: this.props.location.pathname }
                })
              }
              onCancel={() => this.setState({ promptLogin: false })}
              cancelButton="Cancel"
              confirmButton="Login"
              content="Please Login to perform this action"
            />
            <div style={{ display: 'flex', alignItems: 'center',  fontSize: "1.2rem" }}>
              <Button
                size="large"
                circular
                icon="play"
                onClick={this.onClick}
                style={{ background: '#8BD8BD', color: '#243665' }}
              />
              <span>
                Play Audio{' '}
                {this.props.media.description && (
                  <span>
                    {' - '}
                    <b>{this.props.media.description}</b>
                    {' - '}
                  </span>
                )}
                {date.toLocaleDateString('EN-US', { month: 'short' }) +
                  ' ' +
                  date.getDate() +
                  ', ' +
                  date.getFullYear()}{' '}
                {date.getUTCHours() +
                  ':' +
                  (date.getMinutes() < 10 ? '0' : '') +
                  date.getMinutes()}
                {onlyForRegistered && (
                  <Link
                    to={{
                      pathname: '/login',
                      state: { from: this.props.location.pathname }
                    }}
                  >
                    {'  '}Login Required
                  </Link>
                )}
              </span>
            </div>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <div>
              <audio
                ref={this.props.media.url}
                src={this.props.media.url}
                style={{ width: '100%', maxWidth: '100%', height: '25px' }}
                controls
                autoPlay
                preload="none"
                controlsList="nodownload"
                onPlay={() =>
                  this.props.isAuthenticated &&
                  this.props.actions.doQsoMediaPlay(
                    this.props.media.idqsos_media,
                    this.props.token,
                    this.props.media.idqso
                  )
                }
              />
              <p>
                {this.props.media.description && (
                  <span>
                    <b>{this.props.media.description}</b>
                    {' - '}
                  </span>
                )}
                {date.toLocaleDateString('EN-US', { month: 'short' }) +
                  ' ' +
                  date.getDate() +
                  ', ' +
                  date.getFullYear()}{' '}
                {date.getUTCHours() +
                  ':' +
                  (date.getMinutes() < 10 ? '0' : '') +
                  date.getMinutes()}
                {onlyForRegistered && (
                  <Link
                    to={{
                      pathname: '/login',
                      state: { from: this.props.location.pathname }
                    }}
                  >
                    {'  '}Login Required
                  </Link>
                )}
              </p>
            </div>
          </Fragment>
        );
      }
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  token: state.userData.token,
  isAuthenticated: state.userData.isAuthenticated,
  currentQRA: state.userData.currentQRA,
  qraUserData: state.userData.qra
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { pure: false }
  )(FeedAudio)
);
