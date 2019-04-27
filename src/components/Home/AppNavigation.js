import React, { Component } from "react";

import PublicNavigation from "./PublicNavigation.js";
import AuthenticatedNavigation from "./AuthenticatedNavigation.js";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import * as Sentry from "@sentry/browser";
class AppNavigation extends Component {
  state = { error: null };
  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === "production") {
      this.setState({ error });
      Sentry.withScope(scope => {
        scope.setExtras(errorInfo);
        const eventId = Sentry.captureException(error);
        this.setState({ eventId });
      });
    } else console.log(error, errorInfo);
  }
  renderNavigation() {
    return this.props.isAuthenticated ? (
      <AuthenticatedNavigation />
    ) : (
      <PublicNavigation />
    );
  }
  render() {
    return this.renderNavigation();
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.userData.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavigation);
