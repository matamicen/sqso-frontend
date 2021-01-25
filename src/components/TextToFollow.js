import React, {Fragment} from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import * as Actions from '../actions';
import '../styles/style.css';

class PopupToFollow extends React.PureComponent {
  state = {
    isFollowing: this.props.following.some(o => o.qra === this.props.qra),
    following: this.props.following,
    openUserNotValidated: false
  };

  follow = () => {
    if (this.props.pendingVerification) this.setState({openUserNotValidated: true})
    else{
    this.setState({ isFollowing: true });
    if (process.env.REACT_APP_STAGE === 'production')
    window.gtag('event', 'qraFollowFeed_WEBPRD', {
      event_category: 'User',
      event_label: 'follow'
    });
    this.props.actions.doFollowQRA(this.props.token, this.props.qra);
  }
  };
  unfollow = () => {
    if (this.props.pendingVerification) this.setState({openUserNotValidated: true})
    else{
    this.setState({ isFollowing: false });
    this.props.actions.doUnfollowQRA(this.props.token, this.props.qra);
    }
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
        <Fragment>
        <button
          type="button"
          className="link-button-follow"
          onClick={() => this.follow()}
        >
          <span style={{ alignSelf: 'center' }}>{t('qra.follow')}</span>
        </button>
         <Confirm
         size="mini"
         open={this.state.openUserNotValidated}
         onCancel={() => this.setState({ openUserNotValidated: false })}
         onConfirm={() =>
           this.setState({ openUserNotValidated: false })
         }
         // cancelButton={t('global.cancel')}
         confirmButton={t('global.ok')}
         content={t('auth.PendingValidationConfirmMessage')}
       /></Fragment>
      );
    else return null;
  };
}

const mapStateToProps = (state, ownProps) => ({
  //state: state,
  currentQRA: state.userData.currentQRA,
  isAuthenticated: state.userData.isAuthenticated,
  pendingVerification: state.userData.qra.pendingVerification,
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
