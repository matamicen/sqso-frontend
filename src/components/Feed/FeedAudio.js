/* eslint-disable react/prop-types */
import i18n from 'i18next';
import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
    // if (this.props.isAuthenticated) {
      // if (
      //   this.props.qraUserData.monthly_audio_play >
      //   this.props.qraUserData.account_type.web_qso_audio_play
      // ) {
      //   this.setState({ promptPremium: true });
      // } else {
        this.props.recalculateRowHeight();
        this.setState({ audioNotVisible: false });
      // }
    // } else {
    //   if (this.props.index > 0) this.setState({ promptLogin: true });
    //   else {
    //     this.props.recalculateRowHeight();
    //     this.setState({ audioNotVisible: false });
    //   }
    // }
  }

  render() {
    const { t } = this.props;
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
              header={t('global.upgradePremium')}
              content={t('global.userMaxReached')}
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
              cancelButton={t('global.cancel')}
              confirmButton={t('auth.login')}
              content={t('auth.loginToPerformAction')}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '1.2rem'
              }}
            >
              <Button
                size="large"
                circular
                icon="play"
                onClick={this.onClick}
                style={{ background: '#8BD8BD', color: '#243665' }}
              />
              <span>
                {t('qso.playAudio')}
                {' - '}
                {this.props.media.description && (
                  <span>
                    <b>{this.props.media.description}</b>
                    {' - '}
                  </span>
                )}
                {date.toLocaleDateString(i18n.language, { month: 'short' }) +
                  ' ' +
                  date.getDate() +
                  ', ' +
                  date.getFullYear()}{' '}
                {date.getUTCHours() +
                  ':' +
                  (date.getMinutes() < 10 ? '0' : '') +
                  date.getMinutes()}{' '}
                {this.props.media.views_counter > 0 && (
                  <span style={{ fontSize: 'medium', color: 'gray' }}>
                    {' '}
                    {t('qso.audioPlays', {
                      count: this.props.media.views_counter
                    })}
                  </span>
                )}
                {/* {onlyForRegistered && (
                  <Link
                    to={{
                      pathname: '/login',
                      state: { from: this.props.location.pathname }
                    }}
                  >
                    {'  '}
                    {t('auth.loginRequired')}
                  </Link>
                )} */}
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
                  this.props.isAuthenticated ?
                  this.props.actions.doQsoMediaPlay(
                    this.props.media.idqsos_media,
                    this.props.token,
                    this.props.media.idqso
                  ): this.props.actions.doQsoMediaPlayPublic(
                    this.props.media.idqsos_media,
                    
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
                {date.toLocaleDateString(i18n.language, { month: 'short' }) +
                  ' ' +
                  date.getDate() +
                  ', ' +
                  date.getFullYear()}{' '}
                {date.getUTCHours() +
                  ':' +
                  (date.getMinutes() < 10 ? '0' : '') +
                  date.getMinutes()}
                {this.props.media.views_counter > 0 && (
                  <span style={{ fontSize: 'medium', color: 'gray' }}>
                    {' '}
                    {t('qso.audioPlays', {
                      count: this.props.media.views_counter + 1
                    })}
                  </span>
                )}
                {/* {onlyForRegistered && (
                  <Link
                    to={{
                      pathname: '/login',
                      state: { from: this.props.location.pathname }
                    }}
                  >
                    {'  '}
                    {t('auth.loginRequired')}
                  </Link>
                )} */}
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
  )(withTranslation()(FeedAudio))
);
