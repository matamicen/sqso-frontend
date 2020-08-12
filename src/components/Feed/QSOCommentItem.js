import i18n from 'i18next';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Comment from 'semantic-ui-react/dist/commonjs/views/Comment';
import Item from 'semantic-ui-react/dist/commonjs/views/Item';
import * as Actions from '../../actions';
import FeedOptionsMenu from './FeedOptionsMenu';
class QSOCommentItem extends React.Component {
  constructor() {
    super();
    this.followed = null;
    this.state = {
      comment: null,
      followed: null
    };
  }
  handleButtonClick(idqra) {
    if (!this.props.userData.token) return null;
    if (this.props.userData.isAuthenticated) {
      if (!this.followed) {
        this.props.actions.doFollowQRA(this.props.token, idqra);
        this.followed = true;
        this.setState({ followed: this.followed });
      } else {
        this.props.actions.doUnfollowQRA(this.props.token, idqra);
        this.followed = false;
        this.setState({ followed: this.followed });
      }
    }
  }
  componentDidUpdate = () => {
    // this.props.recalculateRowHeight();
  };
  render() {
    const { t } = this.props;

    var date = new Date(this.props.comment.datetime);
    var timestamp = '';
    if (
      this.props.isAuthenticated &&
      this.followed !== true &&
      this.followed !== false &&
      this.state.followed === this.followed
    ) {
      this.followed = this.props.userData.following.some(
        o => o.idqra_followed === this.props.comment.idqra
      );
    }
    if (this.props.comment.datetime) {
      timestamp =
        date.toLocaleDateString(i18n.language, { month: 'short' }) +
        ' ' +
        date.getDate() +
        ', ' +
        date.getFullYear() +
        t('global.at') +
        date.getUTCHours() +
        ':' +
        (date.getMinutes() < 10 ? '0' : '') +
        date.getMinutes();
    }

    return (
      <Comment>
        <Comment.Content>
          <Item.Extra>
            <div
              style={{
                float: 'right'
              }}
            >
              {this.props.isAuthenticated && !this.followed &&
                this.props.comment.qra !== this.props.currentQRA && (
                  <Button
                    style={{
                      width: '100px'
                    }}
                    positive={!this.followed}
                    onClick={() =>
                      this.handleButtonClick(this.props.comment.qra)
                    }
                  >
                    {this.followed ? t('qra.unfollow') : t('qra.follow')}
                  </Button>
                )}

              <FeedOptionsMenu
                comment_owner={this.props.comment.qra}
                idqso={this.props.comment.idqso}
                idcomment={this.props.comment.idqsos_comments}
                optionsCaller="FeedComment"
              />
            </div>
          </Item.Extra>
          <Comment.Author>
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Link to={'/' + this.props.comment.qra}>
                <Image
                  style={{
                    height: '1.5rem',
                    width: 'auto',
                    marginRigth: '5px'
                  }}
                  src={
                    this.props.comment.avatarpic
                      ? this.props.comment.avatarpic
                      : '/emptyprofile.png'
                  }
                  circular
                />
              </Link>{' '}
              <Link to={'/' + this.props.comment.qra}>
                <span style={{ fontSize: '1.2rem' }}>
                  {this.props.comment.qra.toUpperCase()}{' '}
                  {this.props.comment.firstname} {this.props.comment.lastname}{' '}
                </span>
              </Link>{' '}
              {/* <TextToFollow qra={this.props.comment.qra} /> */}
            </div>
          </Comment.Author>
          <Comment.Metadata>
            <span
              style={{
                marginLeft: '1.5rem'
              }}
            >
              {timestamp}
            </span>
          </Comment.Metadata>
          <Comment.Text>
            <span style={{ fontSize: '1.1rem' }}>
              {this.props.comment.comment}
            </span>
          </Comment.Text>
        </Comment.Content>
      </Comment>
    );
  }
}

const mapStateToProps = state => ({
  token: state.userData.token,
  currentQRA: state.userData.currentQRA,
  userData: state.userData,
  isAuthenticated: state.userData.isAuthenticated
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(QSOCommentItem));
