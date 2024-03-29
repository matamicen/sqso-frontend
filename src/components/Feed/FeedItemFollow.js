import React from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Confirm from 'semantic-ui-react/dist/commonjs/addons/Confirm';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import * as Actions from '../../actions';
import '../../styles/style.css';
import FollowCarrousel from '../follow/followCarrousel';
class FeedItemFollow extends React.PureComponent {
  state = {
    followed: [],
    openLogin: false,
    openUserNotValidated: false,
    follow: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.follow !== prevProps.follow)
      this.setState({ follow: this.props.follow });
     
  }
  doFollow = param => {
    if (!this.props.isAuthenticated) this.setState({ openLogin: true });
    else if (this.props.pendingVerification) this.setState({openUserNotValidated: true})
    else {
      if (process.env.REACT_APP_STAGE === 'production')
        window.gtag('event', 'qraFollowRecommended_WEBPRD', {
          event_category: 'User',
          event_label: 'follow'
        });
      this.setState({ followed: [...this.state.followed, param] });
      this.props.actions.doFollowQRA(this.props.token, param);
    }
  };
  // doUnfollow = param => {
  //   if (this.props.isAuthenticated) {
  //     this.setState({ followed: this.state.followed.filter(f => f === param) });
  //     this.props.actions.doUnfollowQRA(this.props.token, param);
  //   } else this.setState({ openLogin: true });
  // };

  render() {
    const { t } = this.props;
    if (this.props.follow)
      return (
        <Segment
          raised
          secondary
          style={{ padding: 'initial', textAlign: 'center', height: "max-content" }}
        >
          <FollowCarrousel
            followed={this.state.followed}
            follow={this.props.follow}
            following={this.props.following}
            followers={this.props.followers}
            doFollow={e => this.doFollow(e)}
            doUnfollow={e => this.doUnfollow(e)}
            currentQRA={this.props.currentQRA}
          />
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
        />
        </Segment>
      );
    else return null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentQRA: state.userData.currentQRA,
  followFetched: state.followFetched,
  followFetching: state.followFetching,
  follow: state.follow,
  following: state.userData.following,
  followers: state.userData.followers,
  isAuthenticated: state.userData.isAuthenticated,
  pendingVerification: state.userData.qra.pendingVerification,
  token: state.userData.token
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
  )(withTranslation()(FeedItemFollow))
);
