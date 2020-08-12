import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import '../styles/style.css';

class PopupToFollow extends React.PureComponent {
  state = {
    isFollowing: this.props.following.some(o => o.qra === this.props.qra),
    following: this.props.following
  };

  follow = () => {
    this.setState({ isFollowing: true });
    this.props.actions.doFollowQRA(this.props.token, this.props.qra);
  };
  unfollow = () => {
    this.setState({ isFollowing: false });
    this.props.actions.doUnfollowQRA(this.props.token, this.props.qra);
  };
  static getDerivedStateFromProps(props, state) {
    if (props.following !== state.following)
      return {
        following: props.following,
        isFollowing: props.following.some(o => o.qra === props.qra)
      };

    return null;
  }
  render = () => {
    const { t } = this.props;
    let button;
    if (this.props.isAuthenticated && this.props.currentQRA !== this.props.qra && !this.state.isFollowing)
      return (
        <button
          type="button"
          className="link-button-follow"
          onClick={() => this.follow()}
        >
          <span style={{ alignSelf: 'center' }}>{t('qra.follow')}</span>
        </button>
      );
    else return null;
  };
}

const mapStateToProps = (state, ownProps) => ({
  //state: state,
  currentQRA: state.userData.currentQRA,
  isAuthenticated: state.userData.isAuthenticated,
  following: state.userData.following,
  token: state.userData.token
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(withTranslation()(PopupToFollow));