import React, { Fragment } from "react";

import AppNavigation from "./AppNavigation";
import FeedQSO from "../Feed/NewsFeedContainer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import "../../styles/style.css";
import Ad from "../Ad/Ad";
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";

class Home extends React.Component {
  state = {
    adActive: true,
    active: null,
    error: null
  };

  componentDidMount() {
    if (process.env.NODE_ENV !== "production")
      this.setState({ adActive: false });

    if (this.props.isAuthenticated)
      this.props.actions.doFetchUserFeed(this.props.token);
    else this.props.actions.doFetchPublicFeed();

    window.googletag.cmd.push(function() {
      window.googletag.destroySlots();
      window.googletag
        .defineSlot(
          "/21799560237/Home/Home_Left2",
          [160, 600],
          "div-ads-instance-home-left"
        )
        .addService(window.googletag.pubads());
      // .setTargeting("interests", ["sports", "music", "movies"]);
      window.window.googletag
        .defineSlot(
          "/21799560237/Home/Home_Intersitial",
          [640, 480],
          "div-ads-instance-home-intersitial"
        )
        .addService(window.googletag.pubads());
      window.googletag
        .defineSlot(
          "/21799560237/Home/Home_Right",
          [160, 600],
          "div-ads-instance-home-right"
        )
        .addService(window.googletag.pubads());
      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();
    });
  }
  handleOpen = () => this.setState({ adActive: true });
  handleClose = () => this.setState({ adActive: false });

  static getDerivedStateFromProps(props, state) {
    if (props.qsosFetched) return { active: false };
    else if (!props.qsosFetched) return { active: true };
  }
  render() {
    return (
      <Fragment>
        <Dimmer active={this.state.active} page>
          <Loader>Loading Qsos...</Loader>
        </Dimmer>
        <Dimmer
          active={
            this.state.adActive &&
            this.props.account_type &&
            this.props.account_type.web_home_intersitial !== ""
          }
          onClick={this.handleClose}
          page
          // verticalAlign="center"
        >
          <Ad
            adslot="/21799560237/Home/Home_Intersitial"
            width={640}
            height={480}
            id="home-intersitial"
            displayOnly={true}
          />
        </Dimmer>
        <div className="global-container">
          <div className="site-header">
            <AppNavigation />
          </div>
          <div className="site-left">
            <Ad
              adslot="/21799560237/Home/Home_Left2"
              width={160}
              height={600}
              id="home-left"
              displayOnly={true}
            />
          </div>

          <div className="site-main">
            {this.props.qsosFetched && <FeedQSO />}
          </div>

          <div className="site-right">
            <Ad
              adslot="/21799560237/21799560237/Home/Home_Right"
              width={160}
              height={600}
              id="home-right"
              displayOnly={true}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  FetchingQSOS: state.FetchingQSOS,
  qsosFetched: state.qsosFetched,
  authenticating: state.userData.authenticating,
  isAuthenticated: state.userData.isAuthenticated,
  token: state.userData.token,
  account_type: state.userData.qra.account_type,
  public: state.userData.public
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
