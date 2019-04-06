import React, { Fragment } from "react";

import QRAProfile from "./QRAProfilePresentational";
import * as Actions from "../../actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../../styles/style.css";

class QRAProfileContainer extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      active: true,
      adActive: true,
      tab: null
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
  }
  componentDidMount() {
    let qraInMemory = this.props.qra ? this.props.qra.qra.qra : "";

    if (
      (!this.props.fetchingQRA && !this.props.QRAFetched) ||
      (this.props.QRAFetched && this.props.match.params.qra !== qraInMemory)
    ) {
      this.props.actions.clearQRA();
      this.props.actions.doFetchQRA(
        this.props.match.params.qra,
        this.props.token
      );
    }
    switch (this.props.tab) {
      case "BIO":
        this.setState({ tab: 2 });
        break;
      case "INFO":
        this.setState({ tab: 3 });
        break;
      case "FOLLOWING":
        this.setState({ tab: 4 });
        break;
      default:
        this.setState({ tab: 1 });
        break;
    }
    window.googletag.cmd.push(function() {
      window.googletag
        .defineSlot(
          "/21799560237/qraDetail/left",
          [160, 600],
          "div-ads-instance-qradetail-left"
        )
        .addService(window.googletag.pubads());
      // .setTargeting("interests", ["sports", "music", "movies"]);
      window.window.googletag
        .defineSlot(
          "/21799560237/qraDetail/intersitial",
          [640, 480],
          "div-ads-instance-qradetail-intersitial"
        )
        .addService(window.googletag.pubads());
      window.googletag
        .defineSlot(
          "/21799560237/qraDetail/right",
          [160, 600],
          "div-ads-instance-qradetail-right"
        )
        .addService(window.googletag.pubads());
      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();
    });
  }
  handleOpen = () => this.setState({ adActive: true });
  handleClose = () => this.setState({ adActive: false });
  static getDerivedStateFromProps(props, state) {
    if (props.QRAFetched) return { active: false };
    if (!props.qra) return { active: true };
    //Default
    return null;
  }
  handleTabClick(i) {
    switch (i) {
      case 2:
        this.props.history.push("/" + this.props.match.params.qra + "/bio");
        break;
      case 3:
        this.props.history.push("/" + this.props.match.params.qra + "/info");
        break;
      case 4:
        this.props.history.push(
          "/" + this.props.match.params.qra + "/following"
        );
        break;
      default:
        this.props.history.push("/" + this.props.match.params.qra);
        break;
    }
    this.setState({ tab: i });
  }
  handleButtonClick() {
    if (!this.props.token) return null;
    this.setState(prevState => {
      return {
        followed: !prevState.followed
      };
    });
    if (!this.state.followed) {
      if (this.props.isAuthenticated) {
        this.props.actions.doFollowQRA(
          this.props.token,
          this.props.match.params.qra
        );
      }
    } else {
      this.props.actions.doUnfollowQRA(
        this.props.token,
        this.props.match.params.qra
      );
    }
  }

  render() {
    let followed = this.props.following.some(
      o => o.qra === this.props.match.params.qra
    );

    let qraInfo = null;
    if (this.props.qra) qraInfo = this.props.qra.qra;

    return (
      <Fragment>
        <QRAProfile
          qraInfo={qraInfo}
          active={this.state.active}
          qra={this.props.qra}
          onClick={this.handleButtonClick}
          isAuthenticated={this.props.isAuthenticated}
          currentQRA={this.props.currentQRA}
          followed={followed}
          handleTabClick={this.handleTabClick}
          tab={this.state.tab}
          adActive={this.state.adActive}
          handleClose={this.handleClose}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  //state: state,
  currentQRA: state.userData.qra,
  isAuthenticated: state.userData.isAuthenticated,
  following: state.userData.following,
  token: state.userData.token,
  fetchingQRA: state.FetchingQRA,
  QRAFetched: state.QRAFetched,
  qra: state.qra,
  fetchingUser: state.userData.fetchingUser,
  userFetched: state.userData.userFetched
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
  )(QRAProfileContainer)
);
