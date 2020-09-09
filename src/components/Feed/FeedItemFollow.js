import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment';
import * as Actions from '../../actions';
import '../../styles/style.css';
import FollowCarrousel from '../follow/followCarrousel';
class FeedItemFollow extends React.PureComponent {
  doFollow = param => {
    if (this.props.isAuthenticated)
      if (process.env.REACT_APP_STAGE === 'production')
        window.gtag('event', 'qraFollowRecommended_WEBPRD', {
          event_category: 'User',
          event_label: 'follow'
        });
    this.props.actions.doFollowQRA(this.props.token, param);
  };
  doUnfollow = param => {
    if (this.props.isAuthenticated)
      this.props.actions.doUnfollowQRA(this.props.token, param);
  };

  render() {
    if (this.props.follow)
      return (
        <Segment
          raised
          secondary
          style={{ padding: 'initial', textAlign: 'center' }}
        >
          <FollowCarrousel
            follow={this.props.follow}
            following={this.props.following}
            followers={this.props.followers}
            doFollow={e => this.doFollow(e)}
            doUnfollow={e => this.doUnfollow(e)}
            currentQRA={this.props.currentQRA}
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
  )(FeedItemFollow)
);
