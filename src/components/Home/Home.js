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
// import AdSense from "react-adsense";
class Home extends React.PureComponent {
  state = {
    active: true
  };
  componentDidMount() {
    if (this.props.isAuthenticated)
      this.props.actions.doFetchUserFeed(this.props.token);
    else this.props.actions.doFetchPublicFeed();
  }
  static getDerivedStateFromProps(props, state) {
    if (props.qsosFetched) return { active: false };
    if (!props.qsosFetched) return { active: true };
    return null;
  }
  render() {
    return (
      <Fragment>
        <Dimmer active={this.state.active} page>
          <Loader>Loading...</Loader>
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
            />
          </div>

          <div className="site-main">
            {this.props.qsosFetched && <FeedQSO />}
          </div>

          <div className="site-right">
            <Ad
              adslot="/21799560237/Home/Home_Right"
              width={160}
              height={600}
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
  public: state.userData.public
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
