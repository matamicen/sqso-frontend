import i18n from 'i18next';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';
import Comment from 'semantic-ui-react/dist/commonjs/views/Comment';
import Item from 'semantic-ui-react/dist/commonjs/views/Item';
import * as Actions from '../../actions';
import PopupToFollow from '../PopupToFollow';
import FeedOptionsMenu from './FeedOptionsMenu';
class QSOCommentItem extends React.Component {
  state = {
    comment: null
  };

  componentDidUpdate = () => {
    this.props.recalculateRowHeight();
  };
  render() {
    const { t } = this.props;
    var date = new Date(this.props.comment.datetime);
    var timestamp = '';

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
              <FeedOptionsMenu
                comment_owner={this.props.comment.qra}
                idqso={this.props.comment.idqso}
                idcomment={this.props.comment.idqsos_comments}
                optionsCaller="FeedComment"
              />
            </div>
          </Item.Extra>
          <Comment.Author>
            <PopupToFollow
              qra={this.props.comment.qra}
              trigger={
                <Link to={'/' + this.props.comment.qra}>
                  {' '}
                  <div
                    style={{
                      display: 'flex'
                    }}
                  >
                    {this.props.comment.avatarpic && (
                      <Image
                        style={{
                          height: '1.5rem',
                          width: 'auto',
                          marginRigth: '5px'
                        }}
                        src={this.props.comment.avatarpic}
                        circular
                      />
                    )}{' '}
                    <span style={{ fontSize: '1.2rem' }}>
                      {this.props.comment.qra.toUpperCase()}{' '}
                      {this.props.comment.firstname}{' '}
                      {this.props.comment.lastname}{' '}
                    </span>
                  </div>
                </Link>
              }
            />
          </Comment.Author>
          <Comment.Metadata>
            <span>{timestamp}</span>
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
  currentQRA: state.userData.currentQRA
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(QSOCommentItem));
