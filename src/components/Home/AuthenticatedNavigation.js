import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";
import NavigationSearch from "./NavigationSearch";
import Auth from "@aws-amplify/auth";
import { Link, withRouter } from "react-router-dom";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import * as Sentry from "@sentry/browser";
class AuthenticatedNavigation extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      notif_icon: "bell"
    };
  }

  logout() {
    Auth.signOut()
      .then(data => {
        this.props.actions.doLogout();
        this.props.history.push("/");
      })
      .catch(error => {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        } else Sentry.captureException(error);
      });
  }
  notificationIcon() {
    if (this.props.notifications.length > 0) {
      return (
        <Icon.Group size="large">
          <Icon name="bell" />
          <Icon corner name="attention" />
        </Icon.Group>
      );
    } else {
      return (
        <Icon.Group size="large">
          <Icon name="bell outline" />
        </Icon.Group>
      );
    }
  }
  render() {
    return (
      <Menu fixed="top" style={{ height: "50px", display: "flex" }}>
        <Menu.Item
          style={{ flex: "0 1 auto", justifyContent: "center", padding: "0" }}
        >
          <Link to="/">
            <img src="/logoMobile.jpg" alt="SuperQSO.com" className="mobile" />
            <img src="/logoDesk.jpg" alt="SuperQSO.com" className="desktop" />
          </Link>
        </Menu.Item>
        <Menu.Item style={{ flex: "1 1 auto", justifyContent: "center" }}>
          <NavigationSearch />
        </Menu.Item>
        <Menu.Item style={{ flex: "0 1 auto" }}>
          <Link to="/notifications">{this.notificationIcon()}</Link>
        </Menu.Item>
        <Menu.Menu style={{ flex: "0 1 auto" }}>
          <Dropdown
            item
            icon="setting"
            direction="left"
            style={{ width: "50px" }}
          >
            <Dropdown.Menu>
              <Dropdown.Header content={this.props.currentQRA} />
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() =>
                  this.props.history.push("/" + this.props.currentQRA + "/bio")
                }
              >
                Edit My Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => this.props.history.push("/changepassword")}
              >
                Change Password
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => this.props.history.push("/follow")}>
                Who to Follow
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={this.logout.bind(this)}>
                Log Out
              </Dropdown.Item>
              <Dropdown.Divider />
              <Link to="/privacy">
                <Dropdown.Item>Privacy Policy</Dropdown.Item>
              </Link>
              <Link to="/terms">
                <Dropdown.Item>Terms of Service</Dropdown.Item>
              </Link>
              <Link to="/contact">
                <Dropdown.Item>Contact Us</Dropdown.Item>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  currentQRA: state.userData.currentQRA,
  notifications: state.userData.notifications
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
  )(AuthenticatedNavigation)
);
