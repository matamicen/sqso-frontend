import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import * as Actions from '../../actions';
import '../../styles/style.css';
import PopupToFollow from '../PopupToFollow';
import FeedAudioList from './FeedAudioList';
import FeedImage from './FeedImage';
import FeedLinkList from './FeedLinkList';
import FeedOptionsMenu from './FeedOptionsMenu';
import QRAs from './QRAs';
import QSOComments from './QSOComments';
import QSOLikeButton from './QSOLikeButton';
import QSOLikeText from './QSOLikeText';
import QSORePostButton from './QSORePostButton';
import QSOShareButtons from './QSOShareButtons';
import './style.css';
class FeedItemQSO extends React.PureComponent {
  constructor() {
    super();
    this.state = { comments: [], likes: [], error: null };

    this.recalculateRowHeight = this.recalculateRowHeight.bind(this);
  }

  handleOnComment(e) {
    if (!this.props.isAuthenticated && this.props.qso.comments.length === 0)
      this.setState({ openLogin: true });
    else if (this.props.currentQRA || this.props.qso.comments.length > 0) {
      this.props.showComments(this.props.index);
      this.recalculateRowHeight();
    }
    // this.recalculateRowHeight(); this.props.recalculateRowHeight()
  }

  recalculateRowHeight() {
    if (this.props.recalculateRowHeight) {
      this.props.recalculateRowHeight(this.props.index);
    }
  }

  //     }
  static getDerivedStateFromProps(props, prevState) {
    if (props.qso.comments !== prevState.comments) {
      return { comments: props.qso.comments };
    }
    if (props.qso.likes !== prevState.likes) {
      return { likes: props.qso.likes };
    }
    return null;
  }

  render() {
    const {t} = this.props;
    const picList = this.props.qso.media.filter(
      media => media.type === 'image'
    );
    const audioList = this.props.qso.media.filter(
      media => media.type === 'audio'
    );
    const commentsCounter = '(' + this.props.qso.comments.length + ')';

    let text;

    switch (this.props.qso.type) {
      case 'QSO':
        text = t('qso.workedAQSO');
        break;
      case 'LISTEN':
        text = t('qso.listenedQSO');
        break;
      case 'SHARE':
        text = t('qso.repostedQSO');
        break;
      default:
    }
    var date = new Date(this.props.qso.datetime);

    return (
      <Fragment>
        <Segment raised>
          <div className="qso-header">
            <div className="qso-avatar">
              <Link to={'/' + this.props.qso.qra}>
                <Image
                  src={
                    this.props.qso.avatarpic
                      ? this.props.qso.avatarpic
                      : '/emptyprofile.png'
                  }
                  size="mini"
                  avatar
                  style={{
                    width: '50px',
                    height: '50px'
                  }}
                />
              </Link>
            </div>
            <div className="qso-header-action">
              <PopupToFollow
                qra={this.props.qso.qra}
                trigger={
                  <Link to={'/' + this.props.qso.qra}>
                    {this.props.qso.qra}
                  </Link>
                }
              />
              {text}
            </div>
            <div className="qso-header-info">
              <div>
                <b>{t('qso.mode')}</b>
                <br />
                {this.props.qso.mode}
              </div>
              <div>
                <b>{t('qso.band')}</b>
                <br />
                {this.props.qso.band}
              </div>
              {this.props.qso.db && (
                <div>
                  <b>dB</b>
                  <br />
                  {this.props.qso.db ? this.props.qso.db : null}
                </div>
              )}
              {!this.props.qso.db && (
                <div>
                  <b>RST</b>
                  <br />
                  {this.props.qso.rst ? this.props.qso.rst : '59'}
                </div>
              )}
              <div>
                <b>{t('qso.date')}</b>
                <br />
                {date.toLocaleDateString('EN-US', { month: 'short' }) +
                  ' ' +
                  date.getDate() +
                  ', ' +
                  date.getFullYear()}
              </div>
              <div>
                <b>UTC</b>
                <br />
                {date.getUTCHours() +
                  ':' +
                  (date.getMinutes() < 10 ? '0' : '') +
                  date.getMinutes()}
              </div>
            </div>

            {/* {date.toLocaleDateString("EN-US", {month: "short"}) + ' ' + date.getDate() + ', ' + date.getFullYear()} */}
            <div
              className="qso-header-button"
              style={{
                float: 'right'
              }}
            >
              <FeedOptionsMenu
                qso_owner={this.props.qso.qra}
                idqso={this.props.qso.idqsos}
                guid={this.props.qso.GUID_QR}
                qso={this.props.qso}
                optionsCaller="FeedItem"
                QslCard={true}
              />
            </div>
          </div>
          <Divider
            hidden
            style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
          />
          <Segment>
            <QRAs
              avatarpic={this.props.qso.avatarpic}
              qso_owner={this.props.qso.qra}
              qras={this.props.qso.qras}
            />
          </Segment>
          {picList.length > 0 && (
            <Fragment>
              <Divider
                hidden
                style={{ marginTop: '1vh', marginBottom: '1vh' }}
              />
              <FeedImage
                img={picList}
                measure={this.props.measure}
                idqso={this.props.qso.idqsos}
                qso_owner={this.props.qso.qra}
              />
            </Fragment>
          )}
          {audioList.length > 0 && (
            <Fragment>
              <Divider
                hidden
                style={{ marginTop: '1vh', marginBottom: '1vh' }}
              />
              <FeedAudioList
                mediaList={audioList}
                idqso={this.props.qso.idqsos}
                qso_owner={this.props.qso.qra}
                recalculateRowHeight={this.recalculateRowHeight}
              />
            </Fragment>
          )}
          {this.props.qso.links && (
            <FeedLinkList links={this.props.qso.links} />
          )}
          <Divider hidden style={{ marginTop: '1vh' }} />
          <QSOLikeText qso={this.props.qso} likes={this.state.likes} />
          <Button.Group fluid basic>
            <QSOLikeButton
              qso={this.props.qso}
              recalculateRowHeight={this.recalculateRowHeight}
            />
            <Button onClick={e => this.handleOnComment(e)}>
              <div>
                <Icon name="comment outline" />{' '}
                {this.props.qso.comments.length > 0 && commentsCounter}
              </div>
            </Button>
            <QSORePostButton qso={this.props.qso} />
            <QSOShareButtons idqso={this.props.qso.GUID_URL} />
          </Button.Group>
          {this.props.qso.showComments && (
            <QSOComments
              qso={this.props.qso}
              comments={this.state.comments}
              recalculateRowHeight={this.recalculateRowHeight}
            />
          )}
        </Segment>
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
          cancelButton={t('global.cancel')}
          confirmButton={t('auth.login')}
          content={t('auth.loginToPerformAction')}
        />
      </Fragment>
    );
  }
}
FeedItemQSO.propTypes = {
  currentQRA: PropTypes.string,
  showComments: PropTypes.func,
  recalculateRowHeight: PropTypes.func,
  measure: PropTypes.string,
  index: PropTypes.string
};
const mapStateToProps = (state, qsos) => ({
  isAuthenticated: state.userData.isAuthenticated,
  fetchingQSOS: state.FetchingQSOS,
  qsosFetched: state.qsosFetched,
  currentQRA: state.userData.currentQRA
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(FeedItemQSO))
);
FeedItemQSO.propTypes = {
  qso: PropTypes.object.isRequired
};
