import React, { Fragment } from "react";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import { withRouter } from "react-router-dom";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import API from "@aws-amplify/api";
import * as Sentry from "@sentry/browser";
import ReactGA from "react-ga";

import Confirm from "semantic-ui-react/dist/commonjs/addons/Confirm";
class QSORePostButton extends React.Component {
  state = {
    showConfirmationRequest: false,

    openLogin: false
  };
  doRePost() {
    this.closeConfirmationRequest();

    let apiName = "superqso";
    let path = "/qso-share";
    let qso =
      this.props.qso.type === "SHARE"
        ? this.props.qso.idqso_shared
        : this.props.qso.idqsos;
    var datetime = new Date();
    let myInit = {
      body: {
        qso: qso,
        datetime: datetime,
        type: "SHARE"
      }, // replace this with attributes you need
      headers: {
        Authorization: this.props.token
      } // OPTIONAL
    };
    API.post(apiName, path, myInit)
      .then(response => {
        if (response.body.error > 0) {
          console.error(response.body.message);
        } else {
          ReactGA.event({ category: "QSO", action: "repost" });
        }
      })
      .catch(error => {
        if (process.env.NODE_ENV !== "production") {
          console.log(error);
        }
        Sentry.captureException(error);
      });
  }
  openConfirmationRequest = () => {
    if (this.props.isAuthenticated) {
      this.setState({ showConfirmationRequest: true });
    } else {
      this.setState({ openLogin: true });
    }
  };
  closeConfirmationRequest = () =>
    this.setState({ showConfirmationRequest: false });

  close = () => {
    this.setState({ showReportContent: false });
  };

  render() {
    const { showConfirmationRequest } = this.state;
    return (
      <Fragment>
        <Button
          icon
          onClick={() => {
            this.setState(this.openConfirmationRequest);
          }}
        >
          <Icon name="retweet" />
        </Button>
        <Confirm
          size="mini"
          open={this.state.openLogin}
          onCancel={() => this.setState({ openLogin: false })}
          onConfirm={() => this.props.history.push("/login")}
          cancelButton="Cancel"
          confirmButton="Login"
          content="Please Login to perform this action"
        />
        <Confirm
          size="mini"
          open={showConfirmationRequest}
          onCancel={this.closeConfirmationRequest}
          onConfirm={this.doRePost.bind(this)}
          content="Confirm Repost"
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  token: state.userData.token,
  isAuthenticated: state.userData.isAuthenticated
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QSORePostButton)
);
