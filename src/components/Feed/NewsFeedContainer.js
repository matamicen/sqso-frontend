import React, { Fragment } from "react";

import NewsFeed from "./NewsFeedPresentational";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as Actions from "../../actions";
import "react-virtualized/styles.css"; // only needs to be imported once
import * as Sentry from "@sentry/browser";
import "../../styles/style.css";
class NewsFeedContainer extends React.PureComponent {
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
  render() {
    let qsos = [];
    if (this.props.qsos && this.props.qsos.length > 0) {
      for (let i = 0; i < this.props.qsos.length; i++) {
        qsos.push({
          qso: this.props.qsos[i],
          type: this.props.qsos[i].type,
          source: this.props.qsos[i].source ? this.props.qsos[i].source : null
        });
      }
    }

    return (
      <Fragment>
        {this.props.qsos && this.props.qsos.length > 0 && (
          <NewsFeed list={qsos} />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  qsos: state.qsos,
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
)(NewsFeedContainer);
