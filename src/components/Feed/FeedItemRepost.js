import i18n from 'i18next';
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
import PopupToFollow from '../PopupToFollow';
import FeedAudioList from './FeedAudioList';
import FeedImage from './FeedImage';
import FeedOptionsMenu from './FeedOptionsMenu';
import QRAs from './QRAs';
import QSOComments from './QSOComments';
import QSOLikeButton from './QSOLikeButton';
import QSOLikeText from './QSOLikeText';
import QSORePostButton from './QSORePostButton';
import QSOShareButtons from './QSOShareButtons';
import './style.css';
class FeedItemRepost extends React.Component {
  constructor() {
    super();
    this.state = { comments: [], likes: [], error: null };
    this.handleOnComment = this.handleOnComment.bind(this);
    this.recalculateRowHeight = this.recalculateRowHeight.bind(this);
  }

  handleOnComment(e) {
    if (!this.props.isAuthenticated && this.props.qso.comments.length === 0)
      this.setState({ openLogin: true });
    else if (this.props.currentQRA || this.props.qso.comments.length > 0) {
      this.props.showComments(this.props.index);
    }
    // this.recalculateRowHeight(); this.props.recalculateRowHeight()
  }

  // componentDidUpdate(prevProps, prevState) {
  //     if ((this.state.showComment !== prevState.showComment) && (this.props.recalculateRowHeight))
  //         this.props.recalculateRowHeight(this.props.index);

  //     }
  recalculateRowHeight() {
    if (this.props.recalculateRowHeight) {
      this.props.recalculateRowHeight(this.props.index);
    }
  }

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
    let shareText;
    switch (this.props.qso.original[0].type) {
      case 'QSO':
        text = t('qso.workedAQSO');
        shareText = t('qso.checkOutQSO');
        break;
      case 'LISTEN':
        text = t('qso.listenedQSO');
        shareText = t('qso.checkOutQSO');
        break;
      case 'POST':
        text = t('qso.createdPost');
        shareText = t('qso.checkOutPost');

        break;
      default:
    }
    var repostDate = new Date(this.props.qso.datetime);
    var date = new Date(this.props.qso.original[0].datetime);
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
              { t('qso.sharedContent')}
            </div>
            <div className="qso-header-info-post">
              <div>
                <b>{ t('qso.date')}: </b>
                {repostDate.toLocaleDateString(i18n.language, { month: 'short' }) +
                  ' ' +
                  repostDate.getDate() +
                  ', ' +
                  repostDate.getFullYear()}
              </div>
              <div>
                <b>UTC: </b>
                {repostDate.getUTCHours() +
                  ':' +
                  (repostDate.getMinutes() < 10 ? '0' : '') +
                  repostDate.getMinutes()}
              </div>
            </div>
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
                optionsCaller="FeedItem"
                QslCard={false}
              />
            </div>
          </div>

          {/* <Divider hidden /> */}
          <Segment raised>
            <div className="qso-header">
              <div className="qso-avatar">
                <Link to={'/' + this.props.qso.original[0].qra}>
                  <Image
                    src={
                      this.props.qso.original[0].avatarpic
                        ? this.props.qso.original[0].avatarpic
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
                  qra={this.props.qso.original[0].qra}
                  trigger={
                    <Link to={'/' + this.props.qso.original[0].qra}>
                      {this.props.qso.original[0].qra}
                    </Link>
                  }
                />
                {text}
              </div>
              <div className="qso-header-info">
                {this.props.qso.original[0].mode && (
                  <div>
                    <b>{ t('qso.mode')}</b>
                    <br />
                    {this.props.qso.original[0].mode}
                  </div>
                )}
                {this.props.qso.original[0].band && (
                  <div>
                    <b>{ t('qso.band')} </b>
                    <br />
                    {this.props.qso.original[0].band}
                  </div>
                )}
                {this.props.qso.db && (
                  <div>
                    <b>dB </b>
                    <br />
                    {this.props.qso.db ? this.props.qso.db : null}
                  </div>
                )}
                {!this.props.qso.rst && (
                  <div>
                    <b>RST </b>
                    <br />
                    {this.props.qso.rst ? this.props.qso.rst : '59'}
                  </div>
                )}
                <div>
                  <b>{ t('qso.date')} </b>
                  <br />
                  {date.toLocaleDateString(i18n.language, { month: 'short' }) +
                    ' ' +
                    date.getDate() +
                    ', ' +
                    date.getFullYear()}
                </div>
                <div>
                  <b>UTC: </b>
                  {date.getUTCHours() +
                    ':' +
                    (date.getMinutes() < 10 ? '0' : '') +
                    date.getMinutes()}
                </div>
              </div>

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
                  optionsCaller="FeedItem"
                  QslCard={false}
                />
              </div>
            </div>
            <Divider
              hidden
              style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
            />
            {this.props.qso.qras.length > 0 && (
              <Segment>
                <QRAs
                  avatarpic={this.props.qso.original[0].avatarpic}
                  qso_owner={this.props.qso.original[0].qra}
                  qras={this.props.qso.qras}
                />
              </Segment>
            )}
            {picList.length > 0 && (
              <FeedImage
                img={picList}
                measure={this.props.measure}
                idqso={this.props.qso.idqsos}
                qso_owner={this.props.qso.original[0].qra}
              />
            )}
            {audioList.length > 0 && (
              <FeedAudioList
                mediaList={audioList}
                idqso={this.props.qso.idqsos}
                qso_owner={this.props.qso.original[0].qra}
                recalculateRowHeight={this.recalculateRowHeight}
              />
            )}
          </Segment>

          <Divider hidden style={{ marginTop: '2vh', marginBottom: '2vh' }} />
          <QSOLikeText qso={this.props.qso} likes={this.state.likes} />
          <Button.Group widths="4" basic>
            <QSOLikeButton
              qso={this.props.qso}
              recalculateRowHeight={this.recalculateRowHeight}
            />
            <Button onClick={e => this.handleOnComment(e)}>
              <Icon name="comment outline" />{' '}
              {this.props.qso.comments.length > 0 && commentsCounter}
            </Button>
            <QSORePostButton qso={this.props.qso} />
            <QSOShareButtons idqso={this.props.qso.GUID_URL} title={shareText} />
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
          cancelButton={ t('global.cancel')}
          confirmButton={ t('auth.login')}
          content={ t('auth.loginToPerformAction')}
        />
      </Fragment>
    );
  }
}
FeedItemRepost.propTypes = {
  actions: PropTypes.shape({
    // doStartingLogin: PropTypes.func,
    // doLogout: PropTypes.func,
    // doLogin: PropTypes.func,
    // doFetchUserInfo: PropTypes.func,
    // doSetPublicSession: PropTypes.func
  }).isRequired,
  measure: PropTypes.func,
  qso: PropTypes.shape({
    avatarpic: PropTypes.string,
    idqsos: PropTypes.number,
    GUID_QR: PropTypes.string,
    GUID_URL: PropTypes.string,
    rst: PropTypes.string,
    qras: PropTypes.array,
    comments: PropTypes.array,
    original: PropTypes.array,
    media: PropTypes.array,
    qra: PropTypes.string,
    showComments: PropTypes.bool
  }),
  location: PropTypes.shape({
    // pathname: PropTypes.string,
    // data: PropTypes.shape({ newPasswordRequired: PropTypes.bool })
  }),
  showComments: PropTypes.func,
  recalculateRowHeight: PropTypes.func,
  index: PropTypes.number
  // isAuthenticated: PropTypes.bool,
  // public: PropTypes.bool,
  // history: PropTypes.shape({
  //   push: PropTypes.func,
  //   location: PropTypes.shape({
  //     state: PropTypes.shape({})
  //   }).isRequired
  // }).isRequired
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
  )(withTranslation()(FeedItemRepost))
);
