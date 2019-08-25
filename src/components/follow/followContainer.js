import React, { Fragment } from "react";
import * as Actions from "../../actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QraFollowRecommendPresentational from "./followPresentational";

class QRAfollowRecommend extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    if (
      this.props.isAuthenticated &&
      !this.props.followFetched &&
      !this.props.followFetching
    ) {
      this.props.actions.followClear();
      this.props.actions.doFollowFetch(this.props.token);
    }
  }
  doFollow = param => {
    if (this.props.isAuthenticated)
      this.props.actions.doFollowQRA(this.props.token, param);
  };
  doUnfollow = param => {
    if (this.props.isAuthenticated)
      this.props.actions.doUnfollowQRA(this.props.token, param);
  };

  render() {
    console.tron.log(this.props.follow.taggedMe);
    return (
      <Fragment>
        <QraFollowRecommendPresentational
          follow={this.props.follow}
          following={this.props.following}
          doFollow={e => this.doFollow(e)}
          doUnfollow={e => this.doUnfollow(e)}
        />
      </Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  followFetched: state.followFetched,
  followFetching: state.followFetching,
  follow: state.follow,
  following: state.userData.following,
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
  )(QRAfollowRecommend)
);
