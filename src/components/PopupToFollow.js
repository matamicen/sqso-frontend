import React from "react";
import Popup from "semantic-ui-react/dist/commonjs/modules/Popup";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import * as Actions from "../actions";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../styles/style.css";
class PopupToFollow extends React.Component {
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
    let button;
    if (this.state.isFollowing)
      button = (
        <Button
          icon="remove user"
          onClick={() => this.unfollow()}
          content="Unfollow"
          size="mini"
        />
      );
    else
      button = (
        <Button
          icon="add user"
          onClick={() => this.follow()}
          content="Follow"
          size="mini"
        />
      );

    if (this.props.isAuthenticated && this.props.currentQRA !== this.props.qra)
      return (
        <Popup
          trigger={this.props.trigger}
          content={button}
          position="top left"
          flowing
          hoverable
          size="mini"
        />
      );
    else return this.props.trigger;
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
)(PopupToFollow);
