import React from "react";

import AppNavigation from "../Home/AppNavigation";

import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Dimmer from "semantic-ui-react/dist/commonjs/modules/Dimmer";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader";
import "../../styles/style.css";
import List from "semantic-ui-react/dist/commonjs/elements/List";
import Notification from "./Notification";
import Ad from "../Ad/Ad";
class Notifications extends React.Component {
  state = {
    active: true,
    adActive: true,
    showModal: false
  };
  static getDerivedStateFromProps(props, state) {
    if (props.notifications) return { active: false };
    else if (!props.notifications) return { active: true };
    //Default
    return null;
  }

  componentDidMount() {
    this.props.actions.doFetchNotifications(this.props.token);

    window.googletag.cmd.push(function() {
      window.googletag
        .defineSlot(
          "/21799560237/Notifications/left",
          [160, 600],
          "div-ads-instance-notifications-left"
        )
        .addService(window.googletag.pubads());
      // .setTargeting("interests", ["sports", "music", "movies"]);
      window.window.googletag
        .defineSlot(
          "/21799560237/Notifications/intersitial",
          [640, 480],
          "div-ads-instance-notifications-intersitial"
        )
        .addService(window.googletag.pubads());
      window.googletag
        .defineSlot(
          "/21799560237/Notifications/right",
          [160, 600],
          "div-ads-instance-notifications-right"
        )
        .addService(window.googletag.pubads());
      window.googletag.pubads().enableSingleRequest();
      window.googletag.enableServices();
    });
  }
  handleOpen = () => this.setState({ adActive: true });
  handleClose = () => this.setState({ adActive: false });
  render() {
    return (
      <div className="notifications-container">
        <Dimmer active={this.state.active} page>
          <Loader>Loading</Loader>
        </Dimmer>

        <Dimmer
          active={this.state.adActive}
          onClick={this.handleClose}
          page
          // verticalAlign="center"
        >
          <Ad
            adslot="/21799560237/Notifications/intersitial"
            width={640}
            height={480}
            id="notifications-intersitial"
            displayOnly={true}
          />
        </Dimmer>

        <div className="site-header">
          <AppNavigation />
        </div>

        <div className="site-left">
          <Ad
            adslot="/21799560237/Notifications/left"
            width={160}
            height={600}
            id="notifications-left"
            displayOnly={true}
          />
        </div>
        <div className="notifications-main">
          <List divided>
            {this.props.notifications.map(m => {
              return (
                <Notification
                  key={m.idqra_notifications}
                  notification={m}
                  token={this.props.token}
                  currentQRA={this.props.currentQRA}
                  doNotificationRead={this.props.actions.doNotificationRead}
                />
              );
            })}
          </List>
        </div>

        <div className="site-right">
          <Ad
            adslot="/21799560237/Notifications/right"
            width={160}
            height={600}
            id="notifications-right"
            displayOnly={true}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  notifications: state.userData.notifications,
  token: state.userData.token,
  currentQRA: state.userData.qra
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Notifications)
);
