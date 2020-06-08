import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
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

class FeedItemQSO extends React.Component {
  constructor() {
    super();
    this.state = { comments: [], likes: [], error: null };
    this.handleOnComment = this.handleOnComment.bind(this);
    this.recalculateRowHeight = this.recalculateRowHeight.bind(this);
  }
  handleOnComment = () => {
    if (!this.props.isAuthenticated && this.props.qso.comments.length === 0)
      this.setState({ openLogin: true });
    else if (this.props.currentQRA || this.props.qso.comments.length > 0)
      this.props.showComments(this.props.index);
    // this.recalculateRowHeight(); this.props.recalculateRowHeight()
  };

  recalculateRowHeight() {
    if (this.props.recalculateRowHeight)
      this.props.recalculateRowHeight(this.props.index);
  }

  //     }
  static getDerivedStateFromProps(props, prevState) {
    if (props.qso.comments !== prevState.comments)
      return { comments: props.qso.comments };
    if (props.qso.likes !== prevState.likes) {
      return { likes: props.qso.likes };
    }
    return null;
  }
  render() {
    let picList = this.props.qso.media.filter(media => media.type === 'image');
    let audioList = this.props.qso.media.filter(
      media => media.type === 'audio'
    );
    const commentsCounter = '(' + this.props.qso.comments.length + ')';

    let text;

    switch (this.props.qso.type) {
      case 'POST':
        text = ' created a new post';
        break;
      case 'LISTEN':
        text = ' listened a QSO with';
        break;
      case 'SHARE':
        text = ' reposted a QSO';
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
            <div className="qso-header-info-post">
              <div>
                <b>Date: </b>
                {date.toLocaleDateString('EN-US', { month: 'short' }) +
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
          {this.props.qso.qras.length > 0 && (
            <Segment>
              <QRAs
                avatarpic={this.props.qso.avatarpic}
                qso_owner={this.props.qso.qra}
                qras={this.props.qso.qras}
              />
            </Segment>
          )}
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
          <Divider hidden style={{ marginTop: '2vh', marginBottom: '2vh' }} />
          <QSOLikeText qso={this.props.qso} likes={this.state.likes} />
          <Button.Group fluid basic>
            <QSOLikeButton qso={this.props.qso} />
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
          cancelButton="Cancel"
          confirmButton="Login"
          content="Please Login to perform this action"
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
  )(FeedItemQSO)
);
FeedItemQSO.propTypes = {
  qso: PropTypes.object.isRequired
};
