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
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal';
import * as Actions from '../../actions';
import '../../styles/style.css';
import PopupToFollow from '../PopupToFollow';
import TextToFollow from '../TextToFollow';
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
class FeedItemPost extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showComments: false,
      comments: [],
      likes: [],
      error: null,
      qso: null
    };

    this.recalculateRowHeight = this.recalculateRowHeight.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props.qso) !== JSON.stringify(prevProps.qso))
      this.setState({
        qso: this.props.qso,
        comments: this.props.qso.comments,
        likes: this.props.qso.likes
      });
  }

  recalculateRowHeight() {
    if (this.props.recalculateRowHeight)
      this.props.recalculateRowHeight(this.props.index);
  }

  //     }
  // static getDerivedStateFromProps(props, prevState) {
  //   if (props.qso.comments !== prevState.comments)
  //     return { comments: props.qso.comments };
  //   if (props.qso.likes !== prevState.likes) {
  //     return { likes: props.qso.likes };
  //   }
  //   return null;
  // }
  render() {
    const { t } = this.props;

    let picList = this.props.qso.media.filter(media => media.type === 'image');
    let audioList = this.props.qso.media.filter(
      media => media.type === 'audio'
    );

    const commentsCounter = '(' + this.props.qso.comments.length + ')';

    let text;
    let shareText;

    switch (this.props.qso.type) {
      case 'POST':
        text = t('qso.createdPost');
        shareText = t('qso.checkOutPost');
        break;
      case 'QAP':
        text = t('qso.createdQAP');
        shareText = t('qso.checkOutQAP');
        break;
      case 'FLDDAY':
        text = t('qso.createdFLDDAY');
        shareText = t('qso.checkOutFLDDAY');
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
              <TextToFollow qra={this.props.qso.qra} />
            </div>
            <div className="qso-header-info-post">
              <div>
                <b>{t('qso.date')}: </b>
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
                qso={this.props.qso}
                optionsCaller="FeedItem"
                QslCard={false}
              />
            </div>
          </div>

          {this.props.qso.qras.length > 0 && (
            <Fragment>
              <Divider
                hidden
                style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
              />

              <QRAs
                avatarpic={this.props.qso.avatarpic}
                qso_owner={this.props.qso.qra}
                qras={this.props.qso.qras}
              />
            </Fragment>
          )}
          {picList.length > 0 && (
            <Fragment>
              <Divider
                hidden
                style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
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
                style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
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
          <Divider
            hidden
            style={{ marginTop: '0.5vh', marginBottom: '0.5vh' }}
          />
          <QSOLikeText qso={this.props.qso} likes={this.state.likes} />
          <Button.Group fluid basic>
            <QSOLikeButton
              qso={this.props.qso}
              recalculateRowHeight={this.recalculateRowHeight}
            />
            <Button onClick={() => this.setState({ showComments: true })}>
              <div>
                <Icon name="comment outline" />{' '}
                {this.props.qso.comments.length > 0 && commentsCounter}
              </div>
            </Button>
            <QSORePostButton qso={this.props.qso} />
            <QSOShareButtons
              idqso={this.props.qso.GUID_URL}
              title={shareText}
            />
          </Button.Group>
          <Modal
            size="tiny"
            centered={true}
            closeIcon={{
              style: { top: '0.0535rem', right: '0rem' },
              color: 'black',
              name: 'close'
            }}
            open={this.state.showComments}
            onClose={() => this.setState({ showComments: false })}
            style={{
              //height: '90%',
              overflowY: 'auto'
            }}
          >
            <Modal.Header>{t('qso.comments')} </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <QSOComments
                  index={this.props.index}
                  qso={this.props.qso}
                  comments={this.props.comments}
                  recalculateRowHeight={this.recalculateRowHeight}
                />
              </Modal.Description>
            </Modal.Content>
          </Modal>
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
  )(withTranslation()(FeedItemPost))
);
FeedItemPost.propTypes = {
  qso: PropTypes.object.isRequired
};
